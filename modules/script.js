const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
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
const isColliding = (bubble, otherBubble) => {
  let distance = getDistance(bubble.x, bubble.y, otherBubble.x, otherBubble.y);
  return distance <= bubble.radius + otherBubble.radius;
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
const resolveCollision = (bubble, otherBubble) => {
  let xVelocityDiff = bubble.velocity.x - otherBubble.velocity.x;
  let yVelocityDiff = bubble.velocity.y - otherBubble.velocity.y;

  let xDistance = otherBubble.x - bubble.x;
  let yDistance = otherBubble.y - bubble.y;

  // prevent accidental overlap of bubbles
  if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
    // angle between the two colliding bubbles
    let angle = -Math.atan2(yDistance, xDistance);
    let m1 = bubble.mass;
    let m2 = otherBubble.mass;

    // velocity before collision
    let u1 = rotate(bubble.velocity, angle);
    let u2 = rotate(otherBubble.velocity, angle);

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

    bubble.velocity.x = v1Final.x;
    bubble.velocity.y = v1Final.y;

    otherBubble.velocity.x = v2Final.x;
    otherBubble.velocity.y = v2Final.y;
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
  // c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Your code
};

// Call animate()
animate();

/* To do:
 -> Collision detection for rectangular objects
 -> Optimise collision detection and resolution
 -> Add acceleration and friction
 -> Image and animation */