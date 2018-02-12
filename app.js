const start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  pause = document.getElementById('pause'),
  allBtns = Array.from(document.querySelectorAll('button')),
  hideMe = Array.from(document.querySelectorAll('.hide-me')),
  pauseIcon = document.getElementById('pause-icon'),
  timers = [{
      minutes: 5,
      seconds: 0,
      minCounter: 5,
      secCounter: 0,
      totalTime: 0,
      progress: 0,
      display: document.getElementById('int-time'),
      bar: document.getElementById('interval-bar'),
      id: 0
    },
    {
      minutes: 5,
      seconds: 0,
      minCounter: 5,
      secCounter: 0,
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
  minTwoDidgets = num => String(num).length < 2 ? x = `0${num}` : num,
  setDisplay = x => x.display.textContent = `${minTwoDidgets(x.minutes)}:${minTwoDidgets(x.seconds)}`

let interval,
  btnRepeat,
  timerSwitch,
  running

document.getElementById('sm').addEventListener('mousedown', () => minus(timers[0]))
document.getElementById('sp').addEventListener('mousedown', () => plus(timers[0]))
document.getElementById('bm').addEventListener('mousedown', () => minus(timers[1]))
document.getElementById('bp').addEventListener('mousedown', () => plus(timers[1]))
stop.addEventListener('click', stopAll)
pause.addEventListener('click', pauseAll)

start.addEventListener('click', () => {
  timers.forEach(x => {
    x.minCounter = x.minutes
    x.secCounter = x.seconds
    x.progress = 0
    x.totalTime = 0
    x.bar.value = 0
    x.totalTime = x.minCounter * 60 + x.secCounter
    x.bar.max = x.totalTime
    setDisplay(x)
  })
  timer.call(timers[0])
  toggleHidden()
  pauseIcon.innerHTML = '<i class="fas fa-pause"></i>'
  pause.classList.remove('is-success')
  pause.classList.add('is-info')  
})

allBtns.forEach(x => x.addEventListener('mouseout', () => clearInterval(btnRepeat)))
allBtns.forEach(x => x.addEventListener('mouseup', () => clearInterval(btnRepeat)))

function pauseAll() {
  if (running) {
    clearInterval(interval)
    running = false
    pauseIcon.innerHTML = '<i class="fas fa-play"></i>'
    pause.classList.remove('is-info')
    pause.classList.add('is-success')
  } else {
    timer.call(timers[timerSwitch])
    pauseIcon.innerHTML = '<i class="fas fa-pause"></i>'
    pause.classList.remove('is-success')
    pause.classList.add('is-info')
  }
}

function stopAll() {
  clearInterval(interval)
  timers.forEach(x => {
    x.minCounter = x.minutes
    x.secCounter = x.seconds
    x.progress = 0
    x.totalTime = 0
    x.bar.value = 0
    x.totalTime = x.minCounter * 60 + x.secCounter
    x.bar.max = x.totalTime
    setDisplay(x)
  })
  toggleHidden()
}

//minus button stuff to do
function minus(x) {
  minusAction(x)
  btnRepeat = setInterval(() => {
    minusAction(x)
  }, 100)
}

function minusAction(x) {
  if (x.minutes > 1) {
    x.minutes--
  } else if (x.seconds === 0) {
    x.minutes = 0
    x.seconds = 59
  } else {
    x.seconds--
  }
  setDisplay(x)
}

//plus button stuff to do
function plus(x) {
  plusAction(x)
  btnRepeat = setInterval(() => {
    plusAction(x)
  }, 100)
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
    this.display.textContent = `${minTwoDidgets(this.minCounter)}:${minTwoDidgets(this.secCounter)}`
    this.bar.value = this.progress
    this.progress++
      this.totalTime--
      this.secCounter--
      this.secCounter < 0 ? (this.secCounter = 59, this.minCounter--) : false
    if (this.totalTime < 0) {
      clearInterval(interval)
      bleep.play()
      callTimer(this.id)
    }
  }, 1000)
}

function callTimer(x) {
  timers.forEach(e => {
    e.minCounter = e.minutes
    e.secCounter = e.seconds
    e.progress = 0
    e.bar.value = 0
    e.totalTime = e.minCounter * 60 + e.secCounter
    e.bar.max = e.totalTime
    setDisplay(e)
  })
  x === 0 ? timer.call(timers[1]) : timer.call(timers[0])
}