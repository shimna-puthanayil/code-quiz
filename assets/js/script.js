var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var quizHeading = document.querySelector(".quiz-heading");
var questionList = document.querySelector("#question-list");
var resultElement = document.querySelector("#comment");
var displayDiv = document.querySelector(".card");

var timerCount;
var resultTimerCount;
var questions = [];
var questionObject;
var questionsCount = 0;
var isquestionsOver = false;

function returnValue(questionObject, index) {
  if (index === 0) {
    return questionObject.question;
  } else if (index === 1) {
    return questionObject.choice1;
  } else if (index === 2) {
    return questionObject.choice2;
  } else if (index === 3) {
    return questionObject.choice3;
  } else if (index === 4) {
    return questionObject.choice4;
  } else if (index === 5) {
    return questionObject.answer;
  } else {
    return;
  }
}

// Questions ,multiple choices and answers are stored in objects.

var question1 = {
  question: "Commonly used data types do not include : ",
  choice1: "strings",
  choice2: "booleans",
  choice3: "alerts",
  choice4: "numbers",
  answer: "alerts",
};

var question2 = {
  question:
    " The condition in an if else statement is enclosed with _____________",
  choice1: "quotes",
  choice2: "curly brackets",
  choice3: "paranthesis",
  choice4: "square brackets",
  answer: "curly brackets",
};

var question3 = {
  question: " Arrays in javascript can be used to store",
  choice1: "numbers and strings",
  choice2: "other arrays",
  choice3: "booleans",
  choice4: "all of the above",
  answer: "all of the above",
};

var question4 = {
  question:
    " String values must be enclosed within _____________ when being assigned to variables",
  choice1: "commas",
  choice2: "curly brackets",
  choice3: "quotes",
  choice4: "paranthesis",
  answer: "quotes",
};

var question5 = {
  question:
    " A very useful tool used during development and debugging for printing content to the debugger is ",
  choice1: "javascript",
  choice2: "terminal/bash",
  choice3: "for loops",
  choice4: "console.log",
  answer: "console.log",
};

function renderQuestions() {
  var chosenQuestion = "";
  var questionObjIndex = 0;
  //Insert question objects into an array 'questions'. when it is first render.
  if (questions.length === 0) {
    for (var i = 1; i <= 5; i++) {
      questions.push("question" + i);
    }
  }
  // Randomly picks object from questions array
  questionObjIndex = Math.floor(Math.random() * questions.length);
  chosenQuestion = questions[questionObjIndex];
  console.log(questions);
  questions = questions.toSpliced(questionObjIndex, 1);
  console.log(questions);
  if (chosenQuestion === "question1") {
    questionObject = question1;
  } else if (chosenQuestion === "question2") {
    questionObject = question2;
  } else if (chosenQuestion === "question3") {
    questionObject = question3;
  } else if (chosenQuestion === "question4") {
    questionObject = question4;
  } else if (chosenQuestion === "question5") {
    questionObject = question5;
  }
  questionList.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    var li = document.createElement("li");
    // li.setAttribute("data-index", i);
    if (i === 0) {
      li.setAttribute("class", "question");
      li.textContent = returnValue(questionObject, i);
    } else {
      li.setAttribute("class", "choices");

      var button = document.createElement("button");
      button.setAttribute("class", "button-choices");
      button.textContent = i + ". " + returnValue(questionObject, i);
      li.appendChild(button);
    }

    questionList.appendChild(li);
  }
  questionsCount++;
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    if (timerCount > 0) {
      if (isquestionsOver) {
        // Clears interval and stops timer
        clearInterval(timer);
        saveInitialsAndScore();
      }
      else {
        timerCount--;
      }
    }
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      // Clears interval  and stops timer
      clearInterval(timer);
      saveInitialsAndScore();
    }
  }, 1000);
}

function resultTimer() {
  // Sets timer
  resulttimer = setInterval(function () {
    if (resultTimerCount === 0) {

      // Clears interval and stops timer
      clearInterval(resulttimer);
      questionList.setAttribute("style", "padding-bottom:60px;border-bottom:none; border-bottom-color: rgb(97, 105, 124);width:800px");
      resultElement.textContent="";
      
    }
    else {
      resultTimerCount--;
    }

  }, 1000);
}
function startQuiz() {
  timerCount = 75;
  // Make the heading and button invisible
  quizHeading.setAttribute("style", "visibility:hidden");
  renderQuestions();
  startTimer();
}
// Add click event to startButton button element
startButton.addEventListener("click", startQuiz);

//Saves the score and initials into local storage
function saveInitialsAndScore() {
  var highscoreArray = [];
  questionList.innerHTML = "";

  var h3Element = document.querySelector(".final-message");
  h3Element.textContent = "All done !";
  var finalScore = document.querySelector(".final-score");
  finalScore.textContent = "Your final score is " + timerCount;

  var labelInitials = document.createElement("label");
  var divInitials = document.querySelector(".div-initials");
  labelInitials.textContent = "Enter initials : ";
  divInitials.appendChild(labelInitials);

  var inputInitials = document.createElement("input");
  inputInitials.setAttribute("type", "text");
  inputInitials.setAttribute("id", "input-initials");
  divInitials.appendChild(inputInitials);

  var buttonSubmit = document.createElement("button");
  buttonSubmit.setAttribute("class", "button-submit");
  buttonSubmit.textContent = "Submit";
  divInitials.appendChild(buttonSubmit);

  var inputValue = document.querySelector("#input-initials");
  buttonSubmit.addEventListener("click", function () {

    var highScore = {
      initial: inputValue.value.trim(),
      score: timerCount,
    };
    highscoreArray = JSON.parse(localStorage.getItem("highscoreArray"));
    if (highscoreArray === null) {
      highscoreArray = [];
    }
    highscoreArray.push(highScore);
    localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));
    //Redirects to the page highscores.html where the high scores and initials are displayed.
    location.href = "./highscores.html";
  });
}

// Add click event to questionList element
questionList.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  // Checks if element is a button
  if (element.matches("button")) {
    var selectedAnswer = element.textContent.split("");
    selectedAnswer = selectedAnswer.toSpliced(0, 3);
    var answer = selectedAnswer.join("");
    questionList.setAttribute("style", "padding-bottom:60px;border-bottom:solid; border-bottom-color: rgb(97, 105, 124);width:800px");
    resultElement.setAttribute("style", "color:rgb(97, 105, 124);font-size:25px");
    resultTimerCount=2;
    resultTimer();
    if (answer === returnValue(questionObject, 5)) {
      resultElement.textContent = "Correct !";
    } else {
      resultElement.textContent = "Wrong !";
      timerCount = timerCount - 15;
      if (timerCount <= 0) {
        timerCount = 0;
      }
      timerElement.textContent = timerCount;
    }
    if (questionsCount < 5) {
      renderQuestions();
    }
    //Questions are over
    else {
      isquestionsOver = true;
    }
  }
});
