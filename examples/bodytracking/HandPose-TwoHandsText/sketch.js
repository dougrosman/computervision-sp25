let handPose;
let video;
let hands = [];
let w = 640;
let h = 480;
let options = {
  maxHands: 2,
  flipped: true,
  runtime: "mediapipe",
  modelType: "lite",
};
let phrase = "Happy Valentine's Day! ❤️"

function preload() {
  handPose = ml5.handPose(options);
}

function setup() {
  createCanvas(w, h);
  video = createCapture(VIDEO, { flipped: true });
  video.size(w, h);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
  
  if (hands.length > 0) {
    for(let i = 0; i < hands.length; i++) {

      let hand = hands[i];
  
      noStroke();
      fill(255, 0, 0);
      textSize(20)
      //text(hand.handedness, hand.index_finger_tip.x, hand.index_finger_tip.y)

      let pinchDistance = floor(dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.thumb_tip.x, hand.thumb_tip.y))

      let pinchMidPoint = createVector(
            (hand.index_finger_tip.x + hand.thumb_tip.x) / 2,
            (hand.index_finger_tip.y + hand.thumb_tip.y) / 2)

      let circleSize = map(pinchDistance, 1, 400, 4, 400)
      let thickness = map(pinchDistance, 1, 400, 2, 20)

      stroke(255, 255, 0);
      noFill()
      strokeWeight(thickness);
      //circle(pinchMidPoint.x, pinchMidPoint.y, circleSize)

      
      // two handed stuff
      let leftHand;
      let rightHand;
      if(hands.length > 1) {
        if(hands[0].handedness == "Right") {
          rightHand = hands[0]
          leftHand = hands[1]
        } else {
          rightHand = hands[1]
          leftHand = hands[0]
        }

        let handDist = dist(rightHand.index_finger_tip.x, rightHand.index_finger_tip.y, leftHand.index_finger_tip.x, leftHand.index_finger_tip.y)

        let handsMidpoint = createVector((rightHand.index_finger_tip.x + leftHand.index_finger_tip.x)/2, (rightHand.index_finger_tip.y + leftHand.index_finger_tip.y)/2 )

        

        let phraseIndex = floor(map(handDist, 20, 400, 0, phrase.length, true))
        
        let phraseDisplay = ""
        for(let j = 0; j < phraseIndex; j++) {
          phraseDisplay+=`${phrase[j]} `
        }
        stroke(255, 0, 100);
        strokeWeight(2);
        fill(255, 0, 0);
        let tSize = map(handDist, 20, 400, 14, 30)
        textAlign(CENTER)
        textSize(tSize)
        text(phraseDisplay, handsMidpoint.x, handsMidpoint.y)



      }
    }
  }
}

function keyPressed() {
  if (key == " ") {
    print(hands);
  }
}

function gotHands(results) {
  hands = results;
}