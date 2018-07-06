
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

    next = function (err, data) {
        if (err == null) {
            result.push(data);
            callback(null, result);
        }
        return err;
    }

    operations(next);
};

module.exports = ff;

out = function(errors, result) {
    console.info("error = ", errors);
    console.info("result = ", result);
    console.info("");
}


//console.info(ff([], out));


ff(     // Операция, которая выполняется 500ms
        function (next) {
            setTimeout(function () {
                next(null, '500ms');
            }, 500);
        }, 
    // Обработка результата выполнения операций (результирующий callback)
    out
);