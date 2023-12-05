let progress = 0;
let loadingWidth = 100;
let loadingHeight = 20;
let posX = 0;
let posY = 0;

function setup() {
    let canvas = createCanvas(100, 50);
    canvas.parent("loadingBar");
    console.log("GO FELIX");
}

function draw() {
    background(255);
    fill(255);
    rect(posX, posY, loadingWidth, loadingHeight);
    fill(0, 255, 0);
    rect(posX, posY, progress, loadingHeight);
    progress++;
    if (progress > loadingWidth) {
        print("done");
        progress = loadingWidth;
        window.location.href = "./Step1_thankyou.html";
    }
    fill(0);
    text(progress + "%", posX + 40, posY + 50);

}