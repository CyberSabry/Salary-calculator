const Elements = {

    desktopShortcuts: {

        salaryCalculator: document.querySelector('.app-desktop-shortcut')
    },
    appWindow: {

        salaryCalculator: document.querySelector('.salary-calculator'),
        titleBar: document.querySelector('.salary-calculator__title-bar')
    },
    actionButtons: {

        minimize : document.querySelector('.action-buttons__button--minimize'),
        close: document.querySelector('.action-buttons__button--close')
    },
    tabSwitchButtons: {

      calculator: document.querySelector('.tabs-switcher__button--calculator'),
      configuration: document.querySelector('.tabs-switcher__button--configuration')
    },
    tabs: {

        calculator: document.querySelector('#calculator-tab'),
        configuration: document.querySelector('#configuration-tab')
    },
    calculatorTabInputs: {

        date: document.querySelector('#month-year'),
        salary: document.querySelector('#salary'),
        daysAbsent: document.querySelector('#days-absent'),
        overtime: document.querySelector('#overtime-hours')
    },
    configurationTabInputs: {

        baseDays: document.querySelector('#base-days'),
        baseHours: document.querySelector('#base-hours'),
        overtimeRate: document.querySelector('#overtime-rate')
    },
    allInputs: document.querySelectorAll('.tab__input-field'),
    resultsBox: {

        box: document.querySelector('.salary-calculator__results-box')
    },
    dialogBoxButtons: {

        reset: document.querySelector('.dialog-box__button--reset'),
        calculate: document.querySelector('.dialog-box__button--calculate')
    },
    startMenu: {

        body: document.querySelector('.task-bar__start-menu'),
        buttons: document.querySelectorAll('.list__item')
    },
    taskbarButtons: {

        start: document.querySelector('.app-buttons-section__app-button--start'),
        calculator: document.querySelector('.app-buttons-section__app-button--calculator')
    },
    systemTray: {

        clockFace: document.querySelector('.system-tray-section__clock-face')
    }
}

function validateInputThenClaculate() {
    
    let allValid = true;
    
    Elements.allInputs.forEach (input => {

        input.value = cleanAndConvert(input);
        const labelsForAttribute = input.id;
        
        if ( input.value === '' ) {
            
            editLabel(labelsForAttribute, `Empty. Type numbers only. =>`);
            allValid = false;
        }
    })
    if (allValid) {

        Elements.allInputs.forEach( input => editLabelBack(input.id))
        calculate();
    }
};

function calculate() {

    // Calculator tab inputs.
    const salary = Elements.calculatorTabInputs.salary.value;
    const daysAbsent = Elements.calculatorTabInputs.daysAbsent.value;
    const overtimeHours = Elements.calculatorTabInputs.overtime.value;
    // Configuration tab inputs.
    const baseDays = Elements.configurationTabInputs.baseDays.value;
    const baseHours = Elements.configurationTabInputs.baseHours.value;
    const overtimeRate = Elements.configurationTabInputs.overtimeRate.value;

    const daysInMonth = getDaysInSelectedMonth();
    const daysWorked = daysInMonth - daysAbsent;

    const overtimePay = calculateOvertime(salary, baseHours, overtimeRate, overtimeHours);
    const salaryPay = calculateSalary(salary, baseDays, daysWorked, overtimePay);

    displayResults(daysWorked, overtimeHours, salaryPay);
};

function calculateOvertime(salary, baseHours, overtimeRate, overtimeHours) {

    return parseFloat(((salary / baseHours) * overtimeRate * overtimeHours).toFixed(2));
};

function calculateSalary(salary, baseDays, daysWorked, overtimePay) {

    return parseFloat(((salary / baseDays) * daysWorked + overtimePay).toFixed(2));
};

function cleanAndConvert(input) {

    let value = input.value;
    let cleanInput = value.replace(/[^0-9.]+/g, '');
    return cleanInput;
};

