const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// For Circular collision

// Collision Detection
const isColliding = (circle, otherCircle) => {
  let distance = getDistance(circle.x, circle.y, otherCircle.x, otherCircle.y);
  return distance <= circle.radius + otherCircle.radius;
};

// Rotate Function
const rotate = (velocity, angle) => {
  let rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };
  return rotatedVelocities;
};

/* Rotate the axis by contact angle, apply 1-D elastic collision equation,
rotate back the axis to it's original angle */
// Collision Resolution
const resolveCollision = (circle, otherCircle) => {
  let xVelocityDiff = circle.velocity.x - otherCircle.velocity.x;
  let yVelocityDiff = circle.velocity.y - otherCircle.velocity.y;

  let xDistance = otherCircle.x - circle.x;
  let yDistance = otherCircle.y - circle.y;

  // prevent accidental overlap of bubbles
  if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
    // angle between the two colliding bubbles
    let angle = -Math.atan2(yDistance, xDistance);
    let m1 = circle.mass;
    let m2 = otherCircle.mass;

    // velocity before collision
    let u1 = rotate(circle.velocity, angle);
    let u2 = rotate(otherCircle.velocity, angle);

    // velocity after 1-D collision
    let v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    let v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // final velocity after rotating axis back to normal
    let v1Final = rotate(v1, -angle);
    let v2Final = rotate(v2, -angle);

    circle.velocity.x = v1Final.x;
    circle.velocity.y = v1Final.y;

    otherCircle.velocity.x = v2Final.x;
    otherCircle.velocity.y = v2Final.y;
  }
};

const init = () => {
  // Your code
};

// Call init()
init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Your code
};

// Call animate()
animate();

/*  To do:
 -> Collision detection for rectangular objects
 -> Optimise collision detection and resolution
 -> Add acceleration and friction
 -> Image and animation
 -> Add more Physics features */