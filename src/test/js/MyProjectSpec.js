/** @jsx React.DOM */

require('./env');
var ReactTest = require('./ReactDomTest');
var props = ReactTest.mock.props;
var MyProject = rewire('../../main/js/MyProject');

ReactTest.mock(MyProject, 'Label');

describe('MyProject', function() {
  it('shows a label', function() {
    ReactTest.render(<MyProject/>);
    expect(props($('#Label')).children).to.eql('MyProject');
  });
});