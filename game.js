var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;
var gameToggle = false;
var failedAudio = new Audio('sounds/wrong.mp3');

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
}

function playSound(name) {
  var soundColor = new Audio('sounds/' + name + '.mp3');
  soundColor.play();
}

function animatePress(currentColor) {
  $('#' + currentColor)
    .animate({opacity: 0.25}, 100)
    .animate({opacity: 1}, 50);
}

function checkAnswer(lastColor) {
  if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
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
    failedAudio.play();
    $('#lead-title').text('Game Over');
    $('h2').text('Press Any Key to Restart');

    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 100);
  }
}

$('.btn').on('click', function() {
  var userChosenColors = this.id;
  userClickedPattern.push(userChosenColors);
  animatePress(userChosenColors);
  playSound(userChosenColors);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColors));
});

$('.btn')
  .mouseenter(function() {
    $(this).addClass('pressed');
  })
  .mouseleave(function() {
    $(this).removeClass('pressed');
  });

$(document).keydown(function() {
  if (!startGame) {
    nextSequence();
    startGame = true;
  }
});
