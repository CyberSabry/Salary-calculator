const dateInput = document.querySelector('#month-year');
const salaryInput = document.querySelector('#salary');
const daysAbsentInput = document.querySelector('#days-absent');
const overtimeHoursInput = document.querySelector('#overtime-hours');
const calculateButton = document.querySelector('.calculate-btn');

/* Configuration tab inputs */
const baseDaysInput = document.querySelector('#base-days');
const baseHoursInput = document.querySelector('#base-hours');
const overtimeRateInput = document.querySelector('#overtime-rate');

/* Tabs and their tab switching buttons */
const calculatorBtn = document.querySelector('.calculator-tab-btn');
const configurationBtn = document.querySelector('.configuration-tab-btn');
const calculatorTab = document.querySelector('.calculator-tab');
const configurationTab = document.querySelector('.configuration-tab');

function calculate() {

    const salary = salaryInput.value;
    const daysAbsent = daysAbsentInput.value;
    const overtimeHours = overtimeHoursInput.value;

    const baseDays = baseDaysInput.value;
    const baseHours = baseHoursInput.value;
    const overtimeRate = overtimeRateInput.value;

    const daysInMonth = getDaysInCurrentMonth();
    const daysWorked = daysInMonth - daysAbsent;
    const setcardValue = salary / 12;

    const overtimePay = (salary / baseHours) * overtimeRate * overtimeHours;
    const salaryPay = (salary / baseDays) * daysWorked + overtimePay;
    
    displayResults(daysWorked, overtimeHours, setcardValue, salaryPay);
}

function getDaysInCurrentMonth() {

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let lastDayOfCurrentMonth = new Date(year, month + 1, 0);
    return lastDayOfCurrentMonth.getDate();
}

function displayResults(daysWorked, overtimeHours, setcardValue, salaryPay) {

    const daysWorkedOutput = document.querySelector('.days-worked');
    const overtimeHoursOutput = document.querySelector('.overtime-hours');
    const setcardValueOutput = document.querySelector('.setcard-value');
    const salaryPayOutput = document.querySelector('.salary-pay');

    daysWorkedOutput.innerHTML = `You have worked ${daysWorked} days,`;
    overtimeHoursOutput.innerHTML = `And ${overtimeHours} overtime hours,`;
    setcardValueOutput.innerHTML = `Your setcard value should be ${setcardValue},`;
    salaryPayOutput.innerHTML = `Your salary pay is ${salaryPay}`;
}

function switchTabss(event) {

    const clickedTabBtn = event.target
    const calculatorBtn = document.querySelector('.calculator-tab-button');
    const configurationBtn = document.querySelector('.configuration-tab-button');
    const calculatorTab = document.querySelector('.app-tabs__calculator-tab');
    const configurationTab = document.querySelector('.app-tabs__configuration-tab');

    if(clickedTabBtn.value === '0') {

        calculatorBtn.style.zIndex = 12;
        calculatorTab.style.display = 'block';
        configurationBtn.style.zIndex = 10;
        configurationTab.style.display = 'none';
        console.log('switching to Calculator tab');
    }
    else if(clickedTabBtn.value === '1') {

        calculatorBtn.style.zIndex = 10;
        calculatorTab.style.display = 'none';
        configurationBtn.style.zIndex = 12;
        configurationTab.style.display = 'block';
        console.log('switching to Configuration tab')
    }
}

function switchTabs(event) {

    const clicked = event.target;

    switch(clicked.dataset.tab) {

        case '0':
            calculatorBtn.style.zIndex = 12;
            calculatorTab.style.display = 'block';
            configurationBtn.style.zIndex = 10;
            configurationTab.style.display = 'none';
            console.log()
            break;
        case '1':
            calculatorBtn.style.zIndex = 10;
            calculatorTab.style.display = 'none';
            configurationBtn.style.zIndex = 12;
            configurationTab.style.display = 'block';
            break;
    }
}

flatpickr("#month-year", {
    
    plugins: [
        new monthSelectPlugin({
            shorthand: true, //defaults to false
            dateFormat: "m.y", //defaults to "F Y"
            altFormat: "F Y", //defaults to "F Y"
        })
    ],
});

document.addEventListener('DOMContentLoaded', () => {

    calculateButton.onclick = calculate;

    calculatorBtn.dataset.tab = '0';
    configurationBtn.dataset.tab = '1';

    calculatorBtn.onclick = switchTabs;
    configurationBtn.onclick = switchTabs;


})