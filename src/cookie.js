/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function create(name, value) {

    let tr = document.createElement('tr')

    tr.innerHTML = '<td>' + name + '</td><td>' + value + '</td><td><button id = "delButton">Удалить</button></td>'

    return tr

}

function get() {
    if (!document.cookie)
        return

    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value
            return obj
        }, {});
}

function write() {
    let cookies = get(),
        cookie
    if (filterNameInput.value === '') {
        while (listTable.firstChild)
            listTable.removeChild(listTable.firstChild)
        for (cookie in cookies)
            listTable.appendChild(create(cookie, cookies[cookie]))
    }
}

function corresponds(full, fragment) {
    full = full.toLowerCase()
    fragment = fragment.toLowerCase()

    return full.indexOf(fragment) !== -1;
}

function filter() {
    let cookies = get(),
        cookie;
    if (filterNameInput.value !== '') {
        while (listTable.firstChild)
            listTable.removeChild(listTable.firstChild)
        for (cookie in cookies)
            if (corresponds(cookie, filterNameInput.value) || corresponds(cookies[cookie], filterNameInput.value))
                listTable.appendChild(create(cookie, cookies[cookie]))
    } else
        write()
}

write()

filterNameInput.addEventListener('keyup', filter)

addButton.addEventListener('click', () => {
    document.cookie = addNameInput.value + '=' + addValueInput.value
    filter();
    //addValueInput.value = ''
    //addNameInput.value = ''
});

listTable.addEventListener('click', () => {

    if (event.target.nodeName === 'BUTTON') {

        let tr = event.target.parentNode.parentNode

        document.cookie = event.target.parentNode.parentNode.firstChild.innerText + '=; expires=' + new Date(0)

        tr.remove()
    }

});