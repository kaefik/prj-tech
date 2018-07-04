module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection(param) {
    if (param === undefined ) {
        this.arr = Array(0);    
    } else {
        this.arr = param;
    }
    
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.arr;
};

Collection.prototype.count =  function () {
    return this.arr.length;
};

Collection.prototype.at =  function (num) {
    if (num<=0 || num >this.count()) {
        return null;
    } 

    num = num-1;
    return this.arr[num];

};

// другие методы


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (param) {
        return new Collection(param);
};


var numbers = new Collection();
console.info(numbers);
console.info(numbers.count());


/*
var numbers2 = Collection.from(['a', 'b', 'c']);;
console.info(numbers2);
console.info(numbers2.arr);

console.info( numbers2 instanceof Collection);
console.info(numbers2.count());

console.info(numbers2.values());
*/

var letters = Collection.from(['a', 'b']);

console.info(letters);

console.info(letters.at(0)); // null
console.info(letters.at(1)); // 'a'
console.info(letters.at(2)); // 'b'
console.info(letters.at(3)); // null