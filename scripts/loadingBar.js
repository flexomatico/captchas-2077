let progress = 0;
let loadingWidth = 300;
let loadingHeight = 20;
let posX = 0;
let posY = 0;
let font;
let lastTick;
let maxTime = 5;
let speed = loadingWidth / maxTime;

/*function preload() {
    //font = loadFont('./../Audiowide/Audiowide-Regular.ttf');
    font = loadFont('./Audiowide-Regular.ttf');

}*/

function setup() {
    let canvas = createCanvas(300, 100);
    canvas.parent("loadingBar");
    lastTick = millis();
    //console.log("GO FELIX");
}

function draw() {
    background(255);
    fill(255);
    rect(posX, posY, loadingWidth, loadingHeight);
    fill(0, 255, 0);
    rect(posX, posY, progress, loadingHeight);
    progress += speed*(millis()-lastTick)*0.001;
    if (progress > loadingWidth) {
        print("done");
        progress = loadingWidth;
        window.location.href = "./Step1_thankyou.html";
    }
    fill(0);
    textFont('Audiowide');
    text("Loading..." + int((progress / loadingWidth)*100) + "%", posX + 110, posY + 50);
    lastTick = millis();
    //console.log(millis());
}