function getDaysInSelectedMonth() {
    
    let date = Elements.calculatorTabInputs.date.value.split('.');
    let month = date[0];
    let year = date[1];
    let lastDayOfSelectedMonth = new Date(year, month, 0);
    
    return lastDayOfSelectedMonth.getDate();
};

function displayResults(daysWorked, overtimeHours, salaryPay) {
    
    Elements.resultsBox.box.innerHTML = `
    You have worked ${daysWorked} days this month,<br>
    ${overtimeHours} overtime hours,<br>
    Your salary pay is ${salaryPay}.
    `;
};

function resetApp() {

    Elements.calculatorTabInputs.date.value = '';
    Elements.calculatorTabInputs.salary.value = '';
    Elements.calculatorTabInputs.overtime.value = 0;
    Elements.calculatorTabInputs.overtime.value = 0;
    Elements.configurationTabInputs.baseDays.value = 30;
    Elements.configurationTabInputs.baseHours.value = 225;
    Elements.configurationTabInputs.overtimeRate.value = 1.5;
    Elements.resultsBox.box.innerHTML = '';
    Elements.allInputs.forEach(input => {

        const labelForAttribute = input.id;

        editLabelBack(labelForAttribute);
    })
};

function switchTabs(event) {

    const target = event.target;

    switch(target.dataset.value) {

        case '0':
            Elements.tabSwitchButtons.calculator.style.zIndex = 12;
            showElement(Elements.tabs.calculator);
            Elements.tabSwitchButtons.configuration.style.zIndex = 10;
            hideElement(Elements.tabs.configuration);
            break;
        case '1':
            Elements.tabSwitchButtons.calculator.style.zIndex = 10;
            hideElement(Elements.tabs.calculator);
            Elements.tabSwitchButtons.configuration.style.zIndex = 12;
            showElement(Elements.tabs.configuration);
            break;
    }
};

function editLabel(labelForAttribute, massage) {

    const label = document.querySelector(`[for="${labelForAttribute}"]`);

    label.innerHTML = massage;
    label.style.color = 'red';
};

function editLabelBack(labelForAttribute) {

    const label = document.querySelector(`[for="${labelForAttribute}"]`);
    const dataValue = label.getAttribute('data-value');
    const defaultLabels = ['Date:', 'Salary:', 'Days absent:', 'Overtime hours:', 'Base days:', 'Base hours:', 'Overtime rate:'];

    label.innerHTML = defaultLabels[dataValue];
    label.style.color = 'var(--dark-text)';
};

function closeApp() {

    hideElement(Elements.appWindow.salaryCalculator);
    hideElement(Elements.taskbarButtons.calculator);
    Elements.desktopShortcuts.salaryCalculator.addEventListener('dblclick', openApp);
};

function openApp() {

    resetApp()
    showElement(Elements.appWindow.salaryCalculator);
    showElement(Elements.taskbarButtons.calculator);
    Elements.desktopShortcuts.salaryCalculator.removeEventListener('dblclick', openApp);
};

function minimizeApp() {

    hideElement(Elements.appWindow.salaryCalculator);
    Elements.taskbarButtons.calculator.style.borderColor = 'var(--outwards-border)';
    Elements.taskbarButtons.calculator.style.boxShadow = 'var(--outwards-box-shadow)';
    Elements.taskbarButtons.calculator.addEventListener('click', bringAppBack)
};

function bringAppBack() {

    showElement(Elements.appWindow.salaryCalculator);
    Elements.taskbarButtons.calculator.style.borderColor = 'var(--inwards-border)';
    Elements.taskbarButtons.calculator.style.boxShadow = 'var(--inwards-box-shadow)';
    Elements.taskbarButtons.calculator.removeEventListener('click', bringAppBack);
};

