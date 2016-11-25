var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setUpParse = require('./parseUtilities').setUpParse;
var LoginContainer = require('./components/login.jsx').LoginContainer;
var MessageboardContainer = require('./components/messageboard.jsx').MessageboardContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'messageboard/': 'messageboard'
  },

  initialize: function(){
    setUpParse('tiyfeefall2016', 'parietinaeumbra');
  },

  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },

  messageboard: function(){
    ReactDOM.render(
      React.createElement(MessageboardContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router
};
