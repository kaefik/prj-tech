var txt = "ривет как sdfgssfd";

function isNumber(el) {
    var regNumber = /^[0-9]+$/;
    return regNumber.test(el);
}

function isChar(el) {
    var regChar = /^[а-яА-ЯёЁa-zA-Z]+$/;
    return regChar.test(el);
}


console.info(isNumber("154545645 5"));

console.info(isNumber("a"));
console.info("");

console.info(isChar(txt));

console.info(isChar("привет Я"));

console.info(isChar("156 a"));