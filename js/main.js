'use strict';
const DomElement = function (selector, height, width, bg, fontSize, text) {  
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
};


DomElement.prototype.createElement = function () {  
    let check = this.selector.charAt(0);
    if(check === '.'){
        let div = document.createElement('div');
        div.classList.add(this.selector.split('.')[1]);
        div.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}`;
        div.textContent = this.text;
        document.body.after(div);
    }
    if(check === '#'){
        let p = document.createElement('p');
        p.setAttribute('id', this.selector.split('#')[1]);
        p.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}`;
        p.textContent = this.text;
        document.body.after(p);
    }
};




const domElement = new DomElement('.selector', '200px', '100px', 'red', '16px', 'Любой текст');

domElement.createElement();