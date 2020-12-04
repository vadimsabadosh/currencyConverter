'use strict';

let start = document.getElementById('start'); // кнопка расчитать
let incomeAdd = document.getElementsByTagName('button')[0]; // Доп доход
let expensesAdd = document.getElementsByTagName('button')[1]; // доп расход
let depositCheck = document.querySelector('#deposit-check'); //Проверка на депозит
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //Поля для ввода возможных доходов

let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value'); // Дневной бюджет
let expensesMonthValue = document.querySelector('.expenses_month-value'); //Расход за месяц
let additionalIncomeValue = document.querySelector('.additional_income-value'); // Возможные доходы
let additionalExpensesValue = document.querySelector('.additional_expenses-value'); // Возможные расходы
let incomePeriodValue = document.querySelector('.income_period-value'); // Накопления за период
let targetMonthValue = document.querySelector('.target_month-value'); // Срок достижения цели в месяцах

let salaryAmount = document.querySelector('.salary-amount'); // Месячный доход
let incomeTitle = document.querySelector('.income-title'); // Название (Дополнительный доход)
let incomeAmount = document.querySelector('.income-amount'); // Сумма (Дополнительный доход)
let expensesTitle = document.querySelector('.expenses-title'); // Название (Обязательные расходы)
let incomeItems = document.querySelectorAll('.income-items');

let expensesItems = document.querySelectorAll('.expenses-items'); // Сумма (Обязательные расходы) 
let additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
let targetAmount = document.querySelector('.target-amount'); // Цель
let periodSelect = document.querySelector('.period-select'); // Период расчета
let periodAmount = document.querySelector('.period-amount');

let depositAmount = document.querySelector('.deposit-amount'); // Сумма зепозита
let depositPercent = document.querySelector('.deposit-percent'); // Процент депозита
let depositBank = document.querySelector('.deposit-bank'); // Банк с депозитом




let isNumber = function(n) {  
    return !isNaN(parseFloat(n)) && isFinite(n);
}



let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth:0,
    
    start: function() { 
                    appData.budget = +salaryAmount.value;
                    appData.getExpenses();
                    appData.getIncome();
                    // appData.asking();
                    //appData.getInfoDeposit();
                    appData.getExpensesMonth();
                    //appData.getTargetMonth();
                    //appData.getStatusIncome();
                    appData.getAddExpenses();
                    appData.getAddIncome();
                    appData.getBudget();
                    appData.showResult();
                    
    },
    showResult:function () {  
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        periodSelect.addEventListener('input', function () {  
            incomePeriodValue.value = appData.calcSavedMoney();
        });
        
    },
    addExpensesBlock: function () {  
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let childrenElems = cloneExpensesItem.children;
        for (let i=0, child; child=childrenElems[i]; i++) {
            child.value = '';
        }
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesAdd.style = 'display:none';
        }
    },
    addIncomeBlock:function () {  
        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        let childrenElems = cloneIncomeItem.children;
        for (let i=0, child; child=childrenElems[i]; i++) {
            child.value = '';
        }
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomeAdd.style = 'display:none';
        }
    },
    getExpenses: function () {  
        expensesItems.forEach(function (item) {  
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function () {  
        incomeItems.forEach(function (item) {  
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function () {  
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () {  
        additionalIncomeItem.forEach(function (item) {  
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    showPeriod: function(){
        
        return periodAmount.textContent = periodSelect.value;
        
    },
    asking: function(){

        if(confirm('Есть ли у вас дополнительный зароботок?')){
            let cashIncome, itemIncome;
            
            do{
                itemIncome = prompt('Какой у вас есть дополнительный зароботок?');
            }while(isNumber(itemIncome) || itemIncome.trim() === '');

            while(!isNumber(cashIncome)){
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            };
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses; 
            do{
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
                
            } while(isNumber(addExpenses) || addExpenses.trim() === '');
            
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
            
    },
    getExpensesMonth: function () {  
        let sum = 0;
        for (let key in appData.expenses){
            
            sum += appData.expenses[key];
        }
        appData.expensesMonth = +sum;
        return sum;
    },
    getBudget: function () { 
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getStatusIncome: function () { 
        if(appData.budgetDay >= 1200){
            console.log('У вас высокий уровень дохода');
        
        }else if(appData.budgetDay >= 600 && appData.budgetDay < 1200){
            console.log('У вас средний уровень дохода');
        }else if(appData.budgetDay >= 0 && appData.budgetDay < 600){
            console.log('У вас низкий уровень дохода');
        }else if(appData.budgetDay < 0){
            console.log('Что-то пошло не так');
        }
    },
    getTargetMonth: function(){
        
        return  Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getInfoDeposit: function () {  
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой процент на депозите?', 10);
            }while(!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function () {  
        return appData.budgetMonth * periodSelect.value;
    }
};

start.disabled = true;
salaryAmount.addEventListener('input', () => {
    if(salaryAmount.value !== ''){
        start.disabled = false;
        
    }else{
        start.disabled = true;
    }
    
});
// if(salaryAmount.value === ''){
//     start.disabled = true;
    
// }else if(salaryAmount.value !== ''){
//     start.disabled = false;
    
// }

start.addEventListener('click', appData.start);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.showPeriod)

document.addEventListener('input', function(){

    let allNames = document.querySelectorAll('[placeholder="Наименование"]');
    let allSum = document.querySelectorAll('[placeholder="Сумма"]');
    for(let i = 0; i<allNames.length; i++){
        allNames[i].value =  allNames[i].value.replace(/[^А-Яа-яЁё .,]/g, '');
    };
    for(let i = 0; i<allSum.length; i++){
        allSum[i].value =  allSum[i].value.replace(/[^+\d]/g, '');
    }
    
});


