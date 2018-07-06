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

Collection.prototype.append =  function (vals) {
    if (typeof(vals)!="object") {
        this.arr.push(vals);
    } else {
        var array = vals.values();
        for (var index = 0; index < array.length; index++) {
            this.arr.push(array[index]);            
        }
    }
};


Collection.prototype.removeAt =  function (num) {
    if (this.at(num) == null) {
        return false;
    }

    this.arr.splice(num-1, 1);
    return true;
}

// другие методы


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (param) {
        return new Collection(param);
};