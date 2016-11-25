var $ = window.jQuery = window.$ = require('jquery');
var Backbone = require('backbone');

require('./router');

// Wait for DOM to be ready
$(function(){
  Backbone.history.start();
});
