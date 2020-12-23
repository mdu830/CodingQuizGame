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
    choices: ["JavaScript", "Document Object Model", "Document Object Maker", "Webpage Document"],
    answer: "Document Object Model",
  },
  {
    question: "_______ is the process of cleaning up and simplifying code.",
    choices: ["Code Refactoring", "Commenting", "Commiting", "Programming"],
    answer: "Code Refactoring",
  },
  {
    question: "What is one of the three basic programming languages of the web?",
    choices: ["CSS", "JavaScript", "HTML", "All of the Above"],
    answer: "All of the Above",
  },
  {
    question: "A _______ is an application programming interface for either a web server or a web browser.",
    choices: ["Web Browser", "Web API", "DOM", "Google Chrome"],
    answer: "Web API",
  },
  {
    question: "________ provides hosting for software development and version control.",
    choices: ["Github", "Gitlab", "Gitcode", "Giggity"],
    answer: "Github",
  },
  {
    question: "what it a DOM?",
    choices: ["JavaScript", "Document Object Model", "Document Object Maker", "Webpage Document"],
    answer: "Document Object Model",
  },
  {
    question: "_______ is the process of cleaning up and simplifying code.",
    choices: ["Code Refactoring", "Commenting", "Commiting", "Programming"],
    answer: "Code Refactoring",
  },
  {
    question: "What is one of the three basic programming languages of the web?",
    choices: ["CSS", "JavaScript", "HTML", "All of the Above"],
    answer: "All of the Above",
  },
  {
    question: "A _______ is an application programming interface for either a web server or a web browser.",
    choices: ["Web Browser", "Web API", "DOM", "Google Chrome"],
    answer: "Web API",
  },
  {
    question: "________ provides hosting for software development and version control.",
    choices: ["Github", "Gitlab", "Gitcode", "Giggity"],
    answer: "Github",
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
