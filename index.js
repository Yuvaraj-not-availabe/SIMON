var buttonColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var start = true,
  level = 0;
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  if (start == false) {
    checkAnswer(userClickedPattern.length - 1);
  }
});
$(document).on("keydown", function() {
  if (start) {
    nextSequence();
    start = false;
  }
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("h1").html("Level " + level);
  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  level++;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  start = true;
  level = 0;
  gamePattern = [];
}
