let handPose;
let video;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let fingerTips = [4, 8, 12, 16, 20];

    for (let index of fingerTips) {
      let tip = hand.keypoints[index];
      // 가로 빔 함수 호출
      drawHorizontalLaser(tip.x, tip.y);
    }
  }
  pop();
}

function gotHands(results) {
  hands = results;
}

// 가로로 발사되는 두꺼운 레이저
function drawHorizontalLaser(x, y) {
  push();
  
  // 1. 외곽 글로우 (가로 방향으로 번지게)
  noStroke();
  for (let i = 20; i > 0; i--) {
    fill(0, 255, 0, 30 - i * 1.5);
    // 높이(height)를 i에 맞춰 조절해서 가로로 길게 그리기
    // x 좌표 0부터 손가락 위치 x까지 그립니다.
    rect(0, y - (i * 3), x, i * 6); 
  }

  // 2. 메인 빔 (가로 선)
  stroke(0, 255, 0);
  strokeWeight(15);
  line(x, y, 0, y); // 손가락(x, y)에서 왼쪽 끝(0, y)까지

  // 3. 중심 화이트 코어
  stroke(255, 255, 255, 200);
  strokeWeight(5);
  line(x, y, 0, y);
  
  // 4. 손가락 끝 광원 효과
  noStroke();
  fill(255);
  circle(x, y, 25);
  fill(0, 255, 0, 150);
  circle(x, y, 40);

  pop();
}