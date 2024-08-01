// Calculator tab inputs:
const dateInput = document.querySelector('#month-year');
const salaryInput = document.querySelector('#salary');
const daysAbsentInput = document.querySelector('#days-absent');
const overtimeHoursInput = document.querySelector('#overtime-hours');

// Configuration tab inputs:
const baseDaysInput = document.querySelector('#base-days');
const baseHoursInput = document.querySelector('#base-hours');
const overtimeRateInput = document.querySelector('#overtime-rate');

// Tabs and their tab switching buttons:
const calculatorBtn = document.querySelector('.calculator-tab-btn');
const configurationBtn = document.querySelector('.configuration-tab-btn');
const calculatorTab = document.querySelector('.calculator-tab');
const configurationTab = document.querySelector('.configuration-tab');

// All the inputs together:
const allInputs = document.querySelectorAll('.calculator-tab__input-fields, .configuration-tab__input-fields');

// Results box:
const resultsBox = document.querySelector('.salary-calculator__results-box');

// Dialog box buttons:
const resetBtn = document.querySelector('.reset-btn');
const calculateBtn = document.querySelector('.calculate-btn');

// Start menu:
const startMenu = document.querySelector('.task-bar__start-menu');
const startMenuBtns = document.querySelectorAll('.list__item');

// Taskbar buttons:
const startBtn = document.querySelector('.start-btn');
const appBtn = document.querySelector('.calculator-app-btn');

// System tray stuff:
const clockFace = document.querySelector('.system-tray-section__clock-face');

// soon all elements will be stored here :)
const Elements = {

    desktopShortcuts: {

        salaryCalculator: document.querySelector('.app-desktop-shortcut')
    },
    appWindow: {

        salaryCalculator: document.querySelector('.salary-calculator')
    },
    actionButtons: {

        minimize : document.querySelector('.minimize'),
        close: document.querySelector('.close')
    },
}

// CSS variables:
const CSSVariables = [
    '--background',
    '--main',
    '--accent',
    '--light-text',
    '--dark-text',
    '--light-border',
    '--dark-border',
    '--light-box-shadow',
    '--dark-box-shadow'
]

// App color themes:
const Themes = {

    original: {

        background: 'hsl(180, 100%, 25%)',
        main: 'hsl(0, 0%, 78%)', 
        accent: 'hsl(243, 100%, 26%)', 
        lightText: 'hsl(0, 0%, 100%)', 
        darkText: 'hsl(0, 0%, 0%)', 
        lightBorder: 'hsl(0, 0%, 87%)', 
        darkBorder: 'hsl(0, 0%, 5%)', 
        lightBoxShadow: 'hsl(0, 0%, 87%)', 
        darkBoxShadow: 'hsl(120, 0%, 52%)'
    },
    modernDark: {

        background: 'hsl(0, 0%, 0%)',
        main: 'hsl(240, 15%, 9%)',
        accent: 'hsl(240, 6%, 30%)',
        lightText: 'hsl(240, 15%, 9%)',
        darkText: 'hsl(36, 77%, 47%)',
        lightBorder: 'hsl(240, 6%, 30%)',
        darkBorder: 'hsl(0, 0%, 0%)',
        lightBoxShadow: 'hsl(243, 18%, 20%)',
        darkBoxShadow: 'hsl(220, 16%, 4%)'
    },
    violetDark: {

        background: 'hsl(288, 64%, 15%)',
        main: 'hsl(291, 51%, 26%)',
        accent: 'hsl(242, 66%, 37%)',
        lightText: 'hsl(0, 0%, 0%)',
        darkText: 'hsl(283, 41%, 64%)',
        lightBorder: 'hsl(292, 26%, 46%)',
        darkBorder: 'hsl(0, 0%, 0%)',
        lightBoxShadow: 'hsl(292, 40%, 63%)',
        darkBoxShadow: 'hsl(292, 54%, 16%)'
    },
    ningaTurtles: {

        background: 'hsl(132, 68%, 18%)',
        main: 'hsl(106, 73%, 36%)',
        accent: 'hsl(13, 83%, 50%)',
        lightText: 'hsl(0, 0%, 100%)',
        darkText: 'hsl(0, 0%, 0%)',
        lightBorder: 'hsl(109, 60%, 45%)',
        darkBorder: 'hsl(0, 0%, 0%)',
        lightBoxShadow: 'hsl(112, 94%, 68%)',
        darkBoxShadow: 'hsl(111, 80%, 24%)'
    },
    bee: {

        background: 'hsl(50, 79%, 31%)',
        main: 'hsl(52, 69%, 51%)',
        accent: 'hsl(0, 0%, 0%)',
        lightText: 'hsl(53, 78%, 70%)',
        darkText: 'hsl(0, 0%, 0%)',
        lightBorder: 'hsl(51, 68%, 55%)',
        darkBorder: 'hsl(0, 0%, 0%)',
        lightBoxShadow: 'hsl(53, 78%, 70%)',
        darkBoxShadow: 'hsl(50, 79%, 27%)'
    }
};

