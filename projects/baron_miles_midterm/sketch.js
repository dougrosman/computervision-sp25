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
  video = createVideo("two_people.mp4")
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
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  // Draw the webcam video
  //image(video, 0, 0);
  //background(255);
  translate(-width/2, -height/2)
  image(video, 0, 0);
  
  
  
  // create all of the coolPoses and store them
  coolPoses = [];
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    
    let coolKeypoints = [];
    let coolKeypointsMid = [];

    // get all the keypoints here, and push them into pose.keypoints
    for (let j = 0; j < pose.keypoints.length; j++) {
      let anchorKeypoint = pose.keypoints[j];
      coolKeypoints.push(new coolKeypoint(createVector(anchorKeypoint.x, anchorKeypoint.y)))      
    }

    // get all the midpoints here, and push them into pose.keypoints pose.keypoints.push(midpoints)
    coolKeypointsMid = createMidpoints(pose)
    coolPoses.push(new coolPose(coolKeypoints, coolKeypointsMid))

  }
  
  // WE NOW HAVE ALL THE COOLPOSES WITH ALL OF THEIR KEYPOINTS AND MIDPOINTS, SO WE CAN CHECK ALL THE DISTANCES WITH OUR 4X NESTED FOR-LOOP MESS
  
  // loop through all the coolPoses...
  for(let i = 0; i < coolPoses.length; i++) {
    let coolPose = coolPoses[i]
    
    // loop through all the coolPoses again, except for the current one
    for(let j = 0; j < coolPoses.length; j++) {
      if(i != j) {
        let tempCoolPose = coolPoses[j];
        
        // loop through all the keypoints in the current coolPose
        for(let k = 0; k < coolPose.allpoints.length; k++) {
          let anchorCoolKeypoint = coolPose.allpoints[k]
          
          // loop through all the keypoints in the other coolPose, checking the distance between the anchor keypoint and the other keypoints
          for(let m = 0; m < tempCoolPose.allpoints.length; m++) {
            let tempCoolKeypoint = tempCoolPose.allpoints[m]
            
            // check the distance
            if(p5.Vector.dist(anchorCoolKeypoint.pos, tempCoolKeypoint.pos) < 40 && anchorCoolKeypoint.touched == false) {
              anchorCoolKeypoint.touched = true;
              tempCoolKeypoint.touched = true;
            }
          }
        }
      }
    }
  }
  
  //console.log(coolPoses)
  
  // we've got the distance calc stuff, let's see if it's working
  noStroke();
  for(let coolPose of coolPoses) {
    //text(coolPose.allpoints[0].pos.x, coolPose.allpoints[0].pos.y, 10)
    for(let i = 0; i < coolPose.allpoints.length; i++) {
      let ckp = coolPose.allpoints[i];
      
      if(ckp.touched) {
        fill(0, 255, 0)
      } else {
        fill(255, 0, 0);
      }

      //fill(255, 0, 0);
      circle(ckp.pos.x, ckp.pos.y, 10);
    }
  }

  // draw the meshes
  
  
      
//       // UPPER ARM (right)
//       beginShape();
//       vertex(pose.keypoints[6].x, pose.keypoints[6].y);
//       vertex(midPoint612.x, midPoint612.y);
//       vertex(pose.keypoints[8].x, pose.keypoints[8].y);
//       endShape(CLOSE);

//       //UPPER ARM (left)
//       beginShape();
//       vertex(pose.keypoints[5].x, pose.keypoints[5].y);
//       vertex(midPoint511.x, midPoint511.y);
//       vertex(pose.keypoints[7].x, pose.keypoints[7].y);
//       endShape(CLOSE);

//       // LOWER ARM (right)
//       beginShape();
//       vertex(pose.keypoints[8].x, pose.keypoints[8].y);
//       vertex(fuckthis1.x, fuckthis1.y);
//       vertex(pose.keypoints[10].x, pose.keypoints[10].y);
//       endShape(CLOSE);

//       // LOWER ARM (left)
//       beginShape();
//       vertex(pose.keypoints[7].x, pose.keypoints[7].y);
//       vertex(fuckthis2.x, fuckthis2.y);
//       vertex(pose.keypoints[9].x, pose.keypoints[9].y);
//       endShape(CLOSE);

//             // TORSO
//       beginShape();
//       vertex(kp6.x, kp6.y);
//       vertex(midPoint612.x, midPoint612.y);
//       vertex(kp12.x, kp12.y);
//       vertex(midPoint1211.x, midPoint1211.y);
//       vertex(kp11.x, kp11.y);
//       vertex(midPoint511.x, midPoint511.y);
//       vertex(kp5.x, kp5.y);
//       vertex(midPoint65.x, midPoint65.y);
//       endShape(CLOSE);

//       // HEAD (rightmost)
//       beginShape();
//       vertex(midPoint65.x, midPoint65.y);
//       vertex(pose.keypoints[4].x, pose.keypoints[4].y);
//       vertex(pose.keypoints[2].x, pose.keypoints[2].y);
//       endShape(CLOSE);

//       // HEAD (2nd rightmost)
//       beginShape();
//       vertex(midPoint65.x, midPoint65.y);
//       vertex(pose.keypoints[2].x, pose.keypoints[2].y);
//       vertex(pose.keypoints[0].x, pose.keypoints[0].y);
//       endShape(CLOSE);

//       // HEAD (leftmost)
//       beginShape();
//       vertex(midPoint65.x, midPoint65.y);
//       vertex(pose.keypoints[3].x, pose.keypoints[3].y);
//       vertex(pose.keypoints[1].x, pose.keypoints[1].y);
//       endShape(CLOSE);

//       // HEAD (2nd leftmost)
//       beginShape();
//       vertex(midPoint65.x, midPoint65.y);
//       vertex(pose.keypoints[0].x, pose.keypoints[0].y);
//       vertex(pose.keypoints[1].x, pose.keypoints[1].y);
//       endShape(CLOSE);

//       // UPPER LEG (right)
//       beginShape();
//       vertex(midPoint1211.x, midPoint1211.y);
//       vertex(pose.keypoints[14].x, pose.keypoints[14].y);
//       vertex(pose.keypoints[12].x, pose.keypoints[12].y);
//       endShape(CLOSE);

//       // LOWER LEG (right)
//       beginShape();
//       vertex(legthis1.x, legthis2.y);
//       vertex(pose.keypoints[14].x, pose.keypoints[14].y);
//       vertex(pose.keypoints[16].x, pose.keypoints[16].y);
//       endShape(CLOSE);

//       // UPPER LEG (left)
//       beginShape();
//       vertex(midPoint1211.x, midPoint1211.y);
//       vertex(pose.keypoints[11].x, pose.keypoints[11].y);
//       vertex(pose.keypoints[13].x, pose.keypoints[13].y);
//       endShape(CLOSE);

//       // LOWER LEG (left)
//       beginShape();
//       vertex(legthis2.x, legthis2.y);
//       vertex(pose.keypoints[13].x, pose.keypoints[13].y);
//       vertex(pose.keypoints[15].x, pose.keypoints[15].y);
//       endShape(CLOSE);
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
    // push midpoints
    // coolKeypointsMid.push(midPoint612)
    // coolKeypointsMid.push(midPoint1211)
    // coolKeypointsMid.push(midPoint65)
    // coolKeypointsMid.push(midPoint511)
    // coolKeypointsMid.push(fuckthis1)
    // coolKeypointsMid.push(fuckthis2)
    // coolKeypointsMid.push(legthis1)
    // coolKeypointsMid.push(legthis2)

    return midPoints;
  
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
