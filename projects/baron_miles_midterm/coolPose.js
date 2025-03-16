class coolPose {
  constructor(kp, mp) {
    this.keypoints = kp;
    this.midpoints = mp;
    this.allpoints = [];
    this.allpoints.push(...this.keypoints,...this.midpoints) // find out how to actually do this.
  }
}