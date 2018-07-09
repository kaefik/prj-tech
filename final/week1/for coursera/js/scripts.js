function startgame() {

    var pole = document.querySelector(".main");

    //console.info(pole);

    pole.addEventListener("click", function(event) {
        event.preventDefault();
    
        var parentNode = event.target.parentNode;
        
        //console.info(parentNode.classList);

        /*проверяем кликнули ли на ячейку*/
        if (parentNode.classList.contains("cell")) {
            var allDivs = Array.from(parentNode.querySelectorAll("div"));

            allDivs.forEach(element => {
                if (element.classList.contains("front")) {
                    if (element.classList.contains("fronton")) {
                        element.classList.remove("fronton");
                    } else {
                        element.classList.add("fronton");
                    }                
                }

                if (element.classList.contains("back")) {
                    if (element.classList.contains("backon")) {
                        element.classList.remove("backon");
                    } else {
                        element.classList.add("backon");
                    }
                }
            });
        }        
    }, true);

}