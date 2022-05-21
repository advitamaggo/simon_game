var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

//To detect when a keyboard key is pressed
$(document).keydown(function() {
  if (gamePattern.length === 0) {
    nextSequence();
    $("h1").text("Level " + level);

  }
});

//To make sound on the click of buttons
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer((userClickedPattern.length) - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


//To generate random colour for the game
function nextSequence() {
  $("h1").html("Level " + level);
  level++;
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

//To add sound to the buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//Animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//To check the answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);

    }
  } else {
    console.log("wrong");
    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//To start the game again
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
