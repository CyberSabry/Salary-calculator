/* Elements selectors */
const E = {
  desktopShortcut: document.getElementById('desktop-shortcut'),
  salaryCalculator: document.getElementById('salary-calculator'),
  form: document.querySelector('#form'),
  resultsBox: document.getElementById('results-box'),

  btns: {
    minimize: document.getElementById('minimize'),
    close: document.getElementById('close'),
    clacSwtchr: document.querySelector('.tabs-swtchr__btn--calc'),
    configSwtchr: document.querySelector('.tabs-swtchr__btn--config'),
    start: document.getElementById('start-button'),
    calculator: document.getElementById('calculator-button')
  },

  inputs: document.querySelectorAll('.tab__text-input'),

  startMenu: {
    menu: document.getElementById('start-menu'),
    items: document.querySelectorAll('.item')
  },

  clockFace: document.getElementById('clock')
};
/* Functions */
function getFormData() {
  const Data = {}
  const formData = new FormData(E.form);

  formData.forEach((value, key) => {
    Data[key] = value;
  })
  return Data;
}

function calcOvertime(salary, baseHours, overtimeRate, overtimeHours) {
  return parseFloat(((salary / baseHours) * overtimeRate * overtimeHours).toFixed(2));
};

function calcSalary(salary, baseDays, daysWorked, overtimePay) {
  return parseFloat(((salary / baseDays) * daysWorked + overtimePay).toFixed(2));
};

function calcDaysInMonth(dateString) {
  const [year, month] = dateString.split('-').map(Number);
  const nextMonth = new Date(year, month, 0);
  const daysInMonth = nextMonth.getDate();

  return daysInMonth;
};

function displayResults(daysWorked, overtimeHours, salaryPay) {
  E.resultsBox.innerHTML = `
    You have worked ${daysWorked} days this month,<br>
    ${overtimeHours} overtime hours,<br>
    Your salary pay is ${salaryPay}.
  `;
};

function calculate() {
  const data = getFormData();
  const daysInMonth = calcDaysInMonth(data.month);
  const daysWorked = daysInMonth - data.daysAbsent;
  const overtimePay = calcOvertime(data.salary, data.baseHours, data.overtimeRate, data.overtimeHours);
  const salaryPay = calcSalary(data.salary, data.baseDays, daysWorked, overtimePay);

  displayResults(daysWorked, data.overtimeHours, salaryPay);
};

function switchTab(name) {
  switch(name) {
    case 'calculate':
      E.salaryCalculator.classList.remove('sc--config-tab');
      E.salaryCalculator.classList.add('sc--calc-tab');
    break;
    case 'configuration':
      E.salaryCalculator.classList.remove('sc--calc-tab');
      E.salaryCalculator.classList.add('sc--config-tab');
    break;
  };
};

function hide(element) {
  const hiddenClass = element.classList[0] + '--hidden';
  element.classList.add(hiddenClass);
}

function show(element) {
  const hiddenClass = element.classList[0] + '--hidden';
  element.classList.remove(hiddenClass);
}

function windowManager(mode) {
  switch(mode) {
    case 'minimize':
      hide(E.salaryCalculator);
      E.btns.calculator.classList.remove('apps__button--pressed');
    return;
    case 'open':
      show(E.salaryCalculator);
      show(E.btns.calculator);
      E.btns.calculator.classList.add('apps__button--pressed');
    return
    case 'close':
      hide(E.salaryCalculator);
      hide(E.btns.calculator);
      E.form.reset()
    return;
  }
}

function startMenu(mode) {
  switch(mode) {
    case 'open':
      show(E.startMenu.menu);
      E.btns.start.classList.add('apps__button--pressed');
      document.addEventListener('click', startMenuCloseHandler);
    break;
    case 'close':
      hide(E.startMenu.menu);
      E.btns.start.classList.remove('apps__button--pressed');
      document.removeEventListener('click', startMenuCloseHandler);
  }
}

function startMenuCloseHandler(event) {
  const target = event.target;
  if (!E.startMenu.menu.contains(target) && !E.btns.start.contains(target)) {
    startMenu('close');
  }
};

function setTheme(event) {
  const selectedTheme = event.target.dataset.value;
  document.body.className = selectedTheme;
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

  E.clockFace.innerHTML = time;
};

document.addEventListener('DOMContentLoaded', () => {
  // For app to start calculating.
  E.form.addEventListener('submit', (event) =>{
    event.preventDefault();
    calculate();
  });
  // Desktop shortcut.
  E.desktopShortcut.addEventListener('dblclick', () => { windowManager('open') });
  // Action buttons:
  E.btns.minimize.onclick = () => { windowManager('minimize') };
  E.btns.close.onclick = () => { windowManager('close') };
  // Tab switchers.
  E.btns.clacSwtchr.onclick = () => { switchTab('calculate') };
  E.btns.configSwtchr.onclick = () => { switchTab('configuration') };
  // Taskbar buttons:
  E.btns.start.onclick = () => { startMenu('open') };
  E.btns.calculator.onclick = () => { windowManager('open') };
  // Start menu list items for themes:
  E.startMenu.items.forEach (item => {
    item.onclick = () => { setTheme(event) };
  });
  // For time display.
  setInterval(displayTime, 1000);
});