let video;
var w, h;
let poseNet;
let pose, skeleton;
let evalJoints;
let minConfidence = 0.5

function setup(){
  w = window.innerWidth * 0.7;
  h = window.innerHeight * 0.7;
  createCanvas(w, h);
  video = createCapture(VIDEO);
  video.size(w, h)
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses, {flipHorizontal: false, minConfidence: minConfidence});

  angleMode(DEGREES);
}

function draw(){
  mirrorVideo();

  if (pose) {
    drawSkeleton();
    evaluateTPose();
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

function resetEvalJoints(){
  evalJoints = {
    leftShoulder: null,
    rightShoulder: null,
    leftWrist: null,
    rightWrist: null,
    leftHip: null,
    rightHip: null
  }
}

function evaluateTPose() {
  resetEvalJoints();

  // get joint positions
  evalJoints['leftShoulder'] = pose.leftHip.confidence > minConfidence ? createVector(pose.leftShoulder.x, pose.leftShoulder.y) : null;
  evalJoints['rightShoulder'] = pose.leftHip.confidence > minConfidence ? createVector(pose.rightShoulder.x, pose.rightShoulder.y) : null;
  evalJoints['leftWrist'] = pose.leftHip.confidence > minConfidence ? createVector(pose.leftWrist.x, pose.leftWrist.y) : null;
  evalJoints['rightWrist'] = pose.leftHip.confidence > minConfidence ? createVector(pose.rightWrist.x, pose.rightWrist.y) : null;
  evalJoints['leftHip'] = pose.leftHip.confidence > minConfidence ? createVector(pose.leftHip.x, pose.leftHip.y) : null;
  evalJoints['rightHip'] = pose.leftHip.confidence > minConfidence ? createVector(pose.rightHip.x, pose.rightHip.y) : null;

  // check if all joints are there, else stop
  for (key in evalJoints) {
    if (evalJoints[key] == null)
      return;
  }

  let leftArmVec = evalJoints['leftWrist'].sub(evalJoints['leftShoulder']).normalize();
  let leftBodyVec = evalJoints['leftHip'].sub(evalJoints['leftShoulder']).normalize();
  let rightArmVec = evalJoints['rightWrist'].sub(evalJoints['rightShoulder']).normalize();
  let rightBodyVec = evalJoints['rightHip'].sub(evalJoints['rightShoulder']).normalize();

  let leftAngle = leftArmVec.angleBetween(leftBodyVec);
  let rightAngle = rightArmVec.angleBetween(rightBodyVec);

  console.log('leftAngle: ' + leftAngle);
  console.log('rightAngle: ' + rightAngle);
}