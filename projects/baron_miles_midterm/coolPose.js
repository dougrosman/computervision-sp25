class coolPose {
  constructor(kp, mp, id) {
    
    // HSB color scheme, so the range is:
    // H: 0-360
    // S: 0-100
    // B: 0-100
    this.colorScheme = [color(0, 70, 100),
                        color(30, 70, 100),
                        color(60, 70, 100),
                        color(90, 70, 100),
                        color(120, 70, 100),
                        color(150, 70, 100),
                        color(180, 70, 100),
                        color(210, 70, 100),
                        color(240, 70, 100),
                        color(270, 70, 100),
                        color(300, 70, 100),
                        color(330, 70, 100),
                        ]
    


    this.keypoints = kp;
    this.midpoints = mp;
    this.allpoints = [];
    this.allpoints.push(...this.keypoints,...this.midpoints)
    this.id = id
    this.poseColorIndex = this.id % this.colorScheme.length
    this.poseColor = this.colorScheme[this.poseColorIndex]

    for(let i = 0; i < this.allpoints.length; i++) {
      this.allpoints[i].fillColor = this.poseColor
    }
  }
}