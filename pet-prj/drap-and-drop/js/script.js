
function startDragAndDrop() {
    var elMainBlock = document.querySelector(".main-list");
    console.log(elMainBlock.getBoundingClientRect());
    var coordMainBlock = elMainBlock.getBoundingClientRect();

    var elTask = document.querySelector(".task");

    /* координаты области которую нельзя покидать */
    maxY = coordMainBlock.top + coordMainBlock.height; /* top */
    minY = coordMainBlock.top;

    maxX = coordMainBlock.left + coordMainBlock.width; /* left */
    minX = coordMainBlock.left;

    console.log("minY max Y = ", minY, maxY);
    console.log("minX max X = ", minX, maxX);

    elTask.onmousedown = function(e) {

        var coords = getCoords(elTask);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        elTask.style.position = 'absolute';
        document.body.appendChild(elTask);
        moveAt(e);

        elTask.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            console.info("e.pageX = ", e.pageX);
            console.info("shiftX = ", shiftX);
            console.info("e.pageY = ", e.pageY);
            console.info("shiftY = ", shiftY);
            console.info("");

            if ((e.pageX >=minX) && (e.pageX<=maxX)) {
                elTask.style.left = e.pageX - shiftX + 'px';
            }
            
            //elTask.style.left = e.pageX - shiftX + 'px';

            if ((e.pageY - shiftY>=minY) && (e.pageY - shiftY<=maxY)) {
                elTask.style.top = e.pageY - shiftY + 'px';
            }

            //elTask.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        elTask.onmouseup = function() {
            document.onmousemove = null;
            elTask.onmouseup = null;
        };

    }

    /* 
       потому, что браузер имеет свой собственный Drag’n’Drop, 
       который автоматически запускается и вступает в конфликт с нашим.
        Это происходит именно для картинок и некоторых других элементов.
        Его нужно отключить:
    */
    elTask.ondragstart = function() {
    return false;
    };

    function getCoords(elem) {   // кроме IE8-
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }


}