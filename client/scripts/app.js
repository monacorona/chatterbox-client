  // YOUR CODE HERE:
  //http://parse.sfm8.hackreactor.com
app = {};

app.init = function () {
  app.handleUsernameClick();

  app.fetch();
 
 //event listener
  $('form').on('click', 'button', function(event) {
    // $('form').children('input').preventDefault();
    var val = $('input').val();
    console.log(val);
    app.handleSubmit(val);
  });
};


app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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


app.lastMessageIndex = 0;
app.firstFetch = true;

app.fetch = function () {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
    type: 'GET',
    contentType: 'application/jsonp',
    success: function (data) {
      var messages = [];
      if (app.firstFetch) {
        messages = data.results.map(function(message, index) {
          if (data.results[app.lastMessageIndex] === data.results[data.results.length - 1]) {
            app.lastMessageIndex = index;
          }
          return message;
        });
      // var message = JSON.parse(data);
        messages.forEach(function(message) {
          app.renderMessage(message);
        });
        app.firstFetch = false;
      } else { 
        messages = data.results.slice(app.lastMessageIndex);
        messages.forEach(function (message) {
          app.renderMessage(message);
        });
      }
    },



    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve message', data);
    }
  });
  // setTimeout(app.fetch, 1000);
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

  var message = {
    text: val,
    username: 'Dylan',
    roomname: 'lobby'
  };

  app.send(message);

  // $('input').keyup(function() {
  //   val = $(this).val();
  // });
  // keyup();
  // debugger;
  // console.log(val);
  //var user = window.location.search;
  // var message = {
  //   text: val,
  //   username: user
  // };
  // app.send(message);
  
  // var text = $('input').val();
  // console.log(text, ' ', user);

    // app.send(val);

};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';


$( document ).ready( function() {
  app.init();
});
