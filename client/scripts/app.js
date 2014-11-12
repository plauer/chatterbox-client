
// var app = {
//   server : "https://api.parse.com/1/classes/chatterbox",
// }



var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};



var parseJSON = function(data) {
  var messages = [];
  for (var key in data) {
    var results = data[key];
    for (var i in results) {
      var message = results[i].text;
      messages.push(message);
    }
  }
  return messages;
}

var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox', 
    type: 'GET',
    data: JSON.stringify(message),
    contentType : 'application/json',
    success: function (data) {
      var messages = parseJSON(data);
      drawMessages(messages);
      drawRefreshButton();
    },
    error: function(data) {
      console.log("Error")
    }
  });
}

var drawMessages = function(messages) {
  // var $button = $('<button/>')[0];
  var $messageDiv = $('#main')[0];
  $($messageDiv).empty();
  var $h1 = $('<h1>chatterbox</h1>');
  $($messageDiv).append($h1);
  for (var i = 0; i < messages.length; i++) {
    var $message = $('<p/>')[0];
    $($message).text(messages[i])
    $($messageDiv).append($message);
  }
}

var drawRefreshButton = function() {
  var $button = $('<button/>')[0];
  $($button).addClass("refresh");
  $($button).text("Refresh");
  var $messageDiv = $('#main')[0];
  $($messageDiv).prepend($button);
}

$('#main').on('click', 'button.refresh', function() {
  console.log("Refreshing...");
  getMessages();
})


getMessages();
// drawRefreshButton();



// $.ajax({
//   // always use this url
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });