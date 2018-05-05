// YOUR CODE HERE:
var app = {};


$(document).ready(function(){
  app.init();
  app.fetch();
});




app.init = () => {
  
  
  $(document).on('click', '.username',function(e) {
    e.preventDefault();
    app.handleUsernameClick();  
  });
  
  $('.submit').on('click', function(e) {
    e.preventDefault();
    app.handleSubmit();
  });
  
  $('button').on('click', function(e) {
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
    data: 'order=-createdAt',
    success: (data) => {
      
      console.log('chatterbox: Message received');
      console.log(data);
      var uniqObj = {};
      data.results.forEach(function(eachMessage){
        //app.clearMessages()
        if(!uniqObj[eachMessage.roomname] && eachMessage.roomname) {
          uniqObj[eachMessage.roomname] = true;
          app.renderRoom(eachMessage);
        }
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
  $('#chats').html('');
};

app.renderMessage = (message) => {
  var username = $('<a href="#" class="username"></a>').text(message.username);
  var messageText = $('<div></div>').text(message.text);
  $('#chats').append(username);
  $('#chats').append(messageText);
  
};

app.renderRoom = (message) => {
  var room = $('<option class="roomName"></option>').text(message.roomname);
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
  app.clearMessages();
  app.send(message);
  app.fetch();
};

app.getUsername = () => {
  var username = window.location.search.substring(10).split('');
  //debugger;
  for(let i = 0; i < username.length; i ++) {
    if(username[i] === '%') {
      username.splice(i, 3, ' ');
      console.log(username);
    }
  }
  return username.join('');
  // console.log(username);
};

app.getMessage = () => {
  return $('#send').val();
};

app.getRoom = () => {
  
};











