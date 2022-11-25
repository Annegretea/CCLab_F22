


let cells = [];
let numCells = 28;
let spacing = 30;
let virus;
let timeLimit = 300;
let countDown;
let angle = 90;

function setup() {
  let cnv = createCanvas(800,800);
cnv.parent("canvasContainer");

  for (let j = 0; j < numCells; j++) {
    let y = j * spacing;

    for (let i = 0; i < numCells; i++) {
      let x = i * spacing;

      let latestCell = new Cell(x, y);

      cells.push(latestCell);
    }
  }
  virus = new Virus();
}

function draw() {
  background(100, 0, 0);

  for (let i = 0; i < cells.length; i++) {
    cells[i].checkCollision(virus);
    cells[i].checkNeighbours1(cells);
    cells[i].virusBounce(virus);
    cells[i].recovery();
    cells[i].display();
  }

  // virus.shrink();
  virus.update();
  virus.display();
}

// Let's create the Cells
class Cell {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.age = 0;
    this.deathYear = random(6, 10);
    this.alive = true;
    this.state = "immune";
    this.state = "infected1";
    this.state = "infected2";
    this.state = "recovery";
    this.state = "normal";
    this.timer = 100;

    this.cellNormalCol = { r: 255, g: 168, b: 168 };
    this.cellImmuneCol = { r: 0, g: 120, b: 255 };
    this.cellInfected1Col = { r: 255, g: 12, b: 0 };
    this.cellInfected2Col = { r: 255, g: 101, b: 52 };
    this.cellInfected3Col = { r: 255, g: 192, b: 35 };
    this.cellRecoveryCol = { r: 67, g: 165, b: 4 };
  }

  // Mathing the state of the cell with the corresponding color
  drawCell(x, y) {
    push();
    if (this.state == "immune") {
      fill(this.cellImmuneCol.r, this.cellImmuneCol.g, this.cellImmuneCol.b);
    } else if (this.state == "infected1") {
      fill(
        this.cellInfected1Col.r,
        this.cellInfected1Col.g,
        this.cellInfected1Col.b
      );
    } else if (this.state == "infected2") {
      fill(
        this.cellInfected2Col.r,
        this.cellInfected2Col.g,
        this.cellInfected2Col.b
      );
    } else if (this.state == "infected3") {
      fill(
        this.cellInfected3Col.r,
        this.cellInfected3Col.g,
        this.cellInfected3Col.b
      );
    } else if (this.state == "normal") {
      fill(this.cellNormalCol.r, this.cellNormalCol.g, this.cellNormalCol.b);
    } else if (this.state == "recovery") {
      fill(
        this.cellRecoveryCol.r,
        this.cellRecoveryCol.g,
        this.cellRecoveryCol.b
      );
    }

    circle(0, 0, this.dia);
    pop();
  }

  update() {}

  //   Checking whether the virus is touching any cells, if yes, the new updated status of the cell is infected1
  checkCollision(virus) {
    // console.log("am i touching the virus?")
    let virusDistance = dist(this.x, this.y, virus.x, virus.y);
    let sumRadius = this.dia / 2 + virus.dia / 2;
    if (
      virusDistance < sumRadius &&
      (this.state == "infected2" ||
        this.state == "normal" ||
        this.state == "infected3" ||
        this.state == "recovery")
    ) {
      // If the current cell is not infected, it'll turn to infected1 (red)
      this.state = "infected1";
    } else {
    }
  }

  //   Checking whether any of the neighbouring cells have been infected, if yes and by direct contact with the virus, it's 70% chance, it's going to turn infected2 (orange); if yes and by being a secondary-contact of the virus, it's 40% chnace it's going to turn infected3 (yellow)
  checkNeighbours1(other) {
    for (let i = 0; i < other.length; i++) {
      let otherCell = other[i];

      if (otherCell != this) {
        let distance = dist(this.x, this.y, otherCell.x, otherCell.y);
        let sumRadius = this.dia / 2 + otherCell.dia / 2;

        let neighbourState = otherCell.state;
        let ranValue = random(1);

        if (
          this.state == "normal" &&
          neighbourState == "infected1" &&
          distance <= sumRadius &&
          ranValue < 0.8
        ) {
          this.state = "infected2";
        } else if (
          this.state == "normal" &&
          neighbourState == "infected2" &&
          distance <= sumRadius &&
          ranValue < 0.5
        ) {
          this.state = "infected3";
        }
      }
    }
  }

  //   Giving immune cells the power to manipulate the direction of the virus cell, by creating a bounce effect, when the virus meets an immune cell
  virusBounce(virus) {
    let virusDistance = dist(this.x, this.y, virus.x, virus.y);
    let sumRadius = this.dia / 2 + virus.dia / 2;
    if (virusDistance < sumRadius && this.state == "immune") {
      virus.spd1 = virus.spd1 * -1;
      virus.spd2 = virus.spd2 * -1;
    } else {
    }
  }

  //   If the timer runs out per each infected cell, all the infected cells will recover
  recovery() {
    if (
      this.state == "infected1" ||
      this.state == "infected2" ||
      this.state == "infected3"
    ) {
      this.timer--;
    }

    if (
      (this.state == "infected1" ||
        this.state == "infected2" ||
        this.state == "infected3") &&
      this.timer == 0
    ) {
      this.state = "recovery";
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawCell(0, 0);
    pop();
  }

  //   Creating immune cells (blue) by clicking on healthy cells
  checkIfClicked() {
    // console.log("am I clicked???", mouseX, mouseY);
    let distanceToClick = dist(this.x, this.y, mouseX, mouseY);
    if (distanceToClick < this.dia / 2 && this.state == "normal") {
      this.state = "immune";
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].checkIfClicked();
  }
}

// Let's create the Virus
class Virus {
  constructor() {
    this.x = 0;
    this.y = random(450, 550);
    this.spd1 = 3;
    this.spd2 = random(0, 50);
    this.infRate1 = 1;
    this.dia = 100;
    this.sinValue = sin(radians(angle));
  }

  //   Adding the random movement to the Virus
  update() {
    frameRate(40);
    let r = random(-1, 1);
    let r1 = random(-1, 1);
    this.x += this.spd1 + r;
    this.y += this.spd2 * r1;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255);
    circle(0, 0, this.dia);
    pop();
  }
}

