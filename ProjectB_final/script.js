console.log("my script works");
// this line turns the canvas into a big base64 string
// let imgData = document.getElementById("defaultCanvas0").toDataURL();



function getRandomImage() {
    let number = Math.floor(Math.random() * randomImages.length);
    return randomImages[number];
}

let colorCircles = [];
let colors = [
    [255, 255, 255],
    [0, 0, 0],
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
let spacing = 40;
let tool;
let currentR = 0,
    currentG = 0,
    currentB = 0;

let bgImg;
let currentImg;

function preload() {
    let currentImg = getRandomImage();
    bgImg = loadImage('data:image/jpeg;base64,' + currentImg);
}


function setup() {
    hideGallery();
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvasContainer");
   
    tb = createGraphics(windowWidth, windowHeight);
    dg = createGraphics(windowWidth, windowHeight);


    for (let i = 0; i < numColorCircles; i++) {
        let y = 1 + i * spacing;
        colorCircles.push(new ColorCircle(y, i));
    }

}

function draw() {
    if (bgImg) {
        imgWidth = width;
        imgHeight = bgImg.height * width / bgImg.width;
        resizeCanvas(imgWidth, windowHeight);
        image(bgImg, 0, 0, imgWidth, imgHeight);
    }
    showToolbar();
    image(dg, 0, 0);
}

class Tool {
    constructor() {
        this.x = mouseX;
        this.y = mouseY;
        this.r = 0;
        this.g = 0;
        this.b = 0;
    }
    display() {
        if (mouseIsPressed) {
            dg.push();
            dg.stroke(this.r, this.g, this.b);
            dg.strokeWeight(5);
            dg.line(pmouseX, pmouseY, mouseX, mouseY);
            dg.pop();

        }
    }

}

class ColorCircle {
    constructor(startY, colorIndex) {
        this.x = 37;
        this.y = 45 + startY;
        this.dia = 35;
        this.r = colors[colorIndex][0];
        this.g = colors[colorIndex][1];
        this.b = colors[colorIndex][2];
        this.colorSwitch = false;
    }

    drawColor(x, y) {
        tb.push();
        tb.strokeWeight(0.5);
        tb.stroke(0);
        tb.fill(this.r, this.g, this.b);
        tb.circle(0, 0, this.dia);
        tb.pop();
    }

    display() {
        tb.push();
        tb.translate(this.x, this.y);
        this.drawColor(0, 0);
        tb.pop();
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

function clearToolbar() {
    tb.erase();
}

function showToolbar() {
    myTool = new Tool();
    for (let i = 0; i < colorCircles.length; i++) {
        colorCircles[i].display();
        myTool.r = currentR;
        myTool.g = currentG;
        myTool.b = currentB;
    }
    image(tb, 0, 0);
    myTool.display();
}

function hideGallery() {
    document.getElementById('galleryContainer');
}

function saveImg() {
    clearToolbar();
    let imgBased64 = document.getElementById('defaultCanvas0').toDataURL("image/jpeg").split(';base64,')[1];
    saveToLS('save-images', imgBased64);
    showGallery();
}

function saveToLS(key, img) {
    let savedImgsArray = loadfromLS(key);
    if (Array.isArray(savedImgsArray)) {
        savedImgsArray.push(img);
        saveItem(key, JSON.stringify(savedImgsArray));
    } else {
        let imgArray = [];
        imgArray.push(img);
        saveItem(key, JSON.stringify(imgArray));
    }
}

function saveItem(k,kv) {
    try {
        localStorage.setItem(k, kv);
    } 
catch (err) {
        alert('Storage is full, erase all');
        localStorage.clear();
    }
}

function loadfromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

function showGallery() {
    document.getElementById('galleryContainer').style.display = '';
    hideCanvas();
    let savedImgsArray = loadfromLS('save-images');
    let output = '';
    savedImgsArray.forEach((element, index) => output += '<li><a href="javascript:loadImg(' + index + ')"><img src="data:image/jpeg;base64,' + element + '"></a></li>');
    document.getElementById('galleryContainer').innerHTML = '<ul>' + output + '</ul>';
}

function loadImg(id) {
    hideGallery();
    let savedImgsArray = loadfromLS('save-images');
    let currentImg = savedImgsArray[id];
    showCanvas();
    bgImg = loadImage('data:image/jpeg;base64,' + currentImg);
    

}

function hideCanvas() {
    document.getElementById('mainContainer').style.display = 'none';
}

function showCanvas() {
    document.getElementById('mainContainer').style.display = '';
}

function hideGallery() {
    document.getElementById('galleryContainer').style.display = 'none';
}