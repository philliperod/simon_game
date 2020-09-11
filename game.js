var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;
var gameToggle = false;
var failedAudio = new Audio('sounds/wrong.mp3');

// Functions to play sound and to animate clicks -------------------------------------------------------------------------------------------------------------------

function playSound(name) {
  var soundColor = new Audio('sounds/' + name + '.mp3');
  soundColor.play();
}

function animatePress(currentColor) {
  $('#' + currentColor)
    .animate({opacity: 0.25}, 100)
    .animate({opacity: 1}, 50);
}

// functions to restart game, display simon's sequence, run sequence, compare player's sequence to simon -----------------------------------------------------------

function startOver() {
  startGame = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function gameOver() {
  console.log('failed');
  failedAudio.play();
  $('#lead-title').text('Game Over');
  $('h2').text('Press Any Key to Restart');
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 100);
}

function displaySequence() {
  $.each(gamePattern, function(index, color) {
    setTimeout(function() {
      $('#' + color)
        .animate({opacity: 0.25}, 100)
        .animate({opacity: 1}, 50);
      playSound(color);
    }, 1000 * index);
  });
}

function nextSequence() {
  $('h2').text('');
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);
  displaySequence();
}

function checkAnswer(lastColor) {
  if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log('success');
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

// Eventlisteners to start the game, move-over function, and player's click function -------------------------------------------------------------------------------

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
