'use strict';

let adv = document.querySelector('.adv');
let books = document.querySelector('.books');
let book1 = document.querySelectorAll('.book')[0];
let book2 = document.querySelectorAll('.book')[1];
let book3 = document.querySelectorAll('.book')[2];
let book4 = document.querySelectorAll('.book')[3];
let book5 = document.querySelectorAll('.book')[4];
let book6 = document.querySelectorAll('.book')[5];

let hrefBook = book5.querySelector('a');

let ulBook1 = book1.querySelectorAll('li');
let ulBook2 = book6.querySelectorAll('li');

let ulBook3 =  book3.querySelectorAll('li');


////// Восстановить порядок книг.
books.prepend(book2);
books.append(book3);
book5.after(book4);


//////Заменить картинку заднего фона на другую из папки image
document.body.style = 'background-image: url("image/you-dont-know-js.jpg")';

/////Исправить заголовок в книге 3
hrefBook.textContent = 'Книга 3. this и Прототипы Объектов';

/////Удалить рекламу со страницы
adv.remove();


///Восстановить порядок глав во второй и пятой книге

ulBook1[10].before(ulBook1[2]);
ulBook1[9].before(ulBook1[7]);
ulBook1[3].after(ulBook1[6]);
ulBook1[6].after(ulBook1[8]);


ulBook2[1].after(ulBook2[9]);
ulBook2[9].after(ulBook2[3]);
ulBook2[3].after(ulBook2[4]);
ulBook2[8].before(ulBook2[5]);

////в шестой книге добавить главу

let li = document.createElement('li');
li.textContent  = 'Глава 8: За пределами ES6';

ulBook3[9].before(li);
