// Calculator tab inputs.
const dateInput = document.querySelector('#month-year');
const salaryInput = document.querySelector('#salary');
const daysAbsentInput = document.querySelector('#days-absent');
const overtimeHoursInput = document.querySelector('#overtime-hours');
const calculateButton = document.querySelector('.calculate-btn');
// Configuration tab inputs.
const baseDaysInput = document.querySelector('#base-days');
const baseHoursInput = document.querySelector('#base-hours');
const overtimeRateInput = document.querySelector('#overtime-rate');
// Tabs and their tab switching buttons.
const calculatorBtn = document.querySelector('.calculator-tab-btn');
const configurationBtn = document.querySelector('.configuration-tab-btn');
const calculatorTab = document.querySelector('.calculator-tab');
const configurationTab = document.querySelector('.configuration-tab');
// All the inputs.
const allInputs = document.querySelectorAll('.calculator-tab__input-fields, .configuration-tab__input-fields');

function validateInputThenClaculate() {

    let allValid = true;

    allInputs.forEach (input => {

        const cleanInput = cleanAndConvert(input);
        const labelsForAttribute = input.id;
        const regex = /\D/g;
        const digitRegex = /\d/g;

        if (input.id === 'month-year') {

            return;
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

    const resultsBox = document.querySelector('.salary-calculator__results-box');

    resultsBox.innerHTML = `
    You have worked ${daysWorked} days this month,<br>
    ${overtimeHours} overtime hours,<br>
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
    console.log('edit should be working')
}

document.addEventListener('DOMContentLoaded', () => {

    calculateButton.onclick = validateInputThenClaculate;

    calculatorBtn.dataset.tab = '0';
    configurationBtn.dataset.tab = '1';

    calculatorBtn.onclick = switchTabs;
    configurationBtn.onclick = switchTabs;
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