// JAVASCRIPT FILE - script.js
let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    display.textContent = currentInput;
    createBunnyParticles(document.querySelector('[data-action="clear"]'));
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    display.textContent = currentInput;
}

function calculate() {
    try {
        let result = eval(currentInput.replace('×', '*').replace('÷', '/').replace('−', '-'));
        currentInput = result.toString();
        display.textContent = currentInput;
        shouldResetDisplay = true;
        
        // Special bunny celebration for calculations!
        setTimeout(() => {
            display.textContent = currentInput + ' 🐰💕';
            setTimeout(() => {
                display.textContent = currentInput;
            }, 1000);
        }, 100);
        
    } catch (error) {
        display.textContent = '🐰 Oops! 🥕';
        currentInput = '0';
        shouldResetDisplay = true;
        setTimeout(() => {
            display.textContent = '0';
        }, 2000);
    }
}

function createBunnyParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = ['💕', '🐰', '🥕', '🌸', '🌿'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = Math.random() > 0.5 ? 'heart-particle' : 'carrot-particle';
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1200);
    }
}

function createFloatingElement() {
    const element = document.createElement('div');
    const isBunny = Math.random() > 0.5;
    element.className = isBunny ? 'floating-bunny' : 'floating-carrot';
    
    if (isBunny) {
        const bunnies = ['🐰', '🐇', '🌸🐰', '💕🐇', '🐰🥕'];
        element.innerHTML = bunnies[Math.floor(Math.random() * bunnies.length)];
    } else {
        const carrots = ['🥕', '🥕🌿', '✨🥕', '🥕💫'];
        element.innerHTML = carrots[Math.floor(Math.random() * carrots.length)];
    }
    
    element.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    element.style.animationDuration = (Math.random() * 4 + 8) + 's';
    
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 12000);
}

// Event listeners
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        button.classList.add('glow');
        setTimeout(() => button.classList.remove('glow'), 800);
        
        if (action === 'calculate') {
            createBunnyParticles(button);
            calculate();
        } else if (action === 'clear') {
            clearDisplay();
        } else if (action === 'delete') {
            deleteLast();
        } else if (value) {
            appendToDisplay(value);
        }
    });
});

// Bunny family interactions
document.querySelectorAll('.cute-bunny').forEach(bunny => {
    bunny.addEventListener('click', () => {
        createBunnyParticles(bunny);
    });
});

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if ('0123456789.'.includes(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Create floating elements
setInterval(createFloatingElement, 3000);

// Initial floating elements
for (let i = 0; i < 3; i++) {
    setTimeout(createFloatingElement, i * 1000);
}

// Welcome message
setTimeout(() => {
    display.textContent = 'Welcome! 🐰';
    setTimeout(() => {
        display.textContent = '0';
    }, 2000);
}, 500);