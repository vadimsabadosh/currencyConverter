'use strict';


let colorTitle = document.querySelector('.color-title');
let btnChangeColor = document.querySelector('.change-color');

function changeColor() {  
    let body = document.body;
    let r, g, b, color;

    r = Math.floor(Math.random() * (256));
    g = Math.floor(Math.random() * (256));
    b = Math.floor(Math.random() * (256));
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    body.style.backgroundColor = color;
    colorTitle.textContent = color;
    btnChangeColor.style.color = color;
}

btnChangeColor.addEventListener('click', changeColor);