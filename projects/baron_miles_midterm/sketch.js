let midpoints = [];
let allPoints = [];

let video;
let bodyPose;
let poses = [];
let connections;
let w = 960;
let h = 720;
let font;
let coolPoses = [];

// allPoints has 25 points (0-24). The first 16 are the original points, and the last 9 are the midpoints.

// 17 - midPoint612
// 18 - midPoint1211
// 19 - midPoint65
// 20 - midPoint511
// 21 - fuckthis1
// 22 - fuckthis2
// 23 - legthis1
// 24 - legthis2

// create arrays of connections for each part of the body that you need to draw a shape for. These were created by hand based on the shapes you both made in class a few weeks ago.
const upperArmRightConnections = [6, 17, 8]
const upperArmLeftConnections = [5, 20, 7]

const lowerArmRightConnections = [8, 21, 10]
const lowerArmLeftConnections = [7, 22, 9]

const torsoConnections = [6, 17, 12, 18, 11, 20, 5, 19]

const headRight1Connections = [19, 4, 2]
const headRight2Connections = [19, 2, 0]

const headLeft1Connections = [19, 3, 1]
const headLeft2Connections = [19, 0, 1]

const upperLegRightConnections = [18, 14, 12]
const lowerLegRightConnections = [23, 14, 16]

const upperLegLeftConnections = [18, 11, 13]
const lowerLegLeftConnections = [24, 13, 15]

// create an array of all the connections (this will make things easier later)
const ALL_CONNECTIONS = [upperArmRightConnections, upperArmLeftConnections, lowerArmRightConnections, lowerArmLeftConnections, torsoConnections, headRight1Connections, headRight2Connections, headLeft1Connections, headLeft2Connections, upperLegRightConnections, upperLegLeftConnections, lowerLegRightConnections, lowerLegLeftConnections]



let options = {
  modelType: "MULTIPOSE_LIGHTNING", // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDER"
  enableSmoothing: true,
  minPoseScore: 0.2,
  multiPoseMaxDimension: 384,
  enableTracking: true,
  trackerType: "boundingBox", // "keypoint" or "boundingBox"
  trackerConfig: {},
  modelUrl: undefined,
  flipped: false,
};

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose("MoveNet", options);
  font = loadFont("Arial.ttf")
  // change this to "five.mp4" to see a video with 5 people
  video = createVideo("five.mp4")
}

function setup() {
  createCanvas(w, h, WEBGL);
  //video = createCapture(VIDEO, { flipped: true });
  video.size(w, h);
  //video.play();
  video.volume(0);
  video.loop();
  video.hide();
  textFont(font)

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);

  colorMode(HSB);
}

function draw() {
  // Draw the webcam video
  //image(video, 0, 0);
  //background(255);
  translate(-width/2, -height/2)
  image(video, 0, 0);
  
  
  // clear the coolPoses array each frame
  coolPoses = [];

  // loop through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    
    let coolKeypoints = [];

    // get all the original keypoints and push them into pose.keypoints
    for (let j = 0; j < pose.keypoints.length; j++) {
      let anchorKeypoint = pose.keypoints[j];
      coolKeypoints.push(new coolKeypoint(createVector(anchorKeypoint.x, anchorKeypoint.y), pose.id))      
    }

    // get all the midpoints and store them in an array called "coolKeypointsMid"
    let coolKeypointsMid = createMidpoints(pose)

    coolPoses.push(new coolPose(coolKeypoints, coolKeypointsMid, pose.id))
  }

  // this function reorders the coolPoses array from left to right, so that the first pose in the array the one on the left, and the last pose is the one on the right, and so on. This makes sure that the colors don't flicker constantly.
  
  // comment this out to see what happens if you don't reorder the poses
  //reorderPoses();

  // set the fill color of the keypoints based on the index of the coolPose
  // THIS IS WHERE YOU CAN PROVIDE YOUR OWN COLOR SCHEME
  for(let i = 0; i < coolPoses.length; i++) {
    let coolPose = coolPoses[i]
    for(let j = 0; j < coolPose.allpoints.length; j++) {
      // coolPose.allpoints[j].baseColor = coolPose.poseColor;
      //coolPose.allpoints[j].fillColor = coolPose.allpoints[j].baseColor;

      // if(i == 0) {
      //   coolPose.allpoints[j].fillColor = color(0, 70, 100)
      // } else if(i == 1) {
      //   coolPose.allpoints[j].fillColor = color(60, 70, 100)
      // } else if(i == 2) {
      //   coolPose.allpoints[j].fillColor = color(120, 70, 100)
      // } else if(i == 3) {
      //   coolPose.allpoints[j].fillColor = color(180, 70, 100)
      // } else if(i == 4) {
      //   coolPose.allpoints[j].fillColor = color(240, 70, 100)
      // } else if(i == 5) {
      //   coolPose.allpoints[j].fillColor = color(300, 70, 100)
      // }
    }
  }
  
  // WE NOW HAVE ALL THE COOLPOSES WITH ALL OF THEIR KEYPOINTS AND MIDPOINTS, SO WE CAN CHECK ALL THE DISTANCES BETWEEN THEM WITH OUR 4X NESTED FOR-LOOP MESS TO SEE WHICH KEYPOINTS ARE TOUCHING WHICH OTHER KEYPOINTS
  
  // loop through all the coolPoses...
  for(let i = 0; i < coolPoses.length; i++) {
    let coolPose = coolPoses[i]
    
    // loop through all the coolPoses again, (except for the current one)
    for(let j = 0; j < coolPoses.length; j++) {

      // if the current coolPose is not the same as the one we're checking
      if(i != j) {
        let tempCoolPose = coolPoses[j];
        
        // loop through all the keypoints in the current coolPose
        for(let k = 0; k < coolPose.allpoints.length; k++) {
          let anchorCoolKeypoint = coolPose.allpoints[k]
          
          // loop through all the keypoints in the other coolPose, checking the distance between the anchor keypoint and the other keypoints
          for(let m = 0; m < tempCoolPose.allpoints.length; m++) {
            let tempCoolKeypoint = tempCoolPose.allpoints[m]
            
            // check the distance. The distance is 60, but you can change it to whatever you want.
            if(p5.Vector.dist(anchorCoolKeypoint.pos, tempCoolKeypoint.pos) < 60) {
              
              anchorCoolKeypoint.touched = true;
              tempCoolKeypoint.touched = true;
              
              // lerp the colors of the anchor keypoint and the temp keypoint
              let lerpedColor = lerpColor(anchorCoolKeypoint.baseColor, tempCoolKeypoint.baseColor, 0.5);
              anchorCoolKeypoint.fillColor = lerpedColor;
              tempCoolKeypoint.fillColor = lerpedColor;
            }
          }
        }
      }
    }
  }
  
  

  for(let coolPose of coolPoses) {
    for(connection of ALL_CONNECTIONS) {
      beginShape();
      for(let i = 0; i < connection.length; i++) {
        let keypoint = coolPose.allpoints[connection[i]];
        if(keypoint.touched) {
          fill(keypoint.fillColor)
        } else {
          fill(keypoint.baseColor)
        }
        vertex(keypoint.pos.x, keypoint.pos.y);
      }
      endShape(CLOSE);
    }
  }

  // we've got the distance calc stuff, let's see if it's working by drawing the keypoints and changing color based on touched

  // debugDrawKeypoints();
}

