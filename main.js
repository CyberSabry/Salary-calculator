// App desktop shortcut:
const appDesktopShortcut = document.querySelector('.app-desktop-shortcut');
const appDesktopShortcutHighlightLayer = document.querySelector('.app-desktop-shortcut__highlight');
// App window:
const appWindow = document.querySelector('.salary-calculator');
// Action buttons:
const minimizeBtn = document.querySelector('.minimize');
const closeBtn = document.querySelector('.close');
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

function validateInputThenClaculate() {

    let allValid = true;

    allInputs.forEach (input => {

        const cleanInput = cleanAndConvert(input);
        const labelsForAttribute = input.id;
        const regex = /\D/g;
        const digitRegex = /\d/g;

        if (input.id === 'month-year') {

            if (input.value === '') {

                editLabel(labelsForAttribute, `Text field is empty =>`);
                allValid = false;
            }
            else if (digitRegex.test(input.value)) {

                editLabelBack(labelsForAttribute)
                return;
            }
            else {

                return;
            }
        }
        if (input.value === '') {

            editLabel(labelsForAttribute, `Text field is empty =>`);
            allValid = false;
        }
        else if (input.value < 0) {

            editLabel(labelsForAttribute, `Can't have negative numbers =>`);
            allValid = false;
        }
        else if (digitRegex.test(input.value)) {

            input.value = cleanInput;
            editLabelBack(labelsForAttribute)
        }
        else if (regex.test(input.value)) {

            editLabel(labelsForAttribute, `Make sure you're typing numbers =>`);
            allValid = false;
        }
    })
    if (allValid) {

        calculate();
    }
}

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
}

function calculateOvertime(salary, baseHours, overtimeRate, overtimeHours) {

    return parseFloat(((salary / baseHours) * overtimeRate * overtimeHours).toFixed(2));
}

function calculateSalary(salary, baseDays, daysWorked, overtimePay) {

    return parseFloat(((salary / baseDays) * daysWorked + overtimePay).toFixed(2));
}

function cleanAndConvert(input) {

    let value = input.value;
    let cleanInput = value.replace(/\D/g, '');

    return cleanInput;
}

function getDaysInSelectedMonth() {
    
    let date = dateInput.value.split('/');
    let month = date[0];
    let year = date[1];
    let lastDayOfSelectedMonth = new Date(year, month, 0);
    
    return lastDayOfSelectedMonth.getDate();
}

function displayResults(daysWorked, overtimeHours, salaryPay) {
    
    resultsBox.innerHTML = `
    You have worked ${daysWorked} days this month,<br>
    ${overtimeHours} overtime hours,<br>
    Your salary pay is ${salaryPay}.
    `;
}

function resetApp() {

    dateInput.value = '';
    salaryInput.value = '';
    daysAbsentInput.value = 0;
    overtimeHoursInput.value = 0;
    baseDaysInput.value = 30;
    baseHoursInput.value = 225;
    overtimeRateInput.value = 1.5;
    resultsBox.innerHTML = '';
    
    allInputs.forEach (input => {

        const labelForAttribute = input.id;

        editLabelBack(labelForAttribute);
    })
}

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
}

function editLabel(labelForAttribute, massage) {

    const label = document.querySelector(`[for="${labelForAttribute}"]`);

        label.innerHTML = massage;
        label.style.color = 'red';
}

function editLabelBack(labelForAttribute) {

    const label = document.querySelector(`[for="${labelForAttribute}"]`);
    const dataValue = label.getAttribute('data-value');
    const defaultLabels = ['Date:', 'Salary:', 'Days absent:', 'Overtime hours:', 'Base days:', 'Base hours:', 'Overtime rate:'];

    label.innerHTML = defaultLabels[dataValue];
    label.style.color = 'var(--dark-text)';
}

function closeApp() {

    appWindow.style.display = 'none';
    appBtn.style.display = 'none';
    appDesktopShortcut.addEventListener('dblclick', openApp);
}

function openApp() {

    resetApp()
    appWindow.style.display = 'block';
    appBtn.style.display = 'block';
    appDesktopShortcut.removeEventListener('dblclick', openApp);
}

function minimizeApp() {

    appWindow.style.display = 'none';
    appBtn.style.borderColor = 'var(--outwards-border)';
    appBtn.style.boxShadow = 'var(--outwards-box-shadow)';
    appBtn.addEventListener('click', bringAppBack)
}

function bringAppBack() {

    appWindow.style.display = 'block';
    appBtn.style.borderColor = 'var(--inwards-border)';
    appBtn.style.boxShadow = 'var(--inwards-box-shadow)';
    appBtn.removeEventListener('click', bringAppBack);
}

function displayStartMenu() {

    startMenu.style.display = 'block';
    startBtn.style.borderColor = 'var(--inwards-border)';
    startBtn.style.boxShadow = 'var(--inwards-box-shadow)';
    document.addEventListener('click', startMenuCloseHandler);
}

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
}
function switchThemes(event) {

    const rootVeriables = getComputedStyle(document.documentElement);
    const background = rootVeriables.getPropertyValue('--background').trim();
    const main = rootVeriables.getPropertyValue('--main').trim();
    const accent = rootVeriables.getPropertyValue('--accent').trim();
    const lightText = rootVeriables.getPropertyValue('--light-text').trim();
    const darkText = rootVeriables.getPropertyValue('--dark-text').trim();
    const lightBorder = rootVeriables.getPropertyValue('--light-border').trim();
    const darkBorder = rootVeriables.getPropertyValue('--dark-border').trim();
    const lightBoxShadow = rootVeriables.getPropertyValue('--light-box-shadow').trim();
    const darkBoxShadow = rootVeriables.getPropertyValue('--dark-box-shadow').trim();


    const original = [
        /* background */ 'hsl(180, 100%, 25%)', 
        /* main */ 'hsl(0, 0%, 78%)', 
        /* accent */ 'hsl(243, 100%, 26%)', 
        /* light-text */ 'hsl(0, 0%, 100%)', 
        /* dark-text */ 'hsl(0, 0%, 0%)', 
        /* light-border */ 'hsl(0, 0%, 87%)', 
        /* dark-border */ 'hsl(0, 0%, 5%)', 
        /* light-box-shadow */ 'hsl(0, 0%, 87%)', 
        /* dark-box-shadow */ 'hsl(120, 0%, 52%)'
    ];
    const modernDark = [
        'hsl(0, 0%, 0%)', 
        'hsl(240, 15%, 9%)', 
        'hsl(240, 6%, 30%)', 
        'hsl(240, 15%, 9%)', 
        'hsl(36, 77%, 47%)', 
        'hsl(240, 6%, 30%)', 
        'hsl(0, 0%, 0%)', 
        'hsl(243, 18%, 20%)', 
        'hsl(220, 16%, 4%)'
    ];
    // const violetDark = [];
    // const ningaTurtles = [];
    // const bee = [];

    const themes = [original, modernDark/*, violetDark, ningaTurtles, bee*/];

    const choiceNumber = event.target.dataset.tab;

    switch (choiceNumber) {

        case '0':

    }
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

    clockFace.innerHTML = time;
}

document.addEventListener('DOMContentLoaded', () => {

    startBtn.onclick = displayStartMenu;

    closeBtn.onclick = closeApp;
    minimizeBtn.onclick = minimizeApp;

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
    })
    // JavaScript library for date input UI.
    flatpickr("#month-year", {
    
        plugins: [
            new monthSelectPlugin({
                shorthand: true,
                dateFormat: "m/Y",
                altFormat: "F Y",
            })
        ],
    });
})