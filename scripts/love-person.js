// ml5 Face Detection Model
let faceapi;
let detections = [];
let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  const faceOptions = { withLandmarks: true, withExpressions: true, withDescriptors: false };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
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
  image(video, 0, 0);
  console.log(detections)

}

function mirrorVideo() {
  // mirror video horizontally
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
}