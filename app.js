const start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  allBtns = Array.from(document.querySelectorAll('button'));

const sessionTimer = {
  minutes: 5,
  seconds: 0,
  display: document.getElementById('int-time'),
  bar: document.getElementById('interval-bar')
}

const breakTimer = {
  minutes: 5,
  seconds: 0,
  display: document.getElementById('break-time'),
  bar: document.getElementById('break-bar')
}

let interval,
  timerCount = 2;

sm.addEventListener('click', () => minus(sessionTimer));
sp.addEventListener('click', () => plus(sessionTimer));
bm.addEventListener('click', () => minus(breakTimer));
bp.addEventListener('click', () => plus(breakTimer));
start.addEventListener('click', function () {
  timer(sessionTimer);
  toggleBtns();
});
stop.addEventListener('click', stopAll)

function stopAll() {
  stopInterval();
  clearInterval(interval);
  clearInterval(1);
  sessionTimer.display.textContent = `${minTwoDidgets(sessionTimer.minutes)}:${minTwoDidgets(sessionTimer.seconds)}`;
  breakTimer.display.textContent = `${minTwoDidgets(breakTimer.minutes)}:${minTwoDidgets(breakTimer.seconds)}`;
  sessionTimer.bar.value = 0;
  breakTimer.bar.value = 0;
  toggleBtns();
  timerCount = 2;
}

//a dirty desperate hack that needs solving!
function stopInterval() {
  for (let i = 0; i < 100; i++)
    clearInterval(i);
}

function minus(x) {
  if (x.minutes !== 1) {
    x.minutes--;
    x.display.textContent = `${minTwoDidgets(x.minutes)}:${minTwoDidgets(x.seconds)}`;
  }
}

function plus(x) {
  x.minutes++;
  x.display.textContent = `${minTwoDidgets(x.minutes)}:${minTwoDidgets(x.seconds)}`;
}

//timer function
function timer(x) {
  let minuteCount = x.minutes,
    secondsCount = 0,
    totalTime = x.minutes * 60,
    progress = 0;
  x.bar.max = totalTime;
  interval = setInterval(() => {
    x.display.textContent = `${minTwoDidgets(minuteCount)}:${minTwoDidgets(secondsCount)}`;
    x.bar.value = progress;
    progress++;
    totalTime--;
    secondsCount--;
    secondsCount < 0 ? (secondsCount = 59, minuteCount--) : false;
    if (totalTime < 0) {
      clearInterval(interval);
      callTimer()
    }
  }, 1000);
}

function callTimer() {
  if (timerCount % 2 === 0) {
    timer(breakTimer);
    timerCount++;
  } else {
    timer(sessionTimer);
    timerCount--;
  }
}

function toggleBtns() {
  allBtns.forEach(x => x.classList.toggle('is-hidden'));
}

function minTwoDidgets(num) {
  let x = String(num);
  x.length < 2 ? x = `0${num}` : false;
  return x;
}