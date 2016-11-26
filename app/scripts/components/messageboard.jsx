var Backbone = require('backbone');
var React = require('react');

var currentUser = require ('../router').currentUser;
var Message = require('../models/models').Message;
var MessageCollection = require('../models/models').MessageCollection;

var MessageComponent = React.createClass({
  msToTime: function(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? '0' + hours-4 : hours-4;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes;
  },

  render: function(){
    var timeInMs = this.props.model.get('time');
    var formattedTime = this.msToTime(timeInMs);
    var thisUser = this.props.model.get('username');

    return(
      <div className="message">
        <span className="message-username">{this.props.model.get('username') ? this.props.model.get('username') : 'Anonymous'}</span>
        <span className="message-time-stamp">{formattedTime}</span>
        <p className="message-content">{this.props.model.get('content')}</p>
      </div>
    );
  }
});

var InputComponent = React.createClass({
  getInitialState: function(){
    return {content: ''};
  },

  handleSubmit: function(e){
    e.preventDefault();
    var timeInMs = new Date();
    var newMessage = {
      content: this.state.content,
      username: this.props.username,
      time: timeInMs.getTime()
    };

    this.props.addMessage(newMessage);
    this.setState({content: ''});
  },

  handleContent: function(e){
    var contentText = e.target.value;
    this.setState({content: contentText});
  },

  render: function(){
    return (

    <form className="form-inline message-form" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input onChange={this.handleContent} ref="message" type="text" className="form-control" value={this.state.content} name="message-input" id="message-input" placeholder="Your message here..." />
      </div>
      <button type="submit" className="btn btn-success">Post Message</button>
    </form>

    );
  }
});

var MessageboardContainer = React.createClass({
  getInitialState: function(){
    var self = this;
    var messageCollection = new MessageCollection();

    messageCollection.fetch().then(function(){
      self.setState({collection: messageCollection});
      setInterval(function(){
        messageCollection.fetch().then(function(){
          self.setState({collection: messageCollection});
        });
      }, 2000);
    });

    return {collection: messageCollection};
  },

  addMessage: function(message){
    this.state.collection.create(message);
    this.setState({collection: this.state.collection});
  },

  render: function(){
    var messageList = this.state.collection.map(function(message){
      return (
        <MessageComponent
          key={message.get('objectId')}
          model={message}
        />
      );
    });

    return (

      <div className="container-fluid">
        <div className="row">
          <div className="messageboard col-md-10">
            <div className="col-md-12">
              <div className="row" id="messages-window">
                {messageList}
              </div>
            </div>

            <div className="message-form">
              <InputComponent
                collection={this.state.collection}
                username={sessionStorage.getItem('username')}
                addMessage={this.addMessage}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = {
  MessageboardContainer: MessageboardContainer,
};
