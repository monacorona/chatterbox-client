  // YOUR CODE HERE:
  //http://parse.sfm8.hackreactor.com
$( document ).ready( function() {
  window.app = {};

  app.init = function () {
    app.handleUsernameClick();
    app.handleSubmit();
    app.fetch();
  };

  app.send = function (message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com',
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


  app.fetch = function () {
    $.ajax({

      url: app.server,
      type: 'POST',
      type: 'GET',
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

  app.server = 'http://parse.sfm8.hackreactor.com';

  app.handleSubmit = function (val) {
    $('.submit').on('click', 'button', function() {
      app.send(val);
    });
  };



});
