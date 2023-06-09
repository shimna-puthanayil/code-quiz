var startButton=document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var quizHeading=document.querySelector(".quiz-heading");

var timerCount;

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
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
    quizHeading.setAttribute("style","visibility:hidden");
    startTimer();
    
  }
startButton.addEventListener("click",startQuiz);
