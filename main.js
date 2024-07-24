const calculateButton = document.querySelector('#calculate');
const salaryInput = document.querySelector('#user-salary');
const absenceDaysInput = document.querySelector('#days-of-absence');
const overtimeHoursInput = document.querySelector('#overtime-hours');

const calculatorBtn = document.querySelector('.calculator-tab-btn');
const configurationBtn = document.querySelector('.configuration-tab-btn');
const calculatorTab = document.querySelector('.calculator-tab');
const configurationTab = document.querySelector('.configuration-tab');

function calculate(salary, absenceDays, overtimeHours) {

    const daysInMonth = getDaysInCurrentMonth();
    const daysUserWorked = daysInMonth - absenceDays;
    const baseDays = 30;
    const baseHours = 225;
    const overtimeRate = 1.5;
    const setcardValue = salary / 12;

    const overtimePay = (salary / baseHours) * overtimeRate * overtimeHours;
    const salaryPay = (salary / baseDays) * daysUserWorked + overtimePay;
    
    console.log(`you have worked ${daysUserWorked} days`);
    console.log(`you have worked ${overtimeHours} overtime hours`);
    console.log(`your setcard value is ${setcardValue}`);
    console.log(salaryPay);
}

function getDaysInCurrentMonth() {

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let lastDayOfCurrentMonth = new Date(year, month + 1, 0);
    return lastDayOfCurrentMonth.getDate();
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

document.addEventListener('DOMContentLoaded', () => {

    calculatorBtn.dataset.tab = '0';
    configurationBtn.dataset.tab = '1';

    calculatorBtn.onclick = switchTabs;
    configurationBtn.onclick = switchTabs;


})

flatpickr("#month-year", {

    plugins: [
        new monthSelectPlugin({
          shorthand: true, //defaults to false
          dateFormat: "m.y", //defaults to "F Y"
          altFormat: "F Y", //defaults to "F Y"
        })
    ],
});
