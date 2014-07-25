/** @jsx React.DOM */

"use strict";

var React = require('react');
var MyProject = require('./MyProject');

var chatRef = new Firebase('https://rebel-tombstone-dev.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (!user) {
    console.log(error, user);
    var email = window.prompt("Email/username");
    var password = window.prompt("Password");
    auth.login('password', {
      email: email,
      password: password
    });
  } else {
    React.renderComponent(<MyProject/>, document.getElementById('root'));
  }
});
