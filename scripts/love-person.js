// ml5 Face Detection Model
let faceapi;
let detections = [];
let video;
let w = 640;
let h = 480;
let img;

function setup() {
  let canvas = createCanvas(640, 480);
  let content = document.getElementById("content");
  canvas.parent("content");
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  const faceOptions = { withLandmarks: true, withExpressions: true, withDescriptors: false };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);

  img = document.getElementsByTagName("img");
}

// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  mirrorVideo();
  drawLandmarks();

}

function mirrorVideo() {
  push()
  // mirror video horizontally
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
}

function drawLandmarks() {
  if (detections.length > 0) {
    // let points = detections[0].landmarks.positions;
    // for (let i = 0; i < points.length; i++) {
    //   stroke(161, 95, 251);
    //   strokeWeight(8);
    //   point(points[i]._x, points[i]._y);
    // }
    pop();

    stroke(255, 255, 255);
    strokeWeight(2);

    leftEye = detections[0].parts.leftEye[0];
    disgusted = detections[0].expressions.disgusted;
    text("disgusted: " + (disgusted * 100).toFixed(2).toString() + "%", width - leftEye.x, leftEye.y);

    mouth = detections[0].parts.mouth[0]
    angry = detections[0].expressions.angry;
    text("angry: " + (angry * 100).toFixed(2).toString() + "%", width - mouth.x, mouth.y);

    rightEyebrow = detections[0].parts.rightEyeBrow[0];
    surprised = detections[0].expressions.surprised;
    text("surprised: " + (surprised * 100).toFixed(2).toString() + "%", width - rightEyebrow.x, rightEyebrow.y);

    nose = detections[0].parts.nose[6];
    fearful = detections[0].expressions.fearful;
    text("fearful: " + (fearful * 100).toFixed(2).toString() + "%", width - nose.x, nose.y);

    jawOutline1 = detections[0].parts.jawOutline[14];
    sad = detections[0].expressions.sad;
    text("sad: " + (sad * 100).toFixed(2).toString() + "%", width - jawOutline1.x, jawOutline1.y);

    jawOutline2 = detections[0].parts.jawOutline[3];
    happy = detections[0].expressions.happy;
    text("happy: " + (happy * 100).toFixed(2).toString() + "%", width - jawOutline2.x, jawOutline2.y);
  }
}