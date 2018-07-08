function startgame() {

    var pole = document.querySelector(".main");

    //console.info(pole);

    pole.addEventListener("click", function(event) {
        event.preventDefault();

        var cells = pole.querySelectorAll(".cell");
        cells_arr = Array.from(cells);

        //console.info(cells_arr);
        //console.info(event.target.classList.contains("cell"));

        if (event.target.classList.contains("cell")) {
            if (event.target.classList.contains("cellon")) {
                event.target.classList.add("celloff");
                event.target.classList.remove("cellon");
            } else {
                event.target.classList.add("cellon");
                event.target.classList.remove("celloff");
            }
        }

    }, true);


}