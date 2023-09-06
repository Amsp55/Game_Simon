var boxColors = ["g", "r", "y", "b"];
var pattern = [];
var userPattern = [];
var isPlaying = false;
var currentLevel = 0;

$(document).keypress(function() {
    if (!isPlaying) {
        $("#title").text("Level " + currentLevel);
        nextStep();
        isPlaying = true;
    }
});

$(".box").click(function() {
    var chosenBox = $(this).attr("id");
    userPattern.push(chosenBox);
    playSound(chosenBox);
    animatePress(chosenBox);
    checkUserInput(userPattern.length - 1);
});

function checkUserInput(index) {
    if (pattern[index] === userPattern[index]) {
        if (userPattern.length === pattern.length) {
            setTimeout(function() {
                nextStep();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextStep() {
    userPattern = [];
    currentLevel++;
    $("#title").text("Level " + currentLevel);
    var randomBox = boxColors[Math.floor(Math.random() * 4)];
    pattern.push(randomBox);
    $("#" + randomBox).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomBox);
}

function animatePress(boxColor) {
    $("#" + boxColor).addClass("pressed");
    setTimeout(function() {
        $("#" + boxColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    currentLevel = 0;
    pattern = [];
    isPlaying = false;
}
