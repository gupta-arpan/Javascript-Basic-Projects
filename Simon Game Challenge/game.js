const buttonColors=["red","yellow","green","blue"];
let gamePattern = [];
let userClickedPattern=[];
let level = 0;
let started = false;

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level"+" "+level);

    let randomNumber = Math.floor(Math.random()*buttonColors.length);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}



function animatePress(currentColor){
    var self = $("#"+currentColor);
    self.addClass("pressed");
    setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){

        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }
    else{
        console.log("gameover");
        let audioGameOver = new Audio("sounds/wrong.mp3");
        audioGameOver.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}

$(".btn").on("click",function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));

    checkAnswer(userClickedPattern.length-1);

})

$(document).on("keypress",function(){
    if(!started){
        //$("#level-title").text("Level"+" "+level);
        nextSequence();
        started = true;
    }
})







