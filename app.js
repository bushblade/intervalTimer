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
      bleep.play();
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