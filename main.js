const Elements = {

    desktopShortcuts: {

        salaryCalculator: document.querySelector('.app-desktop-shortcut')
    },
    appWindow: {

        salaryCalculator: document.querySelector('.salary-calculator')
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
        darkBoxShadow: 'hsl(120, 0%, 52%)',
        inputBackground: 'hsl(0, 0%, 95%)',

        windowsLogoTopLeft: 'hsl(0, 100%, 50%)',
        windowsLogoTopRight: 'hsl(120, 100%, 50%)',
        windowsLogoBottomLeft: 'hsl(240, 100%, 50%)',
        windowsLogoBottomRight: 'hsl(60, 100%, 50%)',

        appLogoScreenColor: 'hsl(180, 100%, 25%)',
        appLogoLightMainParts: 'hsl(0, 0%, 76%)',
        appLogoDarkMainParts: 'hsl(0, 0%, 51%)',
        appLogoAccentParts: 'hsl(247, 100%, 25%)',
        appLogoLightParts: 'hsl(0, 0%, 100%)',
        appLogoDarkParts: 'hsl(0, 0%, 0%)',
        appLogoTextColor: 'hsl(0, 0%, 100%)',
        appLogoInputBackground: 'hsl(0, 0%, 100%)'
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
        darkBoxShadow: 'hsl(220, 16%, 4%)',
        inputBackground: 'hsl(240, 5%, 20%)',

        windowsLogoTopLeft: 'hsl(36, 77%, 47%)',
        windowsLogoTopRight: 'hsl(240, 6%, 30%)',
        windowsLogoBottomLeft: 'hsl(240, 6%, 30%)',
        windowsLogoBottomRight: 'hsl(36, 77%, 47%)',

        appLogoScreenColor: 'hsl(0, 0%, 0%)',
        appLogoLightMainParts: 'hsl(220, 16%, 24%)',
        appLogoDarkMainParts: 'hsl(240, 15%, 19%)',
        appLogoAccentParts: 'hsl(240, 6%, 30%)',
        appLogoLightParts: 'hsl(240, 6%, 30%)',
        appLogoDarkParts: 'hsl(240, 15%, 9%)',
        appLogoTextColor: 'hsl(36, 77%, 47%)',
        appLogoInputBackground: 'hsl(240, 5%, 20%)'
    },
    violetDark: {
        
        background: 'hsl(288, 64%, 15%)',
        main: 'hsl(291, 51%, 26%)',
        accent: 'hsl(242, 66%, 37%)',
        lightText: 'hsl(0, 0%, 100%)',
        darkText: 'hsl(283, 41%, 64%)',
        lightBorder: 'hsl(292, 26%, 46%)',
        darkBorder: 'hsl(0, 0%, 0%)',
        lightBoxShadow: 'hsl(292, 40%, 63%)',
        darkBoxShadow: 'hsl(292, 54%, 16%)',
        inputBackground: 'hsl(292, 54%, 20%)',

        windowsLogoTopLeft: 'hsl(283, 41%, 64%)',
        windowsLogoTopRight: 'hsl(309, 65%, 54%)',
        windowsLogoBottomLeft: 'hsl(309, 65%, 54%)',
        windowsLogoBottomRight: 'hsl(283, 41%, 64%)',

        appLogoScreenColor: 'hsl(291, 51%, 26%)',
        appLogoLightMainParts: 'hsl(292, 26%, 46%)',
        appLogoDarkMainParts: 'hsl(292, 54%, 16%)',
        appLogoAccentParts: 'hsl(242, 66%, 37%)',
        appLogoLightParts: 'hsl(292, 40%, 63%)',
        appLogoDarkParts: 'hsl(0, 0%, 0%)',
        appLogoTextColor: 'hsl(283, 41%, 64%)',
        appLogoInputBackground: 'hsl(292, 54%, 30%)'
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
        darkBoxShadow: 'hsl(111, 80%, 24%)',
        inputBackground: 'hsl(106, 68%, 72%)',

        windowsLogoTopLeft: 'hsl(112, 94%, 68%)',
        windowsLogoTopRight: 'hsl(13, 83%, 50%)',
        windowsLogoBottomLeft: 'hsl(13, 83%, 50%)',
        windowsLogoBottomRight: 'hsl(112, 94%, 68%)',

        appLogoScreenColor: 'hsl(132, 68%, 18%)',
        appLogoLightMainParts: 'hsl(109, 60%, 45%)',
        appLogoDarkMainParts: 'hsl(111, 80%, 24%)',
        appLogoAccentParts: 'hsl(13, 83%, 50%)',
        appLogoLightParts: 'hsl(112, 94%, 68%)',
        appLogoDarkParts: 'hsl(0, 0%, 0%)',
        appLogoTextColor: 'hsl(106, 68%, 72%)',
        appLogoInputBackground: 'hsl(106, 68%, 72%)'
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
        darkBoxShadow: 'hsl(50, 80%, 17%)',
        inputBackground: 'hsl(52, 79%, 72%)',

        windowsLogoTopLeft: 'hsl(52, 69%, 51%)',
        windowsLogoTopRight: 'hsl(52, 79%, 72%)',
        windowsLogoBottomLeft: 'hsl(52, 79%, 72%)',
        windowsLogoBottomRight: 'hsl(52, 69%, 51%)',

        appLogoScreenColor: 'hsl(50, 79%, 31%)',
        appLogoLightMainParts: 'hsl(53, 78%, 70%)',
        appLogoDarkMainParts: 'hsl(50, 80%, 20%)',
        appLogoAccentParts: 'hsl(0, 0%, 0%)',
        appLogoLightParts: 'hsl(53, 78%, 70%)',
        appLogoDarkParts: 'hsl(0, 0%, 0%)',
        appLogoTextColor: 'hsl(0, 0%, 0%)',
        appLogoInputBackground: 'hsl(52, 79%, 72%)'
    }
};

const CSSVariables = [
    '--background',
    '--main',
    '--accent',
    '--light-text',
    '--dark-text',
    '--light-border',
    '--dark-border',
    '--light-box-shadow',
    '--dark-box-shadow',
    '--input-background',
    '--windows-logo-top-left',
    '--windows-logo-top-right',
    '--windows-logo-bottom-left',
    '--windows-logo-bottom-right',
    '--app-logo-screen-color',
    '--app-logo-light-main-parts',
    '--app-logo-dark-main-parts',
    '--app-logo-accent-parts',
    '--app-logo-light-parts',
    '--app-logo-dark-parts',
    '--app-logo-text-color',
    '--app-logo-input-background'
]

function validateInputThenClaculate() {
    
    let allValid = true;
    
    Elements.allInputs.forEach (input => {

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

    Elements.systemTray.clockFace.innerHTML = time;
};

document.addEventListener('DOMContentLoaded', () => {

    Elements.startMenu.buttons.forEach (button => {

        button.onclick = selectTheme;
    });
    Elements.taskbarButtons.start.onclick = displayStartMenu;
    Elements.actionButtons.close.onclick = closeApp;
    Elements.actionButtons.minimize.onclick = minimizeApp;
    Elements.dialogBoxButtons.reset.onclick = resetApp;
    Elements.dialogBoxButtons.calculate.onclick = validateInputThenClaculate;
    Elements.tabSwitchButtons.calculator.onclick = switchTabs;
    Elements.tabSwitchButtons.configuration.onclick = switchTabs;
    // For time display
    setInterval(displayTime, 1000);
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