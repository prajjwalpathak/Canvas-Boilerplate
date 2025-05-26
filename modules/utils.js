// Random function
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Random Direction
const getRandomDirection = () => {
  let speed = [2, -2];
  return speed[Math.floor(getRandom(0, 2))];
};

// Distance between co-ordinates
const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};