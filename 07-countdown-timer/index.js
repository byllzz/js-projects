"use strict";

const countdownTimer = {
  ui: null,
  timerId: null,
  init: function () {
  const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.innerHTML = `
      <h1>Countdown Timer</h1>
      <label for="date-input">Enter your Date(time)</label>
      <input type="datetime-local" id="date-input" />
      <div id="left-time">Please add your date & time!</div>
    `;
    document.body.appendChild(wrapper);

    this.ui = {
      input: wrapper.querySelector("#date-input"),
      span: wrapper.querySelector("#left-time")
    };

    this.bindEvents();
  },

  startCountdown: function () {
    if (this.timerId) clearInterval(this.timerId);
    const userDate = new Date(this.ui.input.value).getTime();
    if (isNaN(userDate)) return;

    this.timerId = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = userDate - currentDate;

      if (distance <= 0) {
        clearInterval(this.timerId);
        this.ui.span.innerHTML = "Expired!!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.ui.span.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
      this.ui.span.style.fontSize = "58px"
    }, 1000);
  },

  bindEvents: function () {
    this.ui.input.addEventListener("change", () => {
      this.startCountdown();
    });
  }
};

countdownTimer.init();
