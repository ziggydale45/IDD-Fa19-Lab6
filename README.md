# ChatBot

*A lab report by John Q. Student*

## In this Report

To submit your lab, fork [this repository](https://github.com/FAR-Lab/IDD-Fa18-Lab6). You'll need to upload any code you change into your fork, as well as upload a video of a friend or classmate using your chatbot.

## Make the ChatBot your own

**Describe what changes you made to the baseline chatbot here. Don't forget to push your modified code to this repository.**

1) Edited intro, Questions, and answers to `"Screw you, I am Peebo and I am very angry."`

```   if (questionNum == 0) {
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
```

2) edited structure of last question, removed `else if` question in last question, made new loop

```    question = 'Are you dumb?'; // load next question
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
```

3)edited background color

`socket.emit('changeBG', 'rgb(3,252,182)');`
    

## Record someone trying out your ChatBot

**Using a phone or other video device, record someone trying out your ChatBot. Upload that video to this repository and link to it here!**

[rudebot 1](https://www.youtube.com/watch?v=B1xykaWYd9I)
[rudebot 2](https://youtu.be/kl-yT2LuuKU)

---
Starter code by [David Goedicke](mailto:da.goedicke@gmail.com), closely based on work by [Nikolas Martelaro](mailto:nmartelaro@gmail.com) and [Captain Anonymous](https://codepen.io/anon/pen/PEVYXz), who forked original work by [Ian Tairea](https://codepen.io/mrtairea/pen/yJapwv).
