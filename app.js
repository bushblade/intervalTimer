const bleep = new Howl({
  src: ['bleep.mp3']
});

const start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  allBtns = Array.from(document.querySelectorAll('button'));

const timers = [{
    minutes: 5,
    seconds: 0,
    display: document.getElementById('int-time'),
    bar: document.getElementById('interval-bar'),
    id: 0
  },
  {
    minutes: 5,
    seconds: 0,
    display: document.getElementById('break-time'),
    bar: document.getElementById('break-bar'),
    id: 1
  }
]

let interval,
  btnRepeat;

sm.addEventListener('mousedown', () => minus(timers[0]));
sp.addEventListener('mousedown', () => plus(timers[0]));
bm.addEventListener('mousedown', () => minus(timers[1]));
bp.addEventListener('mousedown', () => plus(timers[1]));

start.addEventListener('click', () => {
  timer.bind(timers[0])();
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

//minus button stuff to do
function minus(x) {
  minusAction(x);
  btnRepeat = setInterval(() => {
    minusAction(x);
  }, 100);
}

function minusAction(x) {
  if (x.minutes > 1) {
    x.minutes--;
  } else if (x.seconds === 0) {
    x.minutes = 0;
    x.seconds = 59;
  } else {
    x.seconds--;
  }
  setDisplay(x);
}

//plus button stuff to do
function plus(x) {
  plusAction(x);
  btnRepeat = setInterval(() => {
    plusAction(x);
  }, 100);
}

function plusAction(x) {
  if (x.seconds < 59 && x.seconds !== 0) {
    x.seconds++;
  } else {
    x.minutes++;
    x.seconds = 0;
  }
  setDisplay(x);
}

//timer function
function timer() {
  let minuteCount = this.minutes,
    secondsCount = this.seconds,
    totalTime = this.minutes * 60 + this.seconds,
    progress = 0;
  this.bar.max = totalTime;
  interval = setInterval(() => {
    this.display.textContent = `${minTwoDidgets(minuteCount)}:${minTwoDidgets(secondsCount)}`;
    this.bar.value = progress;
    progress++;
    totalTime--;
    secondsCount--;
    secondsCount < 0 ? (secondsCount = 59, minuteCount--) : false;
    if (totalTime < 0) {
      clearInterval(interval);
      bleep.play();
      callTimer(this.id)
    }
  }, 1000);
}

function callTimer(x) {
  x === 0 ? timer.bind(timers[1])() : timer.bind(timers[0])();
}

function toggleBtns() {
  allBtns.forEach(x => x.classList.toggle('is-hidden'));
}

function minTwoDidgets(num) {
  let x = String(num);
  x.length < 2 ? x = `0${num}` : false;
  return x;
}