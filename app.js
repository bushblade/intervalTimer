const intervalBar = document.getElementById('interval-bar'),
  breakBar = document.getElementById('break-bar'),
  intTime = document.getElementById('int-time'),
  breakTime = document.getElementById('break-time'),
  sm = document.getElementById('sm'),
  sp = document.getElementById('sp'),
  bm = document.getElementById('bm'),
  bp = document.getElementById('bp'),
  start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  allBtns = Array.from(document.querySelectorAll('button'));

let intMinutes = 5,
  intSeconds = 0,
  breakMinutes = 1,
  breakSeconds = 0,
  timerCount = 2;

let interval1;
let interval2;

sm.addEventListener('click', intImeMinus);
sp.addEventListener('click', intTimePlus);
bm.addEventListener('click', breakMinus);
bp.addEventListener('click', breakPlus);

start.addEventListener('click', function () {
  timer(intMinutes, intTime, intervalBar, interval1);
  toggleBtns();
});

stop.addEventListener('click', stopAll)

function stopAll() {
  stopInterval();
  intTime.textContent = `${minTwoDidgets(intMinutes)}:${minTwoDidgets(intSeconds)}`;
  breakTime.textContent = `${minTwoDidgets(breakMinutes)}:${minTwoDidgets(breakSeconds)}`;
  intervalBar.value = 0;
  breakBar.value = 0;
  toggleBtns();
  timerCount = 2;
}

function stopInterval() {
  clearInterval(1);
  clearInterval(2);
}

function toggleBtns() {
  allBtns.forEach(x => x.classList.toggle('is-hidden'));
}

//interval timings
function intImeMinus() {
  if (intMinutes !== 1) {
    intMinutes--;
    intTime.textContent = `${minTwoDidgets(intMinutes)}:${minTwoDidgets(intSeconds)}`;
  }
}

function intTimePlus() {
  intMinutes++;
  intTime.textContent = `${minTwoDidgets(intMinutes)}:${minTwoDidgets(intSeconds)}`;
}

//break timings
function breakMinus() {
  if (breakMinutes !== 1) {
    breakMinutes--;
    breakTime.textContent = `${minTwoDidgets(breakMinutes)}:${minTwoDidgets(breakSeconds)}`;
  }
}

function breakPlus() {
  breakMinutes++;
  breakTime.textContent = `${minTwoDidgets(breakMinutes)}:${minTwoDidgets(breakSeconds)}`;
}

function timer(minutes, timer, bar, interval) {
  let minuteCount = minutes,
    secondsCount = 0,
    totalTime = minutes * 60,
    progress = 0;
  bar.max = totalTime;
  interval = setInterval(() => {
    timer.textContent = `${minTwoDidgets(minuteCount)}:${minTwoDidgets(secondsCount)}`;
    bar.value = progress;
    progress++;
    totalTime--;
    secondsCount--;
    secondsCount < 0 ? (secondsCount = 59, minuteCount--) : false;
    if (totalTime < 0) {
      stopInterval();
      callTimer()
    }
  }, 1000);
}

function minTwoDidgets(num) {
  let x = String(num);
  x.length < 2 ? x = `0${num}` : false;
  return x;
}


function callTimer() {
  if (timerCount % 2 === 0) {
    timer(breakMinutes, breakTime, breakBar, interval2);
  } else {
    timer(intMinutes, intTime, intervalBar, interval1);
  }
  timerCount++;
}