function debugDrawKeypoints(coolPose) {
  for(let coolPose of coolPoses) {
    for(let i = 0; i < coolPose.allpoints.length; i++) {
      let ckp = coolPose.allpoints[i];
      
      if(ckp.touched) {
        fill(ckp.fillColor)
      } else {
        fill(255, 255, 255);
      }
      circle(ckp.pos.x, ckp.pos.y, 10);
    }
  }
}

function createMidpoints(pose) {
  let kp6 = createVector(pose.keypoints[6].x, pose.keypoints[6].y);
    let kp5 = createVector(pose.keypoints[5].x, pose.keypoints[5].y);
    let kp12 = createVector(pose.keypoints[12].x, pose.keypoints[12].y);
    let kp11 = createVector(pose.keypoints[11].x, pose.keypoints[11].y);
    let kp8 = createVector(pose.keypoints[8].x, pose.keypoints[8].y);
    let kp7 = createVector(pose.keypoints[7].x, pose.keypoints[7].y);
    let kp14 = createVector(pose.keypoints[14].x, pose.keypoints[14].y);
    let kp13 = createVector(pose.keypoints[13].x, pose.keypoints[13].y);
    
    // create midpoints
    let midPoint612 = new coolKeypoint(p5.Vector.lerp(kp6, kp12, 0.5));
    let midPoint1211 = new coolKeypoint(p5.Vector.lerp(kp12, kp11, 0.5));
    let midPoint65 = new coolKeypoint(p5.Vector.lerp(kp6, kp5, 0.5));
    let midPoint511 = new coolKeypoint(p5.Vector.lerp(kp5, kp11, 0.5));
    let fuckthis1 = new coolKeypoint(p5.Vector.lerp(midPoint612.pos, kp8, 0.5));
    let fuckthis2 = new coolKeypoint(p5.Vector.lerp(midPoint511.pos, kp7, 0.5));
    let legthis1 = new coolKeypoint(p5.Vector.lerp(midPoint1211.pos, kp14, 0.5));
    let legthis2 = new coolKeypoint(p5.Vector.lerp(midPoint1211.pos, kp13, 0.5));


    
    let midPoints = [midPoint612, midPoint1211, midPoint65, midPoint511, fuckthis1, fuckthis2, legthis1, legthis2]

    return midPoints;
  
}


function reorderPoses() {
  // Re-order the coolPoses array from left to right
  // Calculate the average x position for each pose
  let posePositions = [];
  for (let i = 0; i < coolPoses.length; i++) {
    let coolPose = coolPoses[i];
    let totalX = 0;
    let validPoints = 0;
    
    // Calculate average x position using all valid points
    for (let j = 0; j < coolPose.allpoints.length; j++) {
      if (coolPose.allpoints[j].pos.x > 0) {
        totalX += coolPose.allpoints[j].pos.x;
        validPoints++;
      }
    }
    
    let avgX = validPoints > 0 ? totalX / validPoints : 0;
    posePositions.push({
      index: i,
      avgX: avgX
    });
  }
  
  // Sort the positions from left to right (smallest to largest x value)
  posePositions.sort((a, b) => a.avgX - b.avgX);
  
  // Create a new array with the poses in the correct order
  let orderedPoses = [];
  for (let i = 0; i < posePositions.length; i++) {
    orderedPoses.push(coolPoses[posePositions[i].index]);
  }
  
  // Replace the original array with the ordered one
  coolPoses = orderedPoses;
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}

function keyPressed() {
  if (key == " ") {
    for (let i = 0; i < poses.length; i++) {
      let pose = coolPoses[i];
      console.log(pose);
    }
  }
}
