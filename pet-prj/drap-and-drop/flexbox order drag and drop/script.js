$(function() {
    
    var elMainBlock = document.querySelector(".container");
    var coordMainBlock = elMainBlock.getBoundingClientRect();

    /* координаты области которую нельзя покидать */
    maxY = coordMainBlock.top + coordMainBlock.height; /* top */
    minY = coordMainBlock.top;

    maxX = coordMainBlock.left + coordMainBlock.width; /* left */
    minX = coordMainBlock.left;


    console.log("minY maxY = ", minY, maxY);
    console.log("minX maxX = ", minX, maxX);

    $(".item").draggable({

      // В начале перетаскивания
      start : function (event , ui){
        var target = document.getElementById(this.id);
        target.style.zIndex=100;
      },

      drag : function (event , ui){
        console.dir(ui);
        var offsetXPos = parseInt( ui.offset.left );
        var offsetYPos = parseInt( ui.offset.top );

        console.log(offsetXPos, offsetYPos);


        /* TODO: как сделать чтобы перемещение при захвате элемента не ваыходило за заданную область */
        if (offsetXPos < minX) {
            ui.offset.left  = minX;
            console.info("set offsetXPos < minX");
        }

        if (offsetXPos > maxX) {
            console.info(typeof ui.offset.left);
            ui.offset.left  = maxX;
            console.info("set offsetXPos > maxX");
            console.info(typeof ui.offset.left);
        }

          
      },

      // В конце перетаскивания
      stop : function (event , ui){
        // console.log(event , ui);

        var nowPosition = new Object();
        var newPosition = new Array();

        // Получить текущую позицию
        for (var i = 1; i < 6; i++) {
            var positionData = getPosition(i);
            nowPosition = {'name':'item'+i,'position':positionData};

            newPosition.push(nowPosition);
        }

        // сортировать
        newPosition.sort(function(a,b){
                if( a['position'] > b['position'] ) return -1;
                if( a['position'] < b['position'] ) return 1;
                return 0;
        });

        // Order Вставить
        var number = 0;
        for (var i = newPosition.length; i--; ) {
            console.log(newPosition[i].name);

            var tmpItem = document.getElementById(newPosition[i].name);
            tmpItem.style.order = number;
            tmpItem.style.left = 0;
            tmpItem.style.top = 0;

            number ++;
        }

    // Наконец, восстановим z-index
    var target = document.getElementById(this.id);
    target.style.zIndex=0;
    }

    });

    // Функция для получения позиции
    function getPosition(item){
      var tmpItem = document.getElementById('item'+item);
      // console.dir(tmpItem);
      return tmpItem.offsetLeft;
    }
});