function displayStartMenu() {

    showElement(Elements.startMenu.body)
    Elements.taskbarButtons.start.style.borderColor = 'var(--inwards-border)';
    Elements.taskbarButtons.start.style.boxShadow = 'var(--inwards-box-shadow)';
    document.addEventListener('click', startMenuCloseHandler);
};

function showElement(element) {

    const hiddenClass = element.classList[0] + '--hidden';

    element.classList.remove(hiddenClass);
}

function hideElement(element) {

    const hiddenClass = element.classList[0] + '--hidden';

    element.classList.add(hiddenClass);
}

function startMenuCloseHandler(event) {

    const target = event.target;

    if (
        !Elements.startMenu.body.contains(target) &&
        !Elements.taskbarButtons.start.contains(target)
    ) {

        hideElement(Elements.startMenu.body);
        Elements.taskbarButtons.start.style.borderColor = 'var(--outwards-border)';
        Elements.taskbarButtons.start.style.boxShadow = 'var(--outwards-box-shadow)';
        document.removeEventListener('click', startMenuCloseHandler);
    }
};

function selectTheme(event) {

    const choiceNumber = event.target.dataset.value;

    switch (choiceNumber) {
        
        case '0':
            setTheme('default');
            break;
        case '1':
            setTheme('modern-dark');
            break;
        case '2':
            setTheme('violet-dark');
            break;
        case '3':
            setTheme('ninja-turtles');
            break;
        case '4':
            setTheme('bee');
            break;
    }
};

function setTheme(theme) {
    document.body.className = theme;
};

function makeDraggable(target, trigger, minWidth, minHeight) {

    let isDragging = false;
    let offsetX, offsetY;

    function checkViewportSize() {

        return window.innerWidth >= minWidth && window.innerHeight >= minHeight;
    }

    function onMouseDown(event) {

        if (checkViewportSize()) {

            isDragging = true;
            offsetX = event.clientX - target.offsetLeft;
            offsetY = event.clientY - target.offsetTop;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    }

    function onMouseMove(event) {

        if (isDragging) {
            target.style.left = `${event.clientX - offsetX}px`;
            target.style.top = `${event.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {

        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    trigger.addEventListener('mousedown', onMouseDown);

    window.addEventListener('resize', () => {

        if (!checkViewportSize() && isDragging) {

            onMouseUp();
        }
    });
}

function displayTime() {

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let time = `${hours} : ${minutes} ${ampm}`;

    Elements.systemTray.clockFace.innerHTML = time;
};

document.addEventListener('DOMContentLoaded', () => {
    // Set color theme to default:
    setTheme('default');
    // Action buttons:
    Elements.actionButtons.close.onclick = closeApp;
    Elements.actionButtons.minimize.onclick = minimizeApp;
    // Dialog buttons:
    Elements.dialogBoxButtons.calculate.onclick = validateInputThenClaculate;
    Elements.dialogBoxButtons.reset.onclick = resetApp;
    // Tab switchers:
    Elements.tabSwitchButtons.calculator.onclick = switchTabs;
    Elements.tabSwitchButtons.configuration.onclick = switchTabs;
    // Start menu button:
    Elements.taskbarButtons.start.onclick = displayStartMenu;
    // Start menu list items for themes:
    Elements.startMenu.buttons.forEach (button => {

        button.onclick = selectTheme;
    });
    // For time display
    setInterval(displayTime, 1000);
    // Makes the first element draggable when holding mouse down on the second element, But the funciton will not work if you're using it in small screen size:
    makeDraggable(Elements.appWindow.salaryCalculator, Elements.appWindow.titleBar, 500, 500);
    // Selects all the text inside each input when it receives focus.
    Elements.allInputs.forEach( (input) => {

        input.addEventListener('focus', (event) => {

            event.target.select();
        })
    });
    // JavaScript library for date input UI.
    flatpickr("#month-year", {
    
        plugins: [
            new monthSelectPlugin({
                shorthand: true,
                dateFormat: "m.Y",
                altFormat: "F Y",
            })
        ],
    });
});