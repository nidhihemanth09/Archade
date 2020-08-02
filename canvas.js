var canvas;
var canvasContext;
var ballX = 80;
var ballY = 80;
var ballSpeedX = 20;
var ballSpeedY = 3;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

function calcMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  // var mouseX = event.clientX;
  // var mouseY = event.clientY;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;
  if (mouseY > 100) {
    mouseY = mouseY + mouseY / 2;
  }
  return {
    x: mouseX,
    y: mouseY,
  };
}

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

  canvas.addEventListener("mousemove", function (event) {
    var mousePos = calcMousePos(event);
    // console.log(mousePos.x, mousePos.y);
    // if (mousePos.y > 100) {
    //   value = mousePos.y / 2;
    //   paddle1Y = mousePos.y + value;
    // } else {
    //   paddle1Y = mousePos.y;
    // }
    paddle1Y = mousePos.y;
  });
};

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  // console.log("called drawEverything" + ballX);
  colorRect(5, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  colorCircle(ballX, ballY, 10, "red");
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
