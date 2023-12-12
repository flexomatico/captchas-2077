let canvas;

function setup() {
    canvas = createCanvas(windowWidth / 2, windowWidth / 2, document.getElementById('drawCircleCanvas'));
    background(240);
    stroke('orange');
    strokeWeight(4);
}


function draw() {
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}


let submitButton = document.getElementById('drawCircleSubmitButton');
submitButton.onsubmit = function () {

}