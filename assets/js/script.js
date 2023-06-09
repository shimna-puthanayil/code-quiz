var startButton=document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");

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
    startTimer();
  }
startButton.addEventListener("click",startQuiz);
