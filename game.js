var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);

  $('#' + randomChosenColors).on('click', function() {
    $('#' + randomChosenColors)
      .animate({opacity: 0.25}, 100)
      .animate({opacity: 1}, 50);
  });

  playSound(randomChosenColors);
  return randomChosenColors;
}

$('.btn').on('click', function() {
  var userChosenColors = this.id;
  userClickedPattern.push(userChosenColors);
  animatePress(userChosenColors);
  //playSound(userChosenColors);
});

function playSound(name) {
  $('#' + name)
    .animate({opacity: 0.25}, 100)
    .animate({opacity: 1}, 50);
  var soundColor = new Audio('sounds/' + name + '.mp3');
  soundColor.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
