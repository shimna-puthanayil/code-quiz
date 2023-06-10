var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var quizHeading = document.querySelector(".quiz-heading");
var questionList = document.querySelector("#question-list");

var timerCount;
var questions = [];
var questionObject;

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
  var questionObjIndex=0;
  //Insert question objects into an array 'questions'.
  if(questions.length===0)
  {
  for (i = 1; i <= 5; i++) {
    questions.push("question" + i);
  }
}

  // Randomly picks object from questions array
  questionObjIndex=Math.floor(Math.random() * questions.length);
  chosenQuestion = questions[questionObjIndex];
  console.log(questions);
  questions=questions.toSpliced(questionObjIndex,1);
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
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    if(timerCount>0)
    {
    timerCount--;
    }
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
        // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
       
      }
    }
    // Tests if time has run out
    if (timerCount  === 0) {
      // Clears interval
      clearInterval(timer);
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

// Add click event to questionList element
questionList.addEventListener("click", function (event) {
  var element = event.target;
  // Checks if element is a button
  if (element.matches("button")) {
    var selectedAnswer = element.textContent.split("");
    selectedAnswer = selectedAnswer.toSpliced(0, 3);
    var answer = selectedAnswer.join("");
    if (answer === returnValue(questionObject, 5)) {
      console.log("correct");
    }
    else
    {
        timerCount=timerCount-15;
        if(timerCount<=0)
        {
             timerCount=0;
        }
        timerElement.textContent = timerCount;
    }
    renderQuestions();
  }
});
