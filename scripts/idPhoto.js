let video;
let w = 640;
let h = 480;
let isLiveView = true;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.id("webcamCanvas");
  canvas.parent("camera");
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}

function draw() {
    if(isLiveView)
        mirrorVideo();
}

function mirrorVideo() {
  push()
  // mirror video horizontally
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
}

function takePhoto() {
    console.log("Take photo")
    isLiveView = false;
    setTimeout(advancePage,1000);
}

function advancePage() {
    window.location.href = "./IDphoto_error.html";
}