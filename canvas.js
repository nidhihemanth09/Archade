var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;

window.onload = function () {
  console.log("Game working!");
  canvas = document.getElementById("gameCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  // drawEverything();
};

function moveEverything() {
  ballX = ballX + ballSpeedX;
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
}

function drawEverything() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  // console.log("called drawEverything" + ballX);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(5, 210, 10, 100);
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(ballX, 200, 10, 10);
}
