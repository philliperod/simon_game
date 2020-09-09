var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);

  $('#' + randomChosenColors)
    .animate({opacity: 0.25}, 100)
    .animate({opacity: 1}, 50);
  playSound(randomChosenColors);

  // this is a randomize sequence for which the player will have to follow
  // it will pick a random number from 0 to 1 multiple by the length of buttonColors array
  // it will store the random number in a variable then use that number to choose a random index value in the buttonColor array
  // it will then add that index value at the end in gamePattern array
  // for each id color chosen it will animate a fade-in and fade-out effect
  // it will attached a click eventListener event to whatever id color is chosen and animate a fadeIn and fadeOut by reducing and increading the opacity
  // it will play associated sound based on random color chosen and return it
}

function playSound(name) {
  var soundColor = new Audio('sounds/' + name + '.mp3');
  soundColor.play();

  // this will generate the associated sound from a parameter that matches
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);

  // this will animate a svg drop-shadow highlight when a button is pressed
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    var count = 0;

    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        count++;
      }
    }
    if (count === gamePattern.length) {
      console.log('success');
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('failed');
    var failedAudio = new Audio('sounds/wrong.mp3');
    failedAudio.play();
    $(document).addClass('game-over');
    setTimeout(function() {
      $(document).removeClass('game-over');
    }, 100);
  }
}

$('.btn').on('click', function() {
  var userChosenColors = this.id;
  userClickedPattern.push(userChosenColors);
  animatePress(userChosenColors);
  playSound(userChosenColors);

  // this will select the btn class and attached a click eventListener
  // it will take in the id of the input and store it into variable userChosenColors
  // it will add that id name at the end of the userClickedPattern array
  // it will animate a drop-shadow effect and play the associated sound that matches the id name whenever the button is clicked
});

$(document).on('keypress', function() {
  nextSequence();
  if (level > 0) {
    $(document).off('keypress');
  }
});
