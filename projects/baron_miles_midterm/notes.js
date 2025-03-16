
  // draw the meshes

  // allpoints 0-24
  // keypoints 0-16 original points
  // keypoints 17-24 midpoints
  
  // let midPoints = [midPoint612, midPoint1211, midPoint65, midPoint511, fuckthis1, fuckthis2, legthis1, legthis2]

  // 17 - midPoint612
  // 18 - midPoint1211
  // 19 - midPoint65
  // 20 - midPoint511
  // 21 - fuckthis1
  // 22 - fuckthis2
  // 23 - legthis1
  // 24 - legthis2



      
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