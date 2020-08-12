var canvas;
var canvasContext;
var ballX = 80;
var ballY = 80;
var ballSpeedX = 14;
var ballSpeedY = 3;

var paddle1Y = 250;
var paddle2Y = 250;

const WIN = 1;

var wonScreen = false;

const PADDLE_HEIGHT = 120;
const PADDLE_WIDTH = 10;

var player1 = 0;
var player2 = 0;

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

function handleMouseClick(event) {
  if (wonScreen) {
    player1 = 0;
    player2 = 0;
    wonScreen = false;
  }
}

function handleKeyPress(event) {
  var key = event.keyCode;
  // console.log("X");
  if (key == 38 || key == 87) {
    if (paddle1Y - 10 > 0) {
      paddle1Y -= 100;
    }
  } else if (key == 40 || key == 83) {
    if (paddle1Y + 120 < canvas.height) {
      paddle1Y += 100;
      console.log("going down");
    }
  }
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

  document.addEventListener("keydown", handleKeyPress);

  canvas.addEventListener("mousedown", handleMouseClick);

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

function scoreDetails() {
  document.getElementById("p1Score").innerHTML = player1;
  document.getElementById("p2Score").innerHTML = player2;
}

function ballReset() {
  if (player1 >= WIN || player2 >= WIN) {
    // player2 = 0;
    // player1 = 0;
    wonScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  // ballSpeedY = 3;

  ballX = canvas.width / 2;
  ballY = canvas.height / 2;

  // if (ballX == 0) {
  //   // console.log("FUCKER");
  //   ballX = canvas.width;
  //   ballY = canvas.height - ballY;
  // } else if (ballY > canvas.height - 15 && ballX > canvas.width - 10) {
  //   ballX = 0;
  //   ballY = canvas.height / 3;
  // } else {
  //   ballX = canvas.width;
  //   ballY = canvas.height - ballY;
  // }
}

function computerMovement() {
  var paddle2YCentre = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCentre < ballY - 35) {
    paddle2Y += 15;
  } else if (paddle2YCentre > ballY + 35) {
    paddle2Y -= 15;
  }
}

function moveEverything() {
  if (wonScreen) {
    return;
  }

  computerMovement();

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2++;
      ballReset();
      // setInterval(function () {
      //   canvasContext.font = "40px Virginia";
      //   canvasContext.fillStyle = "orange";
      //   canvasContext.fillText("Ouch", canvas.width / 3 - 200, 300);
      // }, 10);
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.4;
    } else {
      player1++;
      // player2--;
      // if (player2 < 0) {
      //   player2 = -player2;
      // }
      ballReset();
      // setInterval(function () {
      //   canvasContext.font = "40px Virginia";
      //   canvasContext.fillStyle = "orange";
      //   canvasContext.fillText("Ouch", canvas.width / 3 + 400, 300);
      // }, 10);
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");

  scoreDetails();

  if (wonScreen) {
    canvasContext.font = "5rem Virginia";
    canvasContext.fillStyle = "yellow";
    canvasContext.fillText("Game Over!", canvas.width / 3, 240);

    canvasContext.font = '3.5rem "Lato", sans-serif';
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Tap to continue", canvas.width / 3, 320);

    canvasContext.font = "4rem Verdana";
    var gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    canvasContext.fillStyle = gradient;
    if (player1 >= WIN) {
      canvasContext.fillText(
        "Player 1 (Left Player) won!",
        canvas.width / 5,
        420
      );
    } else if (player2 >= WIN) {
      canvasContext.fillText(
        "Player 2 (Right Player) won!",
        canvas.width / 5,
        420
      );
    }

    return;
  }

  // console.log("called drawEverything" + ballX);

  drawNet();

  colorRect(5, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

  colorRect(
    canvas.width - 5 - PADDLE_WIDTH,
    paddle2Y,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    "white"
  );

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
