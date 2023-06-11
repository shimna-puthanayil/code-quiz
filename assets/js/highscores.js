
var highScores=JSON.parse(localStorage.getItem("highScore"));
console.log(highScores);
var liElement=document.createElement("li");
liElement.textContent=highScores.initial+"-"+highScores.score;
var highScoreList=document.querySelector("#highscores");
highScoreList.setAttribute("style"," font-size: 25px ;  color : rgb(197, 202, 215)");

highScoreList.appendChild(liElement);
