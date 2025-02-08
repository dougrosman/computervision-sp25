/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing skeletons on poses for the MoveNet model.
 */

let video;
let bodyPose;
let poses = [];
let connections;

let options = {
  modelType: "MULTIPOSE_LIGHTNING", // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDER"
  enableSmoothing: true,
  minPoseScore: 0.25,
  multiPoseMaxDimension: 384,
  enableTracking: true,
  trackerType: "boundingBox", // "keypoint" or "boundingBox"
  trackerConfig: {},
  modelUrl: undefined,
  flipped: false
}

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose("MoveNet", options);
  video = createVideo("group-3-cropped-720p.mp4", startVideo);
}

function startVideo() {
  video.volume(0);
  video.play();
  video.loop();
}

function setup() {
  createCanvas(video.width, video.height);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0);

  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 8);
      }
    }
  }

  connectHands();
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}

function connectHands() {

  // store hand keypoints in an array
  let handPositions = [];

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    //handPositions.push(pose.left_wrist, pose.right_wrist, pose.right_ankle, pose.left_ankle)
    handPositions.push(pose.left_wrist)
    
  }

  // draw shape
  stroke(0, 0, 255);
  strokeWeight(3)
  fill(255, 0, 0, 100);
  beginShape()
  for(let i = 0; i < handPositions.length; i++) {
    vertex(handPositions[i].x, handPositions[i].y)
  }
  endShape(CLOSE)
}

function keyPressed() {
  if(key == " ") {
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
      console.log(pose)
    }
  }
}