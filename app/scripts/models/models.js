var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://shadow-of-the-colossus-server.herokuapp.com/users',

  parse: function(data){
    return data.results;
  },

  signUp: function(){
    var self = this;
    var username = this.get('username');
    var password = this.get('password');

    this.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(self.toJSON()));
    });

    var loginUrl = 'https://shadow-of-the-colossus-server.herokuapp.com/' + 'login?username=' + encodeURI(username) + '&password=' + encodeURI(password);

    $.ajax(loginUrl).then(function(response){
      localStorage.setItem('token', response.sessionToken);
      Backbone.history.navigate('user/create', {trigger: true});
    });
  },

  signIn: function(username, password){
    var self = this;
    var loginUrl = 'https://shadow-of-the-colossus-server.herokuapp.com/' + 'login?username=' + encodeURI(username) + '&password=' + encodeURI(password);

    $.ajax(loginUrl).then(function(response){
      localStorage.setItem('token', response.sessionToken);
      Backbone.history.navigate('messageboard/', {trigger: true});
    });
  },

  signOut: function(){
    localStorage.clear();
  }
});

var Message = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://shadow-of-the-colossus-server.herokuapp.com/classes/UserAuthMessages'
});

module.exports = {
  User: User,
  Message: Message,
  MessageCollection: MessageCollection
};
