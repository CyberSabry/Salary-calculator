const calculateButton = document.querySelector('#calculate');
const salaryInput = document.querySelector('#user-salary');
const absenceDaysInput = document.querySelector('#days-of-absence');
const overtimeHoursInput = document.querySelector('#overtime-hours');

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
function switchTabs(event) {

    const clickedTabBtn = event.target
    const calculatorBtn = document.querySelector('.calculator-tab-button');
    const configurationBtn = document.querySelector('.configuration-tab-button');
    const calculatorTab = document.querySelector('.app-tabs__calculator-tab');
    const configurationTab = document.querySelector('.app-tabs__configuration-tab');

    if(clickedTabBtn.value == 0) {

        calculatorBtn.style.zIndex = 1;
        calculatorTab.style.display = 'flex';
        configurationBtn.style.zIndex = -1;
        configurationTab.style.display = 'none';
        console.log('switching to Calculator tab')
    }
    else if(clickedTabBtn.value == 1) {

        calculatorBtn.style.zIndex = -1;
        calculatorTab.style.display = 'none';
        configurationBtn.style.zIndex = 1;
        configurationTab.style.display = 'flex';
        console.log('switching to Configuration tab')
    }
}

document.addEventListener('click', switchTabs);