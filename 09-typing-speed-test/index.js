const speed_test = {
  ui: null,
  vars: {
    time_left: 60,
    time_passed: 0,
    total_errors: 0,
    errors: 0,
    accuracy: 0,
    typed: 0,
    timer: null,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },

  init: function () {
    const wrapper = document.createElement("div");
    wrapper.className = 'wrapper';
    wrapper.innerHTML = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; text-align: center;">
        <div style="display: flex; justify-content: space-around; margin-bottom: 20px; font-weight: bold;">
          <div>WPM: <span class="wpm">0</span></div>
          <div>Time: <span class="time">60s</span></div>
          <div>Errors: <span class="errors">0</span></div>
          <div>Accuracy: <span class="accuracy">100</span>%</div>
        </div>
        <p class="para" style="font-size: 1.2rem; letter-spacing: 1px; margin-bottom: 20px; min-height: 3em;"></p>
        <textarea class="input" placeholder="Click start to begin..."  disabled style="width: 100%; height: 100px; padding: 10px;"></textarea>
        <br>
        <button class="start" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">Start Test</button>
      </div>
    `;

    document.body.appendChild(wrapper);
    this.ui = {
      time: wrapper.querySelector('.time'),
      accuracy: wrapper.querySelector('.accuracy'),
      wpm: wrapper.querySelector('.wpm'),
      errors: wrapper.querySelector('.errors'),
      input: wrapper.querySelector('.input'),
      btnStart: wrapper.querySelector('.start'),
      para: wrapper.querySelector(".para")
    };

    this.ui.btnStart.addEventListener('click', () => this.startTest());
    this.ui.input.addEventListener('input', () => this.processText());
    this.renderPara();
  },

  renderPara: function () {
    this.ui.para.innerHTML = '';
    this.vars.quote.split('').forEach(char => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      this.ui.para.appendChild(charSpan);
    });
  },

  startTest: function () {
    this.resetValues();
    this.ui.input.disabled = false;
    this.ui.input.focus();
    this.ui.btnStart.disabled = true;

    this.vars.timer = setInterval(() => {
      if (this.vars.time_left > 0) {
        this.vars.time_left--;
        this.vars.time_passed++;
        this.ui.time.textContent = this.vars.time_left + "s";
        this.updateWPM();
      } else {
        this.finishTest();
      }
    }, 1000);
  },

  processText: function () {
    let curr_input = this.ui.input.value;
    let curr_input_array = curr_input.split('');
    this.vars.typed = curr_input_array.length;
    this.vars.errors = 0;

    let quoteSpanArray = this.ui.para.querySelectorAll('span');

    quoteSpanArray.forEach((charSpan, index) => {
      let typedChar = curr_input_array[index];

      if (typedChar == null) {
        charSpan.style.color = "black";
        charSpan.style.backgroundColor = "transparent";
      } else if (typedChar === charSpan.innerText) {
        charSpan.style.color = "green";
        charSpan.style.backgroundColor = "transparent";
      } else {
        charSpan.style.color = "red";
        this.vars.errors++;
      }
    });

    this.ui.errors.textContent = this.vars.total_errors + this.vars.errors;
    this.calculateAccuracy();
  },

  calculateAccuracy: function () {
    if (this.vars.typed > 0) {
      let correctChars = (this.vars.typed - this.vars.errors);
      let accuracy = (correctChars / this.vars.typed) * 100;
      this.ui.accuracy.textContent = Math.round(accuracy);
    }
  },

  updateWPM: function () {
    let wpm = Math.round(((this.vars.typed / 5) / this.vars.passed_time) * 60);
    let currentWpm = Math.round((this.vars.typed / 5) / (this.vars.time_passed / 60));
    this.ui.wpm.textContent = isFinite(currentWpm) ? currentWpm : 0;
  },

  resetValues: function () {
    clearInterval(this.vars.timer);
    this.vars.time_left = 60;
    this.vars.time_passed = 0;
    this.vars.errors = 0;
    this.vars.typed = 0;
    this.ui.input.value = "";
    this.ui.time.textContent = "60s";
    this.ui.wpm.textContent = "0";
    this.ui.errors.textContent = "0";
    this.ui.accuracy.textContent = "100";
    this.renderPara();
  },

  finishTest: function () {
    clearInterval(this.vars.timer);
    this.ui.input.disabled = true;
    this.ui.btnStart.disabled = false;
    this.ui.btnStart.textContent = "Restart";
    alert("Test Finished! Your WPM: " + this.ui.wpm.textContent);
  }
};

speed_test.init();
