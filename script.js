let timer;
let startTime;
let running = false;
let laps = [];
let circle = document.getElementById("progress");

function updateDisplay(time) {
  const totalMilliseconds = time;
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
  document.getElementById("time").innerText = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateCircle(percent) {
  const totalLength = 2 * Math.PI * 90; 
  const offset = totalLength * (1 - percent);
  circle.style.strokeDashoffset = offset;
}

function startStop() {
  if (!running) {
    startTime = Date.now() - (window.elapsedTime || 0);
    timer = setInterval(() => {
      const time = Date.now() - startTime;
      window.elapsedTime = time;
      updateDisplay(time);
      updateCircle((time % 60000) / 60000); 
    }, 10);
    running = true;
  } else {
    clearInterval(timer);
    running = false;
  }
}

function lap() {
  if (!running) return;
  laps.push(window.elapsedTime);
  const lapText = document.createElement("div");
  lapText.innerText = `Lap ${laps.length}: ${document.getElementById("time").innerText}`;
  document.getElementById("laps").appendChild(lapText);
}

function reset() {
  clearInterval(timer);
  running = false;
  window.elapsedTime = 0;
  laps = [];
  document.getElementById("time").innerText = "00:00.00";
  document.getElementById("laps").innerHTML = "";
  updateCircle(0);
}
