/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let index = 0; index < array.length; index++) {
        fn(array[index], index, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

    var myarray = []

    for (let index = 0; index < array.length; index++) {
        myarray.push(fn(array[index], index, array))
    }

    return myarray

}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {

    var prevValue = initial || array[0],
        i = initial ? 0 : 1

    for (; i < array.length; i++) {
        prevValue = fn(prevValue, array[i], i, array)
    }

    return prevValue

}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var myarray = []

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            myarray.push(key.toUpperCase())
        }
    }

    return myarray
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    var handler = {
        set: function(target, prop, value) {
            return target[prop] = Math.pow(value, 2)
        }
    }

    return obj = new Proxy({}, handler)

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};