
var assert = require('assert');


/**
 * @param {Function[]} operations
 * @param {Function} callback
 */



ff = function (operations, callback) {
    if (operations.length==0) {
        return callback(null, []);
    }

    var result = [];
    var errors =[];

    var count = operations.length;
    var ferr = false;

    //console.info(operations);

    for (var index = 0; index < operations.length; index++) {
        var operation = operations[index];
        //console.info("i = ", index);
        
        foper = function (i) {
            next = function (err, data) {
                count--;
                //console.info("count = ", count);
                if (err == null) {
                    result[i] = data;
                    if (count == 0) {
                        if (ferr) {

                        } else {
                            callback(null, result);   
                        }
                    } 
                } else {
                    ferr = true;
                    callback(err, null);
                    return;                   
                }
            }
            var oper = operations[i];
            oper(next);
        }

        foper(index);
    }
};

module.exports = ff;
/*
out = function(errors, result) {
    console.info("error = ", errors);
    console.info("result = ", result);
    console.info("");
}



ff(      [
    // Операция, которая выполняется 500ms
    function (next) {
        setTimeout(function () {
            next(null, '500ms');
        }, 500);

    },

    // Операция, которая выполняется 50ms
    function (next) {
        setTimeout(function () {
            next(null, '50ms');
        }, 50);
    },

    // Операция, которая выполняется 200ms
    function (next) {
        setTimeout(function () {
            next(null, '200ms');
        }, 200);
    }
],

    // Обработка результата выполнения операций (результирующий callback)
    out
);


// Пример, когда одна из операций завершается ошибкой
ff(
    [
        // Операция, которая выполняется 500ms
        function (next) {
            setTimeout(function () {
                next(null, '500ms');
            }, 500);
        },

        // Операция, которая завершается с ошибкой через 10ms
        function (next) {
            setTimeout(function () {
                next('ERROR');
            }, 10);
        },

        // Операция, которая выполняется 200ms
        function (next) {
            setTimeout(function () {
                next(null, '200ms');
            }, 200);
        }
    ],
    out
);
*/