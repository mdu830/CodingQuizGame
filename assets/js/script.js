// Score
var score = 0;

// High Scores Click to show Scores
var highScores = document.getElementById("highscores");
highScores.addEventListener("click", function() {
  var modal = document.getElementById("highscoreModal"); 
  if("click"){
    checkHighscore();
  }
});


function checkHighscore(){
  // High Scores modal
  var modal = document.getElementById("highscoreModal");
  var closeHs = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

    closeHs.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
}


var scoreSubmitBtn = document.querySelector("#scoreSubmit");
var userScore = document.querySelector("#userScore");

// apply submit name to highscores
function renderCurrentHs(){
  var namesForm = JSON.parse(localStorage.getItem("#name"));
  
  userScore.innerHTML = "";
  
  for (var i = 0; i < namesForm.length; i++) {
    var namesForm;

    var div = document.createElement("div");
    div.textContent = namesForm[i] 
    userScore.append(div);
  }

}


// highscore name submit button
scoreSubmitBtn.addEventListener("click", function(event) {
  var nameEl = document.querySelector("#name");

  event.preventDefault();
  
  var nameStore = JSON.parse(localStorage.getItem("#name"));
  if(nameStore === null){
    nameStore = [];
  }
  nameStore.push(nameEl.value + " - - - - - - - - - - - - - " + score);
  localStorage.setItem("#name", JSON.stringify(nameStore));
  nameEl.value = [""];
  
  renderCurrentHs();
});

// Game Over page
var gameOver = document.getElementById("gameover");
var restart = document.getElementById("restart");
gameOver.textContent = "GAME OVER";
gameOver.style.display = "none";
restart.style.display = "none";


function gameOverShow(){
  gameOver.style.display = "block";
  restart.innerHTML = "Try Again!";
  restart.style.display = "block";
  restart.addEventListener ("click", function() {
    if("click", button){
      document.location.reload(true); // need a better method for this
    }
  });

}
// Game Timer
var gameTimer = document.getElementById("timer");
var secondsLeft = 75;
var timerInterval

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    gameTimer.innerHTML = "Time: " + secondsLeft;

    

    if(secondsLeft <= 0){
      clearInterval(timerInterval);
      quizArea.style.display = "none";
      gameOverShow()
      gameOver.textContent = "Time is up!  " + "  GAME OVER";
      checkHighscore()
    }
    if(indexNum === questionCache.length -1){

      clearInterval(timerInterval);
      questionDiv.style.display = "none";
      gameOverShow()
      checkHighscore()

    }
    
  }, 899);

}
// Questions
var questionCache = [

  {
    question: "what it a DOM?",
    choices: ["A dominating woman", "Document Object Model", "etc", "etc"],
    answer: "Document Object Model",
  },
  {
    question: "_______ is when you clean and simplify code.",
    choices: ["code refactoring", "commenting", "commiting", "giggity"],
    answer: "code refactoring",
  },
  {
    question: "what is a dog?",
    choices: ["cat", "feline", "k9", "giggity"],
    answer: "k9",
  },
  {
    question: "what is a quagmire?",
    choices: ["cat", "feline", "k9", "giggity"],
    answer: "giggity",
  },
  {
    question: "what is a cat?",
    choices: ["cat", "feline", "k9", "giggity"],
    answer: "feline",
  },
  {
  
  },

];



var questionDiv = document.getElementById("questionArea");
var choicesDiv = document.getElementById("choicesArea");
var indexNum = 0;
var lockGame = false;

// check user answers
function checkAnswer(){

  var answer = questionCache[indexNum].answer;
  var msg = document.createElement("div");
  choicesDiv.appendChild(msg)

  if (answer !== this.value){
    msg.innerHTML = ("Wrong");
    secondsLeft = secondsLeft - 15;
    gameTimer.innerHTML = "Timer: " + secondsLeft;
  }else{
    msg.innerHTML = ("Correct!");
    score = score + 10;
    console.log(score)
  }
  setTimeout(function() {
    msg.innerHTML = ("");
    questionDiv.innerHTML = "";
    choicesDiv.innerHTML = "";
    indexNum++;
    if(indexNum !== questionCache.length -1){
      getQuestion();
    } else {
      clearInterval(timerInterval);
      lockGame === true;
      gameOverShow();
      checkHighscore();
    }
  }, 499);

}

//questions and answers 
function getQuestion(){
  questionDiv.innerHTML = questionCache[indexNum].question;
  var choicesArr = questionCache[indexNum].choices;

  for(i = 0; i < choicesArr.length; i++) {
    var btn = document.createElement("button");
    btn.textContent = choicesArr[i];
    btn.setAttribute("class", "choice");
    btn.setAttribute("value", choicesArr[i]);
    choicesDiv.appendChild(btn);
    btn.onclick = checkAnswer;

  }
}


// "Start Quiz!" button
var startPage = document.getElementById("page");
var button = document.getElementById("start");

button.innerHTML = "Start Quiz!";
button.addEventListener ("click", function() {
  if("click", button){
    startPage.style.display = "none";
    gameOver.style.display = "none";
    setTime();
    getQuestion();
  }
});
