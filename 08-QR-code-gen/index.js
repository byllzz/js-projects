const qrCodeGenerator = {
  ui: null,
  init: function () {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.innerHTML = `
    <h1>Text to QR Code Generator</h1>
    <input type="text" id="inputText" placeholder="enter your text" />
    <button id="genBtn">Generate QRCode</button>
    <div id="qrCode"></div>
    `;

    document.body.appendChild(wrapper);
    this.ui = {
      input: wrapper.querySelector('#inputText'),
      btn: wrapper.querySelector('#genBtn'),
      qrCodeDiv: wrapper.querySelector('#qrCode'),
    };
    this.generateQRCode();
  },
  generate: function () {
    const inputText = this.ui.input?.value;
    if(!inputText){
      alert("Please Enter some text to convert!");
      return;
    }

    this.ui.qrCodeDiv.innerHTML = "";

    return new QRCode(this.ui.qrCodeDiv, {
      text: inputText,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  generateQRCode : function () {
  const genBtn = this.ui.btn;
   genBtn.addEventListener('click', () => {
    this.generate();
    this.ui.input.value = "";
   });
  }
};

qrCodeGenerator.init()
