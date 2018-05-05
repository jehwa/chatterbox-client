// YOUR CODE HERE:
var app = {
  currentRoom: 'lobby',
};


$(document).ready(function(){
  app.init();
  app.fetch(app.renderRoom);
  app.fetch(app.renderMessage);
});




app.init = () => {
  
  
  $(document).on('click', '.username',function(e) {
    e.preventDefault();
    console.log($(this).text())
    var $className = $(this).text();
    $('.'+$className).addClass('friend')

  });
  
  $('.submit').on('click', function(e) {
    e.preventDefault();
    app.fetch(app.handleSubmit);
  });
  
  $('button').on('click', function(e) {
    e.preventDefault();
    app.fetch(app.renderMessage);
  });
   
  $('select').on('change', function(e) {
    e.preventDefault();
    app.currentRoom = $(this).val();
    app.fetch(app.renderMessageByRoom, app.currentRoom);
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

app.fetch = (callback, arg) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    dataType: 'json',
    data: 'order=-createdAt',
    success: (data) => {
      
      console.log('chatterbox: Message received');
      console.log(data);
      app.clearMessages()
      callback(data.results, arg);

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
  message.forEach(function(eachMessage){
    var username = $('<a href="#" class="username"></a>').text(eachMessage.username);
    var messageText = $('<div></div>').text(eachMessage.text).addClass(eachMessage.username);
    
    $('#chats').append(username);
    $('#chats').append(messageText);
    
  });
  
};

app.renderRoom = (message) => {
  var uniqueRooms = {};
  message.forEach(function(eachMessage){
    if(!uniqueRooms[eachMessage.roomname] && eachMessage.roomname) {
      uniqueRooms[eachMessage.roomname] = true;
      var room = $('<option class=' + eachMessage.roomname +'></option>').text(eachMessage.roomname);
      $('#roomSelect').append(room);
    }
  });
};

app.handleUsernameClick = (username) => {
  
};

app.handleSubmit = () => {
  
  var message = {
    username: 'default',
    text: undefined,
    roomname: 'lobby'
  };
  message.username = app.getUsername();
  message.text = app.getMessage();
  message.roomname = app.currentRoom;
  app.clearMessages();
  app.send(message);
  app.fetch(app.renderMessageByRoom, app.currentRoom);
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


app.renderMessageByRoom = (message, currentRoom) => {
  var filteredRoom = message.filter(function(eachMessage){
    return eachMessage.roomname === currentRoom;
  });
  app.renderMessage(filteredRoom);
};













