let gameSeq=[];
let userSeq=[];
let btns = ["green","yellow","red","blue"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : 0; // Retrieve stored high score

let h2= document.querySelector("h2");
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `Highest Score: ${highScore}`;
document.body.prepend(highScoreDisplay);
document.addEventListener("keypress" , function(){
if(started == false){
    console.log("Game Started");
    started = true;
    levelUp();
}
});

function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
    }

function levelUp(){
userSeq=[];
level++;
h2.innerText=`Level ${level}🥳`;
//random btn choose
let randIdx = Math.floor(Math.random()*4);
let randColor =btns[randIdx];
let randBtn = document.querySelector(`.${randColor}`);
gameSeq.push(randColor);
console.log(gameSeq);
gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx]==gameSeq[idx]){
        // console.log("Same value");
        if(userSeq.length==gameSeq.length){
           setTimeout(levelUp,1000);
        }
    } else {
        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore); // ✅ Store new high score in local storage
            highScoreDisplay.innerText=`Highest Score : ${highScore}`;
        }
        h2.innerHTML=`GAME OVER!😓Your Score was <b style="color:red">${level}</b>.<br>
         Press any key to start playing again`;
        document.querySelector("body").style.backgroundColor ="crimson";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor ="white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level =0;
};
