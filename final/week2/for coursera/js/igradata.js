

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}


var igra = {
    pole: Array(), // игровое поле
    imoji: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻'],
    createEmpty: function() {    // создание пустого поля
        this.pole = Array(3);
        for(var i=0; i<3; i++) {
            this.pole[i] = ["", "", "", ""];
        }
    },
    random: function() {   // генерация поля случайным образом
        this.createEmpty();
        var num = getRandomNumber(1,13);
        for(var ch=0; ch<12; ch++) {
            while(!this.isEmpty(num)) {
                //console.info(num);
                num = getRandomNumber(1,13);
            }
            this.setCoord(num, this.imoji[ch]);
            num = getRandomNumber(1,13);
            
        }

    },
    setCoord: function(coord, txt) {  // coord - число от 1 до 12 которое соответствует 
        var realcoord =  this.getRealCoord(coord);
        this.pole[realcoord.numRow][realcoord.numColumn] = txt;

    },
    getRealCoord: function(coord) {
        var numRow = -1;
        var numColumn = -1;

        if((coord>=1) && (coord<=4)) {
            numRow = 0;
            numColumn = coord-1;
        }
        if((coord>=5) && (coord<=8)) {
            numRow = 1;
            numColumn = (coord - 4) - 1;
        }
        if((coord>=9) && (coord<=12)){
            numRow = 2;
            numColumn = (coord - 8) -1;
        }
        return {'numRow':numRow, 'numColumn': numColumn};
    },
    isEmpty: function(coord) { // проверяет поле является ли пустым. пустое поле это ""
        var realcoord =  this.getRealCoord(coord);
        //console.info(realcoord);

        if (this.pole[realcoord.numRow][realcoord.numColumn]==="") {
            return true;
        } else {
            return false;
        }
    }, 
    print: function() {   // вывод в консоль для тестирования
        for(var i=0; i<3; i++) {
            var ss="";
            for(var j=0; j<4; j++) {
                ss = ss + this.pole[i][j]+" ";
            }
            console.info(ss);
        }
    }

}

igra.random();

igra.print();


