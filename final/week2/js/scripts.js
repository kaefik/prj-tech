function startgame() {

    var pole = document.querySelector(".main");

    var cells = document.querySelectorAll(".cell > .back");

    console.info(cells);

    //console.info(pole);

    function getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    function isWin() { // возвращет true - если поле открыто полностью  
        var allCells = Array.from(document.querySelectorAll(".cell"));
        //console.info(allCells);
        //var backCell = allCells[ii].querySelector(".back");
        for(var ii=0; ii<allCells.length; ii++) {
            if (!allCells[ii].querySelector(".back").classList.contains("backgreen")) {
                return false;
            }
        }
        return true;
    }
    
    
    var igra = {  
        pole: Array(), // игровое поле
        imoji: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻'],
        para: Array(2), // открытие пары
        createEmpty: function() {    // создание пустого поля
            this.clearParaStep();
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
        getPole: function(coord) {
            var realcoord =  this.getRealCoord(coord);
            return this.pole[realcoord.numRow][realcoord.numColumn];
        },
        print: function() {   // вывод в консоль для тестирования
            for(var i=0; i<3; i++) {
                var ss="";
                for(var j=0; j<4; j++) {
                    ss = ss + this.pole[i][j]+" ";
                }
                console.info(ss);
            }
        },
        setParaStep: function(step) { // устанавливаем пару для хода: возвращает true - если удачно записал ход, иначе false
            if (this.para[0] == -1) {
                this.para[0] = step;
                return true;
            }
            if (this.para[1] == -1) {
                this.para[1] = step;
                return true;
            }
            return false
        },
        clearParaStep: function() { // очистить переменную this.para
            this.para = Array(2);
            this.para= [-1, -1];
        },
        isNormHod: function() {  // возращает true - если две ячейки из this.para равны по содержимому
            // undefined - если ход неполный , т.е. нет одного из шагов
            if(!this.isFullHod()){
                return undefined;
            }
            if (this.getPole(this.para[0])=== this.getPole(this.para[1])) {
                return true;
            }
            return false;
        },
        isFullHod: function() {  // true - если ход полный, то есть открыты две карточки
            if ((this.para[0] === -1) || (this.para[1] === -1)) {
                return false;
            }
            return true;
        }
    };

    igra.random();


    for(var ii=0; ii < cells.length; ii++) {
        //console.info(cells[ii]);
        //console.info(igra.getPole(ii+1));
        cells[ii].innerHTML = igra.getPole(ii+1);
    }

    igra.print();






    pole.addEventListener("click", function(event) {
        event.preventDefault();
    
        var parentNode = event.target.parentNode;
        
        //console.info(parentNode.classList);

        /*проверяем кликнули ли на ячейку*/
        if (parentNode.classList.contains("cell")) {
            var allDivs = Array.from(parentNode.querySelectorAll("div"));

            allDivs.forEach(element => {
                var num_cell = parseInt(element.parentNode.getAttribute('id').split("-")[1]);
                console.info("num_cell = ", num_cell);

                if (element.classList.contains("front")) {
                    if (element.classList.contains("fronton")) {
                        //element.classList.remove("fronton");
                        
                        console.info("fronton remove : igra.para = ", igra.para);

                    } else {
                        element.classList.add("fronton");    
                        
                        //igra.setParaStep(num_cell);
                        console.info("fronton add : igra.para = ", igra.para);
                    }                
                }

               
                    if (element.classList.contains("back")) {
                        if (element.classList.contains("backon")) {
                            if(!(element.classList.contains("backgreen") || element.classList.contains("backred") )) { // не переворачивать если поле зеленое или красное
                                //element.classList.remove("backon");

                                console.info("backon remove : igra.para = ", igra.para);

                                //igra.setParaStep(num_cell);
                            }
                        } else {                            
                            element.classList.add("backon");

                            console.info("backon add : igra.para = ", igra.para);

                            if(igra.isFullHod()) {
                                // закрыть карточки предыдущего хода
                                console.info("закрыть карточки предыдущего хода");
                                var allCells = document.querySelectorAll(".cell");
                                console.info(allCells[igra.para[0]-1]);
                                var backCell = allCells[igra.para[0]-1].querySelector(".back");
                                var frontCell = allCells[igra.para[0]-1].querySelector(".front");
                                console.info("back1 = ", backCell);
                                console.info("front1 = ", frontCell);
                                backCell.classList.remove("backon");
                                backCell.classList.remove("backred");
                                frontCell.classList.remove("fronton");
                                var backCell = allCells[igra.para[1]-1].querySelector(".back");
                                var frontCell = allCells[igra.para[1]-1].querySelector(".front");
                                backCell.classList.remove("backon");
                                backCell.classList.remove("backred");
                                frontCell.classList.remove("fronton");
                                igra.clearParaStep();
                            }
                            
                            igra.setParaStep(num_cell);

                            var hod = igra.isNormHod();
                            if (hod!=undefined) {
                                if (hod===true) {
                                    // содержимое карточек совпали, закрасить зеленым цветом и оставить открытыми
                                    var allCells = document.querySelectorAll(".cell");
                                    console.info(allCells[igra.para[0]-1]);
                                    var backCell = allCells[igra.para[0]-1].querySelector(".back");
                                    console.info("back1 = ", backCell);
                                    console.info("front1 = ", frontCell);
                                    backCell.classList.add("backgreen");
                                    backCell.classList.remove("backred");
                                    var backCell = allCells[igra.para[1]-1].querySelector(".back");
                                    backCell.classList.add("backgreen");
                                    backCell.classList.remove("backred");

                                    igra.clearParaStep();
                                } else {
                                    // содержимое карточек НЕ совпали, закрасить красным цветоми оставить открытыми до следующего хода
                                    var allCells = document.querySelectorAll(".cell");
                                    console.info(allCells[igra.para[0]-1]);
                                    var backCell = allCells[igra.para[0]-1].querySelector(".back");
                                    console.info("back1 = ", backCell);
                                    console.info("front1 = ", frontCell);
                                    backCell.classList.add("backred");
                                    var backCell = allCells[igra.para[1]-1].querySelector(".back");
                                    backCell.classList.add("backred");
                                }

                            }

                        }
                    }
                    console.info("igra.para = ", igra.para)
              
            });
        }        
    }, true);

}