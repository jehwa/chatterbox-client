// YOUR CODE HERE:
var app = {};


$(document).ready(function(){
  app.init();
});




app.init = () => {
  
  
  $('.username').on('click', function() {
    console.log(this);
    app.handleUsernameClick();  
  });
  
  $('.submit').on('click', function() {
    app.handleSubmit();
  });
  
  $('.refresh').on('click', function() {
    app.fetch();
  });
   
    
};

app.send = (message) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: (data) => {
      console.log('chatterbox: Message sent');
    },
    error: (data) => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
};

app.fetch = () => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      console.log('chatterbox: Message received');
      data.results.forEach(function(eachMessage){
        //app.clearMessages()
        app.renderMessage(eachMessage);
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
      
    }
  }); 
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = (message) => {
  var username = $('<a href="#" class="username"></a>').text(message.username);
  var messageText = $('<div></div>').text(message.text);
  $('#chats').append(username);
  $('#chats').append(messageText);
  
};

app.renderRoom = (message) => {
  var room = $('<div class="roomName"></div>').text(message.roomname);
  $('#roomSelect').append(room);
};

var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};

app.handleUsernameClick = () => {
 console.log('hi');
};

app.handleSubmit = () => {
  // var newMessage = $('<div class="inputMessage"><div>').text($('#send').val());
  // $('#chats').append(newMessage);
  
  var message = {
    username: 'default',
    text: undefined,
    roomname: 'lobby'
  };
  message.username = app.getUsername();
  message.text = app.getMessage();
  app.renderMessage(message);
  app.send(message);
  app.fetch();
};

app.getUsername = () => {
  return window.location.search.substring(10);
};

app.getMessage = () => {
  return $('#send').val();
};

app.getRoom = () => {
  
};










