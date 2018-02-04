const start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  allBtns = Array.from(document.querySelectorAll('button'));

const timers = [{
    minutes: 5,
    seconds: 0,
    display: document.getElementById('int-time'),
    bar: document.getElementById('interval-bar')
  },
  {
    minutes: 5,
    seconds: 0,
    display: document.getElementById('break-time'),
    bar: document.getElementById('break-bar')
  }
]

let interval,
  timerCount = 2,
  btnRepeat;

sm.addEventListener('mousedown', () => minus(timers[0]));
sp.addEventListener('mousedown', () => plus(timers[0]));
bm.addEventListener('mousedown', () => minus(timers[1]));
bp.addEventListener('mousedown', () => plus(timers[1]));

start.addEventListener('click', () => {
  timer(timers[0]);
  toggleBtns();
});
stop.addEventListener('click', stopAll)

allBtns.forEach(x => x.addEventListener('mouseout', () => clearInterval(btnRepeat)));
allBtns.forEach(x => x.addEventListener('mouseup', () => clearInterval(btnRepeat)));

function stopAll() {
  clearInterval(interval);
  timers.forEach(x => {
    setDisplay(x);
    x.bar.value = 0;
  });
  toggleBtns();
  timerCount = 2;
}

function setDisplay(x) {
  x.display.textContent = `${minTwoDidgets(x.minutes)}:${minTwoDidgets(x.seconds)}`;
}

function minus(x) {
  btnRepeat = setInterval(() => {
    if (x.minutes > 1) {
      x.minutes--;
    } else if (x.seconds === 0) {
      x.minutes = 0;
      x.seconds = 59;
    } else {
      x.seconds--;
    }
    setDisplay(x);
  }, 150);
}

function plus(x) {
  btnRepeat = setInterval(() => {
    x.seconds = 0;
    x.minutes++;
    setDisplay(x);
  }, 150);
}

//timer function
function timer(x) {
  let minuteCount = x.minutes,
    secondsCount = x.seconds,
    totalTime = x.minutes * 60 + x.seconds,
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
    timer(timers[1]);
    timerCount++;
  } else {
    timer(timers[0]);
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