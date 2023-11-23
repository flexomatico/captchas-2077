let canvas;

function setup() {
    canvas = createCanvas(windowWidth / 4, windowWidth / 4, document.getElementById('drawCircleCanvas'));
    background(240);
    stroke('orange');
    strokeWeight(2);
}


function draw() {
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}


let submitButton = document.getElementById('drawCircleSubmitButton');
submitButton.onsubmit = function () {

}