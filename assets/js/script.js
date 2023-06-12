var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var quizHeading = document.querySelector(".quiz-heading");
var questionList = document.querySelector("#question-list");
var resultElement = document.querySelector("#comment");
var displayDiv = document.querySelector(".card");

var timerCount;
var resultTimerCount;
var questions = [];
var questionsCount = 0;
var isquestionsOver = false;
//Array used to hold values of current question object.(question ,choices and answer.)
var valueArray = [];

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
  question: " The condition in an if else statement is enclosed with _____________",
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
  question: " String values must be enclosed within _____________ when being assigned to variables",
  choice1: "commas",
  choice2: "curly brackets",
  choice3: "quotes",
  choice4: "paranthesis",
  answer: "quotes",
};

var question5 = {
  question: " A very useful tool used during development and debugging for printing content to the debugger is ",
  choice1: "javascript",
  choice2: "terminal/bash",
  choice3: "for loops",
  choice4: "console.log",
  answer: "console.log",
};

//Displays questions and multiple choices 
function renderQuestions() {
  var chosenQuestion = "";
  var questionObjIndex = 0;
  var questionObject;
  //Insert question objects into an array 'questions' when quiz starts.
  if (questions.length === 0) {
    for (var i = 1; i <= 5; i++) {
      questions.push("question" + i);
    }
  }
  // Randomly picks object from 'questions' array
  questionObjIndex = Math.floor(Math.random() * questions.length);
  chosenQuestion = questions[questionObjIndex];
  //chosen question object is removed from the array 'questions'.
  questions = questions.toSpliced(questionObjIndex, 1);
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
  } else {
    return;
  }
  //Values(question ,choices and answer values) of selected question object is stored into an array 'valueArray'.
  valueArray = Object.values(questionObject);
  questionList.innerHTML = "";
  //Create list elements  for displaying questions and choices.
  for (var i = 0; i < 5; i++) {
    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    if (i === 0) {
      li.setAttribute("class", "question");
      li.textContent = valueArray[i];
    } else {
      li.setAttribute("class", "choices");
      var button = document.createElement("button");
      button.setAttribute("class", "button-choices");
      button.textContent = i + ". " + valueArray[i];
      li.appendChild(button);
    }
    questionList.appendChild(li);
  }
  //No of rendered questions .
  questionsCount++;
}

// The startTimer function starts and stops the timer and triggers saveInitialsAndScore()
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

// The resultTimer function starts and stops the timer for result display after each answer selection(wrong/correct).
function resultTimer() {
  // Sets timer
  resulttimer = setInterval(function () {
    if (resultTimerCount === 0) {
      // Clears interval and stops timer
      clearInterval(resulttimer);
      questionList.setAttribute("style", "padding-bottom:60px;border-bottom:none; border-bottom-color: rgb(97, 105, 124);width:800px");
      resultElement.textContent = "";
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
  //Create element for label
  var labelInitials = document.createElement("label");
  var divInitials = document.querySelector(".div-initials");
  labelInitials.textContent = "Enter initials : ";
  divInitials.appendChild(labelInitials);

  //Create element for input text -initials
  var inputInitials = document.createElement("input");
  inputInitials.setAttribute("type", "text");
  inputInitials.setAttribute("id", "input-initials");
  divInitials.appendChild(inputInitials);

  //Create element for Submit button
  var buttonSubmit = document.createElement("button");
  buttonSubmit.setAttribute("class", "button-submit");
  buttonSubmit.textContent = "Submit";
  divInitials.appendChild(buttonSubmit);

  //Create event for submit button click
  buttonSubmit.addEventListener("click", function () {

    if (inputInitials.value != null && inputInitials.value.trim() != "") {
      var highScore = {
        initial: inputInitials.value.trim(),
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
    }
    else {
      //validation
      window.alert("Enter initials");
    }
  });
}

// Add click event to questionList element(triggers when an answer is clicked )
questionList.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  // Checks if element is a button
  if (element.matches("button")) {
    var selectedDataIndex = element.parentElement.getAttribute("data-index");
    //Checks whether the selected choice is the right answer
    if (valueArray[selectedDataIndex] === valueArray[5]) {
      resultElement.textContent = "Correct !";
    } else {
      resultElement.textContent = "Wrong !";
      timerCount = timerCount - 15;
      if (timerCount <= 0) {
        timerCount = 0;
      }
      timerElement.textContent = timerCount;
    }
    //Added styles for the result display
    questionList.setAttribute("style", "padding-bottom:60px;border-bottom:solid; border-bottom-color: rgb(97, 105, 124);width:800px");
    resultElement.setAttribute("style", "color:rgb(97, 105, 124);font-size:25px");
    //Timer is set for the result display.
    resultTimerCount = 2;
    resultTimer();
    if (questionsCount < 5) {
      renderQuestions();
    }
    //Questions are over
    else {
      isquestionsOver = true;
    }
  }
});
