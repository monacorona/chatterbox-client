  // YOUR CODE HERE:
  //http://parse.sfm8.hackreactor.com
app = {};

app.init = function () {
  app.handleUsernameClick();
  app.handleSubmit();
  app.fetch();
};


app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/jsonp',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.messages;
app.firstFetch = true;

app.fetch = function () {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/jsonp',
    success: function (data) {
      if (app.firstFetch) {
        app.messages = data.results.map(function(message) {
          return message;
        });
        console.log('data ---------------------------------');
        console.log(data);
        console.log('messages array ------------------------');
        console.log(app.messages);
      // var message = JSON.parse(data);
        app.messages.forEach(function(message) {
          app.renderMessage(message);
        });
        app.firstFetch = false;
      } else {
        app.messages[app.messages.length] = data.results[data.results.length - 1];
        app.renderMessage(app.messages[app.messages.length - 1]);
      }
    },



    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve message', data);
    }
  });
};



app.clearMessages = function () {
  // use jquery to remove tags with chat id's
  $('#chats').empty();
};

// chat div should have a class equal to the username

app.renderMessage = function (message) {


// create chat class as outer div
  var $chat = $('<div class ="chat"><span class="username"></span><br><span class="message"></span></div>');
  $chat.prependTo('#chats');

  $('.username').first().text(message.username);
  $('.message').first().text(message.text);

};

app.renderRoom = function (name) {
  $('<div>' + name + '</div>').prependTo('#roomSelect');
};

app.handleUsernameClick = function () {

  $('#main').on('click', '.username', function () {

    $(this).css('background-color', 'yellow');

  });
};


app.handleSubmit = function (val) {
  $('.submit').on('click', 'button', function() {
    app.send(val);
  });
};

app.server = 'http://parse.sfm8.hackreactor.com.jsonp';


$( document ).ready( function() {
  app.init();
});
