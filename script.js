let display = document.getElementById('result');
let currentInput = '';
let themes = ['theme-dark', 'theme-light', 'theme-neon'];
let currentTheme = 0;

function addToDisplay(value) {
    currentInput += value;
    display.innerText = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.innerText = '0';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0';
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        display.innerText = currentInput;
    } catch {
        display.innerText = 'Error';
        currentInput = '';
    }
}

function toggleTheme() {
    document.body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
}

function typeSocialLinks() {
    let socialSpan = document.getElementById('social-links');
    socialSpan.style.animation = 'typing 2s steps(40) forwards';
    setTimeout(() => {
        socialSpan.style.animation = 'erase 2s steps(40) forwards';
    }, 6000);
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