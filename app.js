const start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  pause = document.getElementById('pause'),
  allBtns = Array.from(document.querySelectorAll('button')),
  hideMe = Array.from(document.querySelectorAll('.hide-me')),
  pauseIcon = document.getElementById('pause-icon'),
  timers = [{
      minutes: 5,
      seconds: 0,
      totalTime: 0,
      progress: 0,
      display: document.getElementById('int-time'),
      bar: document.getElementById('interval-bar'),
      id: 0
    },
    {
      minutes: 5,
      seconds: 0,
      totalTime: 0,
      progress: 0,
      display: document.getElementById('break-time'),
      bar: document.getElementById('break-bar'),
      id: 1
    }
  ],
  bleep = new Howl({
    src: ['bleep.mp3']
  }),
  toggleHidden = () => hideMe.forEach(x => x.classList.toggle('is-hidden')),
  minTwoDidgets = num => String(num).length < 2 ? num = `0${num}` : num,
  setDisplay = x => x.display.textContent = `${minTwoDidgets(x.minutes)}:${minTwoDidgets(x.seconds)}`

let interval,
  btnRepeat,
  timerSwitch,
  running

document.getElementById('sm').addEventListener('mousedown', () => btnClick(timers[0], minusAction))
document.getElementById('sp').addEventListener('mousedown', () => btnClick(timers[0], plusAction))
document.getElementById('bm').addEventListener('mousedown', () => btnClick(timers[1], minusAction))
document.getElementById('bp').addEventListener('mousedown', () => btnClick(timers[1], plusAction))
allBtns.forEach(x => x.addEventListener('mouseout', () => clearInterval(btnRepeat)))
allBtns.forEach(x => x.addEventListener('mouseup', () => clearInterval(btnRepeat)))
stop.addEventListener('click', () => {
  clearInterval(interval)
  reset.call(timers[0])
  reset.call(timers[1])
  toggleHidden()
})
pause.addEventListener('click', () => {
  if (running) {
    clearInterval(interval)
    running = false
    togglePause('play', 'is-info', 'is-success')
  } else {
    timer.call(timers[timerSwitch])
    togglePause('pause', 'is-success', 'is-info')
  }
})
start.addEventListener('click', () => {
  reset.call(timers[0])
  reset.call(timers[1])
  timer.call(timers[0])
  toggleHidden()
  togglePause('pause', 'is-success', 'is-info')
})

function togglePause(fa, remove, add) {
  pauseIcon.innerHTML = `<i class="fas fa-${fa}"></i>`
  pause.classList.remove(`${remove}`)
  pause.classList.add(`${add}`)
}

function btnClick(timer, callback) {
  callback(timer)
  btnRepeat = setInterval(() => {
    callback(timer)
  }, 100)
}

function minusAction(x) {
  if (x.minutes > 1) {
    x.minutes--
  } else if (x.seconds === 0) {
    x.minutes = 0
    x.seconds = 59
  } else {
    x.seconds > 1 ? x.seconds-- : false
  }
  setDisplay(x)
}

function plusAction(x) {
  if (x.seconds < 59 && x.seconds !== 0) {
    x.seconds++
  } else {
    x.minutes++
    x.seconds = 0
  }
  setDisplay(x)
}

function timer() {
  timerSwitch = this.id
  running = true
  interval = setInterval(() => {
    this.display.textContent = `${convertMs(this.totalTime)}`
    this.totalTime--
    this.progress++
     this.bar.value = this.progress
    if (this.totalTime === 100) {
      bleep.play()
    } else if (this.totalTime < 0) {
      clearInterval(interval)
      this.bar.max = 1
      this.bar.value = 1
      reset.call(this)
      this.id === 0 ? timer.call(timers[1]) : timer.call(timers[0])
    }
  }, 10)
}

function reset() {
  this.progress = 0
  this.bar.value = 0
  this.totalTime = this.minutes * 60 * 100 + this.seconds * 100
  this.bar.max = this.totalTime - 100
  setDisplay(this)
}

function convertMs(ms) {
  let min = Math.floor((ms / 100 / 60)),
    sec = Math.floor((ms / 100) % 60)
  return `${minTwoDidgets(min)}:${minTwoDidgets(sec)}`
}