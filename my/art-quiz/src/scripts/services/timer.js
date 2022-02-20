class Timer {
  constructor() {
    this.timeCounter = 0;
    this.min = 0;
    this.timeSet = 10;
    this.timeOut = true;
  }

  addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  startTimer(callback, count, container) {
    const cont = container;
    clearTimeout(this.timeOut);
    this.timeCounter = 0;
    const timer = () => {
      if (this.timeCounter === count) {
        clearTimeout(this.timeOut);
        callback();
        return;
      }
      this.timeCounter += 1;
      if (this.timeCounter % 60 === 0) {
        this.min += 1;
        this.timeCounter = 0;
      }
      cont.innerHTML = `${this.addZero(this.min)}:${this.addZero(this.timeCounter)}`;
      this.timeOut = setTimeout(timer, 1000);
    };
    timer();
  }

  finishTimer() {
    clearTimeout(this.timeOut);
  }

  setTimerDuration(value) {
    this.timeSet = Number(value);
    return this.timeSet;
  }

  getTimeSet() {
    return this.timeSet;
  }

  getTimerDuration(container, text) {
    const textContainer = text;
    if (this.timeSet > 0) {
      container.setAttribute('checked', true);
    } else {
      container.setAttribute('checked', false);
    }
    textContainer.innerHTML = container.value;
  }
}

export default new Timer();
