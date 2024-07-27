/* Calculator tab inputs */
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

/* All the inputs */
const allInputs = document.querySelectorAll('.calculator-tab__input-fields, .configuration-tab__input-fields');

function calculate() {

    /* Calculator tab inputs */
    const salary = cleanAndConvert(salaryInput);
    const daysAbsent = cleanAndConvert(daysAbsentInput);
    const overtimeHours = cleanAndConvert(overtimeHoursInput);
    console.log(salary)
    /* Configuration tab inputs */
    const baseDays = cleanAndConvert(baseDaysInput);
    const baseHours = cleanAndConvert(baseHoursInput);
    const overtimeRate = cleanAndConvert(overtimeRateInput);

    const daysInMonth = getDaysInCurrentMonth();
    const daysWorked = daysInMonth - daysAbsent;
    const setcardValue = Math.round(salary / 12);

    const overtimePay = calculateOvertime(salary, baseHours, overtimeRate, overtimeHours);
    const salaryPay = calculateSalary(salary, baseDays, daysWorked, overtimePay);

    displayResults(daysWorked, overtimeHours, setcardValue, salaryPay);
}

function calculateOvertime(salary, baseHours, overtimeRate, overtimeHours) {

    return Math.round((salary / baseHours) * overtimeRate * overtimeHours);
}

function calculateSalary(salary, baseDays, daysWorked, overtimePay) {

    return Math.round((salary / baseDays) * daysWorked + overtimePay);
}

function cleanAndConvert(string) {

    let stringValue = string.value;
    let cleanedString = stringValue.replace(/[a-zA-Z]/g, '');
    return Number(cleanedString);
}

function getDaysInCurrentMonth() {

    let date = dateInput.value.split('/');
    let month = date[0];
    let year = date[1];
    let lastDayOfSelectedMonth = new Date(year, month, 0);
    return lastDayOfSelectedMonth.getDate();
}

function displayResults(daysWorked, overtimeHours, setcardValue, salaryPay) {

    const resultsBox = document.querySelector('.salary-calculator__results-box');

    resultsBox.innerHTML = `
    You have worked ${daysWorked} days,<br>
    ${overtimeHours} overtime hours,<br>
    Your setcard value should be ${setcardValue},<br>
    Your salary pay is ${salaryPay}.
    `;
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
            dateFormat: "m/Y", //defaults to "F Y"
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

    allInputs.forEach( (input) => {

        input.addEventListener('focus', (event) => {

            event.target.select();
        })
    })
})