function validateInputThenClaculate() {

    let allValid = true;

    allInputs.forEach (input => {

        const cleanInput = cleanAndConvert(input);
        const labelsForAttribute = input.id;

        if ( input.value === '' ) {

            editLabel(labelsForAttribute, `Text field is empty =>`);
            allValid = false;
        }
        else if ( cleanInput === '' ) {

            editLabel(labelsForAttribute, `Make sure you're typing numbers =>`);
            allValid = false;
        }
        else if ( input.value < 0 ) {

            editLabel(labelsForAttribute, `Can't have negative numbers =>`);
            allValid = false;
        }
    })
    if (allValid) {

        allInputs.forEach( input => editLabelBack(input.id))
        calculate();
    }
};

function calculate() {

    // Calculator tab inputs.
    const salary = salaryInput.value;
    const daysAbsent = daysAbsentInput.value;
    const overtimeHours = overtimeHoursInput.value;
    // Configuration tab inputs.
    const baseDays = baseDaysInput.value;
    const baseHours = baseHoursInput.value;
    const overtimeRate = overtimeRateInput.value;

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
    
    let date = dateInput.value.split('.');
    let month = date[0];
    let year = date[1];
    let lastDayOfSelectedMonth = new Date(year, month, 0);
    
    return lastDayOfSelectedMonth.getDate();
};

function displayResults(daysWorked, overtimeHours, salaryPay) {
    
    resultsBox.innerHTML = `
    You have worked ${daysWorked} days this month,<br>
    ${overtimeHours} overtime hours,<br>
    Your salary pay is ${salaryPay}.
    `;
};

function resetApp() {

    dateInput.value = '';
    salaryInput.value = '';
    daysAbsentInput.value = 0;
    overtimeHoursInput.value = 0;
    baseDaysInput.value = 30;
    baseHoursInput.value = 225;
    overtimeRateInput.value = 1.5;
    resultsBox.innerHTML = '';
    allInputs.forEach(input => {

        const labelForAttribute = input.id;

        editLabelBack(labelForAttribute);
    })
};

function switchTabs(event) {

    const target = event.target;

    switch(target.dataset.tab) {

        case '0':
            calculatorBtn.style.zIndex = 12;
            calculatorTab.style.display = 'block';
            configurationBtn.style.zIndex = 10;
            configurationTab.style.display = 'none';
            break;
        case '1':
            calculatorBtn.style.zIndex = 10;
            calculatorTab.style.display = 'none';
            configurationBtn.style.zIndex = 12;
            configurationTab.style.display = 'block';
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

    Elements.appWindow.salaryCalculator.style.display = 'none';
    appBtn.style.display = 'none';
    Elements.desktopShortcuts.salaryCalculator.addEventListener('dblclick', openApp);
};

function openApp() {

    resetApp()
    Elements.appWindow.salaryCalculator.style.display = 'block';
    appBtn.style.display = 'block';
    Elements.desktopShortcuts.salaryCalculator.removeEventListener('dblclick', openApp);
};

function minimizeApp() {

    Elements.appWindow.salaryCalculator.style.display = 'none';
    appBtn.style.borderColor = 'var(--outwards-border)';
    appBtn.style.boxShadow = 'var(--outwards-box-shadow)';
    appBtn.addEventListener('click', bringAppBack)
};

function bringAppBack() {

    Elements.appWindow.salaryCalculator.style.display = 'block';
    appBtn.style.borderColor = 'var(--inwards-border)';
    appBtn.style.boxShadow = 'var(--inwards-box-shadow)';
    appBtn.removeEventListener('click', bringAppBack);
};

function displayStartMenu() {

    startMenu.style.display = 'block';
    startBtn.style.borderColor = 'var(--inwards-border)';
    startBtn.style.boxShadow = 'var(--inwards-box-shadow)';
    document.addEventListener('click', startMenuCloseHandler);
};

function startMenuCloseHandler(event) {

    const target = event.target;

    if (
        !startMenu.contains(target) &&
        !startBtn.contains(target)
    ) {

        startMenu.style.display = 'none';
        startBtn.style.borderColor = 'var(--outwards-border)';
        startBtn.style.boxShadow = 'var(--outwards-box-shadow)';
        document.removeEventListener('click', startMenuCloseHandler);
    }
};

function selectTheme(event) {

    const choiceNumber = event.target.dataset.value;

    switch (choiceNumber) {
        
        case '0':
            setTheme(Themes.original);
            break;
        case '1':
            setTheme(Themes.modernDark);
            break;
        case '2':
            setTheme(Themes.violetDark);
            break;
        case '3':
            setTheme(Themes.ningaTurtles);
            break;
        case '4':
            setTheme(Themes.bee);
            break;
    }
};

function setTheme(theme) {

    const values = Object.values(theme);

    for ( let i = 0; i < CSSVariables.length; i++ ) {

        document.documentElement.style.setProperty(CSSVariables[i], values[i]);
    }
};

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

    clockFace.innerHTML = time;
};

document.addEventListener('DOMContentLoaded', () => {

    startMenuBtns.forEach (button => {

        button.onclick = selectTheme;
    });
    startBtn.onclick = displayStartMenu;
    Elements.actionButtons.close.onclick = closeApp;
    Elements.actionButtons.minimize.onclick = minimizeApp;
    resetBtn.onclick = resetApp;
    calculateBtn.onclick = validateInputThenClaculate;
    calculatorBtn.dataset.tab = '0';
    configurationBtn.dataset.tab = '1';
    calculatorBtn.onclick = switchTabs;
    configurationBtn.onclick = switchTabs;
    // For time display
    setInterval(displayTime, 1000);
    // Selects all the text inside each input when it receives focus.
    allInputs.forEach( (input) => {

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