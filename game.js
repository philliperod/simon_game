var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;
var failedAudio = new Audio('sounds/wrong.mp3');

// Functions to play sound and to animate selection --------------------------------------------------------------------------------------------------------------

function playSound(name) {
  var soundColor = new Audio('sounds/' + name + '.mp3');
  soundColor.play();
}

function animatePress(currentColor) {
  $('#' + currentColor)
    .animate({opacity: 0.25}, 100)
    .animate({opacity: 1}, 50);
}

// Functions to restart game, game over, display simon's sequence, run sequence, compare player's sequence to simon ------------------------------------------------

function startOver() {
  startGame = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function gameOver() {
  failedAudio.play();
  $('#lead-title').text('Game Over');
  $('h2').text('Press Any Key to Restart');
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 100);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);
  setTimeout(function() {
    $('h2').text('');
    level++;
    $('#level-title').text('Level ' + level);
    displaySequence();
  }, 500);
}

function displaySequence() {
  $.each(gamePattern, function(index, color) {
    setTimeout(function() {
      animatePress(color);
      playSound(color);
    }, 1000 * index);
  });
}

function checkSequence(lastColor) {
  if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    gameOver();
    startOver();
  }
}

// Eventlisteners for player to start the game and select colors --------------------------------------------------------------------------------------------------

$('.btn').on('click', function() {
  var userChosenColors = this.id;
  userClickedPattern.push(userChosenColors);
  animatePress(userChosenColors);
  playSound(userChosenColors);
  checkSequence(userClickedPattern.lastIndexOf(userChosenColors));
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
