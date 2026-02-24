"use strict";

const digital_clock = {
  // wrapper styles
  wrapper: {
    width: 100,
    maxWidth: 600,
    height: 'auto',
    marginInline: 'auto',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    position: 'absolute',
    justifyContent: "center"
  },
  renderWrapper: function () {

    if (document.getElementById('clock-wrapper')) return document.getElementById('clock-wrapper');

    const wrapper = document.createElement('div');
    wrapper.id = 'clock-wrapper';
    wrapper.style.width = `${this.wrapper.width}%`;
    wrapper.style.maxWidth = `${this.wrapper.maxWidth}px`;
    wrapper.style.height = `${this.wrapper.height}`;
    wrapper.style.marginInline = `${this.wrapper.marginInline}`;
    wrapper.style.display = `${this.wrapper.display}`;
    wrapper.style.flexDirection = `${this.wrapper.flexDirection}`;
    wrapper.style.alignItems = `${this.wrapper.alignItems}`;
    wrapper.style.justifyContent = `${this.wrapper.justifyContent}`;
    wrapper.style.textAlign = "center";
    wrapper.style.gap = `${this.wrapper.gap}px`;
    wrapper.style.position = `${this.wrapper.position}`;
    wrapper.style.left = '50%';
    wrapper.style.top = '50%';
    wrapper.style.transform = 'translate(-50% , -50%)';
    wrapper.style.fontFamily = 'sans-serif';

    wrapper.innerHTML = `
      <h1 style="text-transform: capitalize; font-weight:900; margin:0">Digital Clock</h1>
      <div style="display:flex; align-items:center; gap:10px; font-size:60px; font-weight:bold;">
        <span id="hrs">00</span>
        <span>:</span>
        <span id="mints">00</span>
        <span>:</span>
        <span id="secs">00</span>
        <span id="format" style="font-size: 30px; margin-left: 10px"></span>
      </div>
    `;
    document.body.appendChild(wrapper);
    return wrapper;
  },

  getElements: function () {
    const wrapper = this.renderWrapper();
    return {
      hrs: wrapper.querySelector("#hrs"),
      mints: wrapper.querySelector("#mints"),
      secs: wrapper.querySelector("#secs"),
      format: wrapper.querySelector("#format")
    };
  },

  updateTime: function (elements) {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';

    h = h % 12;
    h = h ? h : 12;

    elements.hrs.textContent = String(h).padStart(2, '0');
    elements.mints.textContent = String(m).padStart(2, '0');
    elements.secs.textContent = String(s).padStart(2, '0');
    elements.format.textContent = ampm;
  },

  init: function () {
    const elements = this.getElements();
    this.updateTime(elements);
    setInterval(() => this.updateTime(elements), 1000);
  }
};

digital_clock.init();
