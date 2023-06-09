var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var quizHeading = document.querySelector(".quiz-heading");
var questionList = document.querySelector("#question-list");

var timerCount;
var questions = [];
var chosenQuestion = "";

var question1 = {
  question: "Commonly used data types do not include : ",
  choice1: "strings",
  choice2: "booleans",
  choice3: "alerts",
  choice4: "numbers",
  answer: "alerts",
  returnValue: function (index) {
    if (index === 0) {
      return this.question;
    } else if (index === 1) {
      return this.choice1;
    } else if (index === 2) {
      return this.choice2;
    } else if (index === 3) {
      return this.choice3;
    } else if (index === 4) {
      return this.choice4;
    } else {
      return this.answer;
    }
  },
};
var question2 = {
  question:
    " The condition in an if else statement is enclosed with _____________",
  choice1: "quotes",
  choice2: "curly brackets",
  choice3: "paranthesis",
  choice4: "square brackets",
  answer: "curly brackets",
  returnValue: function (index) {
    if (index === 0) {
      return this.question;
    } else if (index === 1) {
      return this.choice1;
    } else if (index === 2) {
      return this.choice2;
    } else if (index === 3) {
      return this.choice3;
    } else if (index === 4) {
      return this.choice4;
    } else {
      return this.answer;
    }
  },
};
function renderQuestions() {
  //Insert question objects into an array
  for (i = 1; i <= 2; i++) {
    questions.push("question" + i);
  }

  // Randomly picks object from questions array
  chosenQuestion = questions[Math.floor(Math.random() * questions.length)];

  // console.log();
  var obj;
  if (chosenQuestion === "question1")
  {
    obj=question1;
  }
  else if(chosenQuestion === "question2")
  {
     obj=question2;
  }
  else if(chosenQuestion === "question3")
  {
     obj=question3;
  }
  else if(chosenQuestion === "question4")
  {
     obj=question4;
  }
  else if(chosenQuestion === "question5")
  {
     obj=question5;
  }
  
    for (var i = 0; i < 5; i++) {
      var li = document.createElement("li");
      li.setAttribute("data-index", i);
      if (i === 0) {
        li.setAttribute("class", "question");
        li.textContent = obj.returnValue(i);
      } else {
        li.setAttribute("class", "choices");

        var button = document.createElement("button");
        button.setAttribute("class", "button-choices");
        button.textContent = i+". "+obj.returnValue(i);
        li.appendChild(button);
      }

      questionList.appendChild(li);
   
  }
//   if (chosenQuestion === "question2") {
//     var li = document.createElement("li");
//     li.setAttribute("data-index", 0);
//     li.setAttribute("class", "question");
//     li.textContent = question2.question;
//     questionList.appendChild(li);

//     for (var i = 1; i < 5; i++) {
//       var li = document.createElement("li");
//       li.setAttribute("data-index", i);

//       li.setAttribute("class", "choices");
//       var button = document.createElement("button");
//       button.textContent = question2.choice1;
//       button.setAttribute("class", "button-choices");
//       li.appendChild(button);
//       questionList.appendChild(li);
//     }
    // console.log(chosenQuestion);
    // console.log(chosenQuestion.question);
    // console.log(question2.question);
    // lettersInChosenWord = chosenWord.split("");
    // numBlanks = lettersInChosenWord.length;
    // blanksLetters = []
    // Uses loop to push blanks to blankLetters array
    // for (var i = 0; i < numBlanks; i++) {
    //   blanksLetters.push("_");
    // }
    // // Converts blankLetters array into a string and renders it on the screen
    // wordBlank.textContent = blanksLetters.join(" ")
  
}
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
    }
    // Tests if time has run out
    if (timerCount === 0) {
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
startButton.addEventListener("click", startQuiz);
