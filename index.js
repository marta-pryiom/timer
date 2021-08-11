class StopWatch {
  constructor() {
    this.refs = {
      startBtn: document.querySelector('button[data-action-start]'),
      stopBtn: document.querySelector('button[data-action-stop]'),
      timerBox: document.querySelector('.js-clockface'),
      clearBtn: document.querySelector('button[data-action-clear]'),
    };
    this.intervalId = null;
    this.startTime = null;

    this.onStartWatchClick = this.onStartWatchClick.bind(this);
    this.onStoptWatchClick = this.onStoptWatchClick.bind(this);
  }
  calc() {
    const DateNow = Date.now();
    const delta = DateNow - this.startTime;
    const hours = this.pad(
      Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((delta % (1000 * 60)) / 1000));

    this.refs.timerBox.textContent = `${hours}:${mins}:${secs}`;
  }
  onStartWatchClick() {
    this.startTime = Date.now();
    this.intervalId = setInterval(this.calc.bind(this), 1000);
  }
  onStoptWatchClick() {
    clearInterval(this.intervalId);
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  unit() {
    this.refs.startBtn.addEventListener('click', this.onStartWatchClick);
    this.refs.stopBtn.addEventListener('click', this.onStoptWatchClick);
    // this.refs.clearBtn.addEventListener('click', onClearWatchClick);
  }
}
const watch = new StopWatch();
watch.unit();

// let intervalId = null;
// let startTime = null;

// function calc() {
//   const DateNow = Date.now();
//   const delta = DateNow - startTime;
//   const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const mins = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
//   const secs = Math.floor((delta % (1000 * 60)) / 1000);
//   const newHours = hours < 10 ? `0${hours}` : hours;
//   const newMins = mins < 10 ? `0${mins}` : mins;
//   const newSEcs = secs < 10 ? `0${secs}` : secs;
//   refs.timerBox.textContent = `${newHours}:${newMins}:${newSEcs}`;
// }

// function onStartWatchClick() {
//   startTime = Date.now();
//   intervalId = setInterval(calc, 1000);
// }
// function onStoptWatchClick() {
//   clearInterval(intervalId);
// }
// function onClearWatchClick() {}
// onStartWatchClick();
// onStoptWatchClick();

//інший варіант
// class Timer {
//   constructor({ onTick }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;
//     this.unit();
//   }
//   unit() {
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = this.getTimeComponents(deltaTime);
//       this.onTick(time);
//     }, 1000);
//   }
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   }
//   getTimeComponents(time) {
//     const hours = this.pad(
//       Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//     );
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
//     return { hours, mins, secs };
//   }
//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
//   clear() {
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }
// }

// const timer = new Timer({
//   onTick: updateTimerBox,
// });

// refs.startBtn.addEventListener('click', () => {
//   timer.start();
// });
// refs.stopBtn.addEventListener('click', () => {
//   timer.stop();
// });
// refs.clearBtn.addEventListener('click', () => {
//   timer.clear();
// });

// function updateTimerBox({ hours, mins, secs }) {
//   refs.timerBox.textContent = `${hours}:${mins}:${secs}`;
// }

//без класу
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
