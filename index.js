const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  timerBox: document.querySelector('.js-clockface'),
  clearBtn: document.querySelector('button[data-action-clear]'),
};
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.unit();
  }
  unit() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  clear() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }
}

const timer = new Timer({
  onTick: updateTimerBox,
});

refs.startBtn.addEventListener('click', () => {
  timer.start();
});
refs.stopBtn.addEventListener('click', () => {
  timer.stop();
});
refs.clearBtn.addEventListener('click', () => {
  timer.clear();
});

function updateTimerBox({ hours, mins, secs }) {
  refs.timerBox.textContent = `${hours}:${mins}:${secs}`;
}

// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = getTimeComponents(deltaTime);
//       updateTimerBox(time);
//     }, 1000);
//   },
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   },
// };
