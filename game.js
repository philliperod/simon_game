var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);
  console.log(gamePattern);

  $('#' + randomChosenColors).on('click', function() {
    $('#' + randomChosenColors)
      .animate({opacity: 0.25}, 100)
      .animate({opacity: 1}, 50);
    console.log(randomChosenColors);
    console.log(gamePattern);
  });

  //   var audio = new Audio('sounds/' + randomChosenColors + '.mp3');
  //   audio.play();
  playSound(randomChosenColors);
  return randomChosenColors;
}

$('.btn').on('click', function() {
  var userChosenColors = this.id;
  userClickedPattern.push(userChosenColors);
  playSound(userChosenColors);
  console.log(userClickedPattern);
});

function playSound(name) {
  $('#' + name)
    .animate({opacity: 0.25}, 100)
    .animate({opacity: 1}, 50);
  var soundColor = new Audio('sounds/' + name + '.mp3');
  soundColor.play();
}

// $('.btn').click(nextSequence);
