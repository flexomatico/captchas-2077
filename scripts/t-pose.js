let video;
var w, h;
let poseNet;
let pose, skeleton;


function setup(){
  w = window.innerWidth * 0.7;
  h = window.innerHeight * 0.7;
  createCanvas(w, h);
  video = createCapture(VIDEO);
  video.size(w, h)
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses, {flipHorizontal: false});
}

function draw(){
  mirrorVideo();

  if (pose) {
    drawSkeleton();
    evaluateTPose
  }
}

function modelLoaded() {
  console.log("PoseNet ready.");
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function mirrorVideo() {
  // mirror video horizontally
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
}

function drawSkeleton() {
  skeleton.forEach(connection => {
    stroke(135, 233, 17);
    strokeWeight(10);
    let a = connection[0];
    let b = connection[1];
    line(a.position.x, a.position.y, b.position.x, b.position.y);

    fill(255, 0, 189);
    noStroke()
    ellipse(a.position.x, a.position.y, 32);
    ellipse(b.position.x, b.position.y, 32);
  });
}