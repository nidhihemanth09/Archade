var canvas;
var canvasContext;
var ballX = 80;
var ballSpeedX = 20;

window.onload = function () {
  console.log("Game working!");
  canvas = document.getElementById("gameCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 50;
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
  colorRect(0, 0, canvas.width, canvas.height, "black");
  // console.log("called drawEverything" + ballX);
  colorRect(5, 210, 10, 100, "white");
  colorCircle(ballX, 100, 10, "red");
}

function colorCircle(centreX, centreY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
