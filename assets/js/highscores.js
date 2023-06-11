var highScoreList = document.querySelector("#highscores");

var highestScore = 0;
var index = 0;
var highScoreArray = [];
var sortedScoreArray=[];

var highScores = JSON.parse(localStorage.getItem("highscoreArray"));
if (highScores != null) {
    highScoreArray = highScores;
}
var count=highScoreArray.length;
for (var j = 0;j < count; j++) {
    highestScore=0;
    index=0;
for (var i = 0; i < highScoreArray.length; i++) {
  if (highScoreArray[i].score > highestScore) {
    highestScore = highScoreArray[i].score;
    index = i;
  }
}
sortedScoreArray.push(highScoreArray[index]);
highScoreArray=highScoreArray.toSpliced(index,1);

}

for (var i = 0; i < sortedScoreArray.length; i++) {
  var liElement = document.createElement("li");
  liElement.textContent =
    i + 1 + ". " + sortedScoreArray[i].initial + "-" + sortedScoreArray[i].score;
  if (i === 0) {
    liElement.setAttribute(
      "style",
      "font-size: 25px ;  color : rgb(197, 202, 215); width:500px;background-color: #506580"
    );
  } else {
    liElement.setAttribute(
      "style",
      " font-size: 25px ;  color : rgb(197, 202, 215); width:500px"
    );
  }
  highScoreList.appendChild(liElement);
}
