let display = document.getElementById('result');
let historyList = document.getElementById('history-list');
let currentInput = '';
let themes = ['theme-dark', 'theme-light', 'theme-neon', 'theme-sunset', 'theme-metal'];
let currentTheme = 0;
let clickSound = document.getElementById('click-sound');

function addToDisplay(value) {
    currentInput += value;
    updateDisplay();
    playSound();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
    playSound();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
    playSound();
}

function calculate() {
    try {
        let result = eval(currentInput);
        addToHistory(currentInput + ' = ' + result);
        currentInput = result.toString();
        updateDisplay();
        playSound();
    } catch {
        display.innerText = 'Error';
        currentInput = '';
    }
}

function power() {
    currentInput += '**';
    updateDisplay();
    playSound();
}

function sqrt() {
    try {
        let result = Math.sqrt(eval(currentInput));
        addToHistory('√(' + currentInput + ') = ' + result);
        currentInput = result.toString();
        updateDisplay();
        playSound();
    } catch {
        display.innerText = 'Error';
    }
}

function percent() {
    try {
        let result = eval(currentInput) / 100;
        addToHistory(currentInput + '% = ' + result);
        currentInput = result.toString();
        updateDisplay();
        playSound();
    } catch {
        display.innerText = 'Error';
    }
}

function updateDisplay() {
    display.innerText = currentInput || '0';
    let fontSize = currentInput.length > 10 ? 1.5 : 2;
    display.style.fontSize = fontSize + 'em';
}

function addToHistory(entry) {
    let option = document.createElement('option');
    option.text = entry;
    historyList.insertBefore(option, historyList.firstChild);
    if (historyList.length > 10) historyList.removeChild(historyList.lastChild);
}

function toggleTheme() {
    document.body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
    playSound();
}

function typeSocialLinks() {
    let socialSpan = document.getElementById('social-links');
    socialSpan.style.animation = 'typing 2s steps(40) forwards';
    setTimeout(() => {
        socialSpan.style.animation = 'erase 2s steps(40) forwards';
    }, 6000);
}

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

setInterval(typeSocialLinks, 10000);
typeSocialLinks();
clearDisplay();

document.addEventListener('mousemove', (e) => {
    let cursor = document.querySelector('.cursor');
    cursor.style.left = e.pageX - 10 + 'px';
    cursor.style.top = e.pageY - 10 + 'px';
    cursor.style.transform = 'scale(1.5)';
    setTimeout(() => cursor.style.transform = 'scale(1)', 100);
});

document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) addToDisplay(e.key);
    else if (e.key === '+') addToDisplay('+');
    else if (e.key === '-') addToDisplay('-');
    else if (e.key === '*') addToDisplay('*');
    else if (e.key === '/') addToDisplay('/');
    else if (e.key === '.') addToDisplay('.');
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') backspace();
    else if (e.key === '(') addToDisplay('(');
    else if (e.key === ')') addToDisplay(')');
});