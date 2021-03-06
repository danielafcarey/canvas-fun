var canvas =  document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//rectangles
// c.fillStyle = 'rgba(255, 0, 0, .3)';
// c.fillRect(100, 100, 100 ,100);
// c.fillStyle = '#f9a7f7';
// c.fillRect(200, 200, 50, 50);
// c.fillStyle = 'rgba(100, 155, 200, .5)';
// c.fillRect(600, 100, 200, 200);


//lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#565656';
// c.stroke();

//arcs
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

//create multiple circles with for loops
// for (var i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var r = Math.floor(Math.random() * 255);
//   var g = Math.floor(Math.random() * 255);
//   var b = Math.floor(Math.random() * 255);
//   var opacity = Math.random();
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity}`;
//   c.stroke();
// }


//animated circles

var mouseLocation = {
  x: undefined,
  y: undefined,
}

var maxRadius = 200;

var colorArray = []

function getRandomColors() {
  for (var i = 0; i < 800; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var opacity = Math.random();
    var randomColor = `rgba(${r}, ${g}, ${b}, ${opacity}`;
    colorArray.push(randomColor);
  }
}

getRandomColors();

window.addEventListener('mousemove', function(event) {
  mouseLocation.x = event.x;
  mouseLocation.y = event.y;
})

window.addEventListener('touchmove', function(event) {
  event.preventDefault();
  var touch = event.touches[0]
  mouseLocation.x = touch.clientX;
  mouseLocation.y = touch.clientY;
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.updateGrow = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > innerWidth || this.x < this.radius) {
      this.dx = -this.dx;
    } else if (this.y + this.radius > innerHeight || this.y < this.radius) {
      this.dy = -this.dy;
    }

    if (mouseLocation.x - this.x < 80 
        && mouseLocation.x - this.x > -80 
        && mouseLocation.y - this.y < 80 
        && mouseLocation.y - this.y > -80) {

      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();

  }

  // this.updateErase = function() {
  //   this.x += this.dx;
  //   this.y += this.dy;

  //   if (this.x + this.radius > innerWidth || this.x < this.radius) {
  //     this.dx = -this.dx;
  //   } else if (this.y + this.radius > innerHeight || this.y < this.radius) {
  //     this.dy = -this.dy;
  //   }

  //   if (mouseLocation.x - this.x < 80 
  //       && mouseLocation.x - this.x > -80 
  //       && mouseLocation.y - this.y < 80 
  //       && mouseLocation.y - this.y > -80) {

  //   // erase circles
  //     this.x = -this.x;
  //     this.y = -this.y;
  //   }


  //   this.draw();
  // }

//OTHER ANIMATIONS
    //crazytown circles on hover
      // this.dx += (Math.random() - 0.5) * 10;
      // this.dy += (Math.random() - 0.5) * 10;

    //dodge circles on hover - FIX THIS --> needs to push circles out of mouse area
      // this.dx = -this.dx;
      // this.dy = -this.dy;
}

var circleArray = []


function init() {
  circleArray = [];
  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 15 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var y = Math.random() * (innerHeight  - radius * 2) + radius;
    var dy = (Math.random() - 0.5) * 2;
    var circle = new Circle(x, y, dx, dy, radius);

    circleArray.push(circle);
  }
}

function growCircle() {
  requestAnimationFrame(growCircle);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].updateGrow();
  }

}



init();
growCircle();

// $('#erase-btn').on('click', eraseCircle);
// function eraseCircle() {
//   requestAnimationFrame(growCircle);
//   c.clearRect(0, 0, innerWidth, innerHeight);

//   for (var i = 0; i < circleArray.length; i++) {
//     circleArray[i].updateErase();
//   }

// }



















