var highScoreList = document.querySelector("#highscores");
var buttonClear = document.querySelector("#button-clear");

//Displays high scores and initials
function renderScores() {
  var highestScore = 0;
  var index = 0;
  var highScoreArray = [];
  var sortedScoreArray = [];

  //Get the array of objects which contain initials and scores from local storage.
  var highScores = JSON.parse(localStorage.getItem("highscoreArray"));
  if (highScores != null) {
    highScoreArray = highScores;
  }
  var count = highScoreArray.length;
  //Sorted the array of objects in descending order.
  for (var j = 0; j < count; j++) {
    highestScore = 0;
    index = 0;
    for (var i = 0; i < highScoreArray.length; i++) {
      if (highScoreArray[i].score > highestScore) {
        highestScore = highScoreArray[i].score;
        index = i;
      }
    }
    sortedScoreArray.push(highScoreArray[index]);
    highScoreArray = highScoreArray.toSpliced(index, 1);

  }

  //Dynamically created a list of initials along with scores which is displayed with highest score on top.(highest to lowest).
  for (var i = 0; i < sortedScoreArray.length; i++) {
    var liElement = document.createElement("li");
    liElement.textContent = (i + 1) + ". " + sortedScoreArray[i].initial + " - " + sortedScoreArray[i].score;
    if (i === 0) {
      liElement.setAttribute("style", "padding:6px ; font-size: 20px ;  color : rgb(197, 202, 215); width:600px;background-color: #506580");
    } else {
      liElement.setAttribute("style", "padding:6px ; font-size: 20px ;  color : rgb(197, 202, 215); width:600px");
    }
    highScoreList.appendChild(liElement);
  }
}

renderScores();

buttonClear.addEventListener("click", function () {
  //Clears local storage 
  localStorage.removeItem("highscoreArray");
  highScoreList.innerHTML = "";
})