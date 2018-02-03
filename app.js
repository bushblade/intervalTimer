const intervalBar = document.getElementById('interval-bar'),
  intTime = document.getElementById('int-time'),
  sm = document.getElementById('sm'),
  sp = document.getElementById('sp'),
  bm = document.getElementById('bm'),
  bp = document.getElementById('bp'),
  start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  allBtns = Array.from(document.querySelectorAll('button'));

let intMinutes = 5,
  intSeconds = 0,
  interval;

sm.addEventListener('click', intImeMinus);
sp.addEventListener('click', intTimePlus);

start.addEventListener('click', function () {
  timer(intMinutes, intTime, intervalBar);
  toggleBtns();
});

stop.addEventListener('click', function () {
  clearInterval(interval);
  intTime.textContent = `${minTwoDidgets(intMinutes)}:${minTwoDidgets(intSeconds)}`;
  intervalBar.value = 0;
  toggleBtns();
});

function toggleBtns() {
  allBtns.forEach(x => x.classList.toggle('is-hidden'));
}

function intImeMinus() {
  intMinutes--;
  intTime.textContent = `${minTwoDidgets(intMinutes)}:${minTwoDidgets(intSeconds)}`;
}

function intTimePlus() {
  intMinutes++;
  intTime.textContent = `${minTwoDidgets(intMinutes)}:${minTwoDidgets(intSeconds)}`;
}


function timer(minutes, timer, bar) {
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
    totalTime < 0 ? clearInterval(interval) : false;
  }, 1000);
}

function minTwoDidgets(num) {
  let x = String(num);
  x.length < 2 ? x = `0${num}` : false;
  return x;
}