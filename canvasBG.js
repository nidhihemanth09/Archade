const cV = document.getElementById("sandbox");
cV.width = window.innerWidth;
cV.height = window.innerHeight;

const ctx = cV.getContext("2d");

function Circle(x, y, r, c) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;

  this.dx = Math.floor(Math.random() * 4) + 1;
  this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  this.dy = Math.floor(Math.random() * 4) + 1;
  this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  this.animate = function () {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.r > cV.width || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r > cV.height || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  };
}

const balls = [];
for (let i = 0; i < 20; i++) {
  let r = Math.floor(Math.random() * 30) + 15;
  let x = Math.random() * (cV.width - r * 2) + r;
  let y = Math.random() * (cV.height - r * 2) + r;
  let c = "#28A618";
  balls.push(new Circle(x, y, r, c));
}
/* BONUS FEATURE */
cV.addEventListener("click", function (e) {
  let r = Math.floor(Math.random() * 30) + 15;
  balls.push(new Circle(e.clientX, e.clientY, r, "#1A6328"));
});

function Update() {
  ctx.clearRect(0, 0, cV.width, cV.height);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.animate();
  }

  requestAnimationFrame(Update);
}
Update();
