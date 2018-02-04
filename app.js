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
  timerCount = 2;

sm.addEventListener('click', () => minus(timers[0]));
sp.addEventListener('click', () => plus(timers[0]));
bm.addEventListener('click', () => minus(timers[1]));
bp.addEventListener('click', () => plus(timers[1]));
start.addEventListener('click', function () {
  timer(timers[0]);
  toggleBtns();
});
stop.addEventListener('click', stopAll)

function stopAll() {
  clearInterval(interval);
  timers.forEach(x => {
    x.display.textContent = `${minTwoDidgets(x.minutes)}:${minTwoDidgets(x.seconds)}`;
    x.bar.value = 0;
  });
  toggleBtns();
  timerCount = 2;
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