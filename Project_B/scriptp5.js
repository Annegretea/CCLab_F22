console.log("my script works");

let colorCircles = [];
let colors = [
  [255, 102, 102],
  [255, 140, 102],
  [255, 179, 102],
  [255, 217, 102],
  [255, 255, 102],
  [217, 255, 102],
  [179, 255, 102],
  [140, 255, 102],
  [102, 255, 102],
  [102, 255, 140],
  [102, 255, 179],
  [102, 255, 204],
  [102, 255, 255],
  [102, 217, 255],
  [102, 179, 255],
  [102, 140, 255],
  [102, 102, 255],
  [140, 102, 255],
  [179, 102, 255],
  [217, 102, 255],
  [255, 102, 255],
  [255, 102, 217],
  [255, 102, 179],
];
let numColorCircles = 23;
let spacing = 35;
let tool;
let currentR = 0,
  currentG = 0,
  currentB = 0;
let img;
let imageArray = [];
let numImg = 5

// function preload(){
// let a = loadImage("image/image1.jpeg");
// let b = loadImage("image/image2.jpeg");
// let c = loadImage("image/image3.jpeg");
// let d = loadImage("image/image4.jpeg");
// let e = loadImage("image/image5.jpeg");
// imageArray.push(a);
// imageArray.push(b);
// imageArray.push(c);
// imageArray.push(d);
// imageArray.push(e);
// // use for loop to assign each picture to an array
// // img = loadImage("script.js/getRandomImage");
// for(let a = imageArray[0]; a < numImg; a++){
// let latestImg = new Image(a)
// img.push(latestImg);



// }

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.parent("canvasContainer");
  cnv.style('z-index', '-1');
  // image(img, 0, 0);

  background(0);
  for (let i = 0; i < numColorCircles; i++) {
    let y = 1 + i * spacing;
    colorCircles.push(new ColorCircle(y, i));
  }

  myTool = new Tool();
}

function draw() {


  for (let i = 0; i < colorCircles.length; i++) {
    colorCircles[i].display();

    myTool.r = currentR;
    myTool.g = currentG;
    myTool.b = currentB;

  }

  myTool.display();

}
function nextImage(){
//  image(img, 0, 0);
 image(imageArray[0], 0, 0);

  
}


class Tool {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.dia = 20;
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
  display() {
    if (mouseIsPressed) {
      push();
      stroke(this.r, this.g, this.b);
      strokeWeight(5);
      line(pmouseX, pmouseY, mouseX, mouseY);
      pop();
    }
  }
}

class ColorCircle {
  constructor(startY, colorIndex) {
    this.x = 20;
    this.y = 23 + startY;
    this.dia = 30;
    this.r = colors[colorIndex][0];
    this.g = colors[colorIndex][1];
    this.b = colors[colorIndex][2];
    this.colorSwitch = false;
  }

  drawColor(x, y) {
    push();
    fill(this.r, this.g, this.b);
    circle(0, 0, this.dia);
    pop();
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawColor(0, 0);
    pop();
  }

  checkIfClicked() {
    let distanceToClick = dist(this.x, this.y, mouseX, mouseY);
    if (distanceToClick < this.dia / 2) {
      this.colorSwitch = true;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < colorCircles.length; i++) {
    colorCircles[i].checkIfClicked();

    if (colorCircles[i].colorSwitch) {
      for (let a = 0; a < i; a++) {
        colorCircles[a].colorSwitch = false;
      }
      for (let b = i + 1; b < colorCircles.length; b++) {
        colorCircles[b].colorSwitch = false;
      }

      currentR = colorCircles[i].r;
      currentG = colorCircles[i].g;
      currentB = colorCircles[i].b;
    }
  }
}
