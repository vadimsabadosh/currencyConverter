document.addEventListener('DOMContentLoaded', function() {

    const inputCurr = document.querySelectorAll('.curr-input');
    const labelUSD = document.querySelector('label[for="USD"]').textContent;
    const labelEUR = document.querySelector('label[for="EUR"]').textContent;
    const dateText = document.querySelector('.date');

    const firstInput = document.querySelector('.first-input');
    const firstInputText = document.querySelector('.first-input-text');
    const firstResult = document.querySelector('.first-result');
    
    const secondInput = document.querySelector('.second-input');
    const secondInputText = document.querySelector('.second-input-text');
    const secondResult = document.querySelector('.second-result');
    
    let currency = 'USD';
    firstInput.value = 1;
    secondInput.value = 1;

    /////////FETCH
    const postData = (curr = 'USD') => fetch(`https://api.exchangeratesapi.io/latest?base=${curr}`);
    postData()
        .then(response => {
            return response.json()
        })
        .then(response => changeCurr(response))
        .catch(error => console.log(error));
 ///////////FETCH


    inputCurr.forEach(item => {
        
        item.addEventListener('change', () => {
            
            if(item.checked){
                currency = item.value;
            }
            if(currency === 'USD'){
                firstInputText.textContent = labelUSD;
                secondInputText.textContent = labelUSD;
            }else if(currency === 'EUR'){
                firstInputText.textContent = labelEUR;
                secondInputText.textContent = labelEUR;
            }
            postData(currency)
            .then(response => {
                return response.json()
            })
            .then(response => changeCurr(response))
            .catch(error => console.log(error));
        })
        
        
    });
    
    const changeCurr = (data) => {
        const {rates, date} = data;
        dateText.textContent = date;
        const first = () => {
            let res = firstInput.value * rates['RUB'];
            firstResult.value = res.toFixed(2);
        }
        first()

        const second = () => {
            let res = secondInput.value / rates['RUB'];
            secondResult.value = res.toFixed(2);
        }
        second();
                
        firstInput.addEventListener('input', () => {
            first();
        });
        secondInput.addEventListener('input', () => {
            second();
        });
        

    }













/////////FETCH
//     const postData = () => fetch('https://api.exchangeratesapi.io/latest?base=RUB');
//     postData()
//         .then(response => {
//             return response.json()
//         })
//         .then(response => getCalc(response))
//         .catch(error => console.log(error));
// ///////////FETCH

//     const firstInput = document.querySelector('.first-input');
//     const firstSelect = document.querySelector('.first-select');
//     const result = document.querySelector('.result');


//     const secondInput = document.querySelector('.second-input');
//     const secondSelect = document.querySelector('.second-select');
//     const result2 = document.querySelector('.result2');


//     const dateText = document.querySelector('.date');


//     firstInput.addEventListener('input', () => firstHandle());
//     secondInput.addEventListener('input', () => secondHandle());

//     firstSelect.addEventListener('change', () => firstHandle());
//     secondSelect.addEventListener('change', () => secondHandle());

//     const firstHandle = () => {
//         const value = firstInput.value;
//         const currency = firstSelect.options[firstSelect.selectedIndex].dataset.currency;
//         result.value = value * currency;
//     }
//     const secondHandle = () => {
//         const value = secondInput.value;
//         const currency = secondSelect.options[secondSelect.selectedIndex].dataset.currency;
//         result2.value = value * currency;
//     }
//     const handleInput = () => {
//         firstInput.value = 1;
//         secondInput.value = 1;
//         firstHandle();
//     };

//     const getCalc = (data) => {
//         const {rates, date} = data;
//         dateText.textContent = date;


//         for(let key in rates){
//             const option = document.createElement('option');
//             const option2 = document.createElement('option');
            
//             option.innerHTML = key;
//             option.dataset.currency = rates[key];
//             if(key === 'USD'){
//                 option.selected = true;
//             }
            
//             option2.innerHTML = key;
//             option2.dataset.currency = rates[key];
//             if(key === 'RUB'){
//                 option2.selected = true;
//             }

//             firstSelect.append(option);
// 		    secondSelect.append(option2);

//         };
//         handleInput();
            
        
        
//     };

});


