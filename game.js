var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);
  console.log(gamePattern);
}
