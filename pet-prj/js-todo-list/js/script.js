//"use strict";

function job_todo(settings) {
    var maintodo = document.getElementById(settings.formId);

    console.info(maintodo);

    maintodo.addEventListener("submit", function(event) {

        console.info("submit");
        console.info(event.target);
 
        event.preventDefault();
        //b-task
        if (event.target.tagName.toLowerCase() === "input") {
           console.info("submit task");
        }

    }, true);


    maintodo.addEventListener("focus", function(event) {
        console.info("focus");
        console.info(event.target);        
    });





}