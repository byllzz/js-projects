
function createUI() {
    const wrapper = document.createElement("div");
    wrapper.className = 'wrapper';

    const title = document.createElement("h1");
    title.textContent = "Secure Password Gen";

    const pwBox = document.createElement("div");
    pwBox.className = "pw-box";
    pwBox.innerHTML = `
        <small>Generated Password</small>
        <div class="pw-display">Click generate to start</div>
    `;

    const controls = document.createElement("div");
    controls.className = "controls";

    const label = document.createElement("label");
    label.textContent = 'Length: ';

    const rangeValue = document.createElement("strong");
    rangeValue.textContent = "12";

    const inputLength = document.createElement("input");
    inputLength.type = "range";
    inputLength.min = 6;
    inputLength.max = 32;
    inputLength.value = 12;
    inputLength.className = 'range';

    label.appendChild(rangeValue);
    controls.append(label, inputLength);

    const buttonGen = document.createElement("button");
    buttonGen.textContent = "Generate Password";
    buttonGen.className = 'gen-btn';

    wrapper.append(title, pwBox, controls, buttonGen);
    document.body.appendChild(wrapper);

    addStyles();

    return {
        pwDisplay: pwBox.querySelector(".pw-display"),
        genBtn: buttonGen,
        range: inputLength,
        strong: rangeValue
    };
}

function generatePassword(length = 16) {
    const charset = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        num: '0123456789',
        sym: '!@#$%^&*()_+~'
    };

    const charPool = charset.lower + charset.upper + charset.num + charset.sym;
    let password = '';

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += charPool[array[i] % charPool.length];
    }

    return password;
}


const ui = createUI();

ui.range.addEventListener("input", () => {
    ui.strong.textContent = ui.range.value;
});

ui.genBtn.addEventListener("click", () => {
    const pass = generatePassword(parseInt(ui.range.value));
    ui.pwDisplay.textContent = pass;
    ui.pwDisplay.style.color = "#2ecc71";
    setTimeout(() => ui.pwDisplay.style.color = "#333", 200);
});

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; margin: 0; }
        .wrapper { background: white; padding: 2rem; border-radius: 12px; shadow: 0 4px 15px rgba(0,0,0,0.1); width: 350px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .pw-box { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border: 1px solid #ddd; word-break: break-all; }
        .pw-display { font-family: monospace; font-size: 1.2rem; font-weight: bold; margin-top: 0.5rem; color: #333; }
        .controls { margin: 1.5rem 0; text-align: left; }
        .range { width: 100%; cursor: pointer; margin-top: 0.5rem; }
        .gen-btn { width: 100%; padding: 0.8rem; border: none; background: #007bff; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        .gen-btn:hover { background: #0056b3; }
        small { color: #666; text-transform: uppercase; letter-spacing: 1px; font-size: 0.7rem; }
    `;
    document.head.appendChild(style);
}
