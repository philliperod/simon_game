var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);
  console.log(gamePattern);

  $('#' + randomChosenColors).on('click', function() {
    $('#' + randomChosenColors)
      .fadeOut(100)
      .fadeIn(100);
    console.log(randomChosenColors);
    console.log(gamePattern);
  });

  //   $('.' + randomChosenColors).on('click', function() {
  //     $('.' + randomChosenColors)
  //       .fadeOut(100)
  //       .fadeIn(100);

  var audio = new Audio('sounds/' + randomChosenColors + '.mp3');
  audio.play();
  return randomChosenColors;
}

$('.btn').click(nextSequence);
