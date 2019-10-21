/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function() { // we wait until the client has loaded and contacted us that it is ready to go.
socket.emit('changeBG', 'rgb(3,252,182)');

    socket.emit('answer', "Screw you, I am Peebo and I am very angry."); //We start with the introduction;
    setTimeout(timedQuestion, 5000, socket, "What is your name?"); // Wait a moment and respond with a question.

  });
  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
    questionNum = bot(data, socket, questionNum); // run the bot function with the new message
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data, socket, questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

  /// These are the main statments that make up the conversation.
  if (questionNum == 0) {
    answer =  input + '? What a terrible name.'; // output response
    waitTime = 5000;
    question = 'Why do you smell so bad?'; // load next question
  } else if (questionNum == 1) {
    answer =  'I think you said \'' +   input +  '\'  but I couldn\'t really hear through the smell. ' ; // output response
    waitTime = 5000;
    question = 'Why are you talking to me?'; // load next question
  } else if (questionNum == 2) {
    answer = "Cool, I hate you";
    waitTime = 5000;
    question = 'Whats your least favorite color?'; // load next question
  } else if (questionNum == 3) {
    answer = 'Ok, ' + input + ' it is.';
    socket.emit('changeBG', input.toLowerCase());
    waitTime = 5000;
    question = 'Are you dumb?'; // load next question
  } else if (questionNum == 4) {
    if (input.toLowerCase() === 'yes' || input === 1) {
      answer = 'Thought so';
      waitTime = 5000;
      question = 'Ug. Say something I\m bored.';
    } else {
      question = 'Are you dumb?'; // load next question
      answer = 'The only answer to this question is "yes". Try again.'
      questionNum--;
      waitTime = 5000;
    }
    // load next question
  } else {
    answer = "I'm done. Leave"; // output response
    waitTime = 0;
    question = '';
  }


  /// We take the changed data and distribute it across the required objects.
  socket.emit('answer', answer);
  setTimeout(timedQuestion, waitTime, socket, question);
  return (questionNum + 1);
}

function timedQuestion(socket, question) {
  if (question != '') {
    socket.emit('question', question);
  } else {
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
