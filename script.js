let workTime = 25 * 60;  // 25 minutes
let breakTime = 5 * 60;  // 5 minutes
let timeLeft = workTime;
let isRunning = false;
let isWorkSession = true;
let timer;

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const label = document.getElementById("session-label");

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  minutes.textContent = String(mins).padStart(2, "0");
  seconds.textContent = String(secs).padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      isWorkSession = !isWorkSession;
      timeLeft = isWorkSession ? workTime : breakTime;
      label.textContent = isWorkSession ? "Work Session" : "Break Time ☕";
      alert(isWorkSession ? "Back to work!" : "Break time! 🎉");
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkSession = true;
  timeLeft = workTime;
  label.textContent = "Work Session";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
