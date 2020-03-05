let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide(windowWidth, windowHeight);
}

function draw() {
  background(255);
  imageMode(CENTER);
  scale(-1.0,1.0);
  image(capture, -windowWidth/2, windowHeight/2, windowWidth*1.3, windowHeight);
}
