'use strict';




// Код валидации формы

function validateForm(settings) {
    /*
    {
    formId: 'profile',   // идентификатор формы
    formValidClass: 'form_valid',  // класс, добавляемый форме в случае пройденной проверки
    formInvalidClass: 'form_invalid',  // класс, добавляемый форме в случае ошибок
    inputErrorClass: 'input_error' // класс, добавляемый элементам input в случае ошибочного заполнения
}
    */

   function isNumber(el) {
        var regNumber = /^[0-9]+$/;
        return regNumber.test(el);
    }

    function isChar(el) {
        var regChar = /^[а-яА-ЯёЁa-zA-Z]+$/;
        return regChar.test(el);
    }
   
    var form = document.getElementById(settings.formId);

    form.addEventListener("focus", function(event) {

        // console.info("blur");
         //console.info(event.target.tagName);
 
         event.preventDefault();
         if (event.target.tagName.toLowerCase() === "input") {
            event.target.classList.remove(settings.inputErrorClass);
         }

    }, true);


    // При потере фокуса (blur) элемента input вызывается проверка для этого элемента.
    form.addEventListener("blur", function(event) {

       // console.info("blur");
        //console.info(event.target.tagName);

        event.preventDefault();

        if (event.target.tagName.toLowerCase() === "input") {
            //event.target.classList.add(settings.inputErrorClass);
            //console.info(event.target.classList);

            console.info(event.target.dataset);


            if (event.target.dataset.hasOwnProperty("validator")) {
                if (event.target.dataset["validator"] == "letters") {
                    //console.info("проверка на letters");
                    if(!isChar(event.target.value)) {
                        event.target.classList.add(settings.inputErrorClass);
                    }
                }

                if (event.target.dataset["validator"] == "number") {
                    //console.info("проверка на number");
                    if(!isNumber(event.target.value)) {
                        event.target.classList.add(settings.inputErrorClass);
                    } else {
                        if (event.target.dataset.hasOwnProperty("validatorMin")) {
                            if(Number(event.target.value) < event.target.dataset["validatorMin"]) {
                                event.target.classList.add(settings.inputErrorClass);
                            }
                        }
                        if (event.target.dataset.hasOwnProperty("validatorMax")) {
                            if(Number(event.target.value) > event.target.dataset["validatorMax"]) {
                                event.target.classList.add(settings.inputErrorClass);
                            }
                        }
                    }
                }

                if (event.target.dataset["validator"] == "regexp") {
                    //console.info("проверка на regexp");
                    var regEl = new RegExp(event.target.dataset["validatorPattern"]);
                    if (!regEl.test(event.target.value)) {
                        event.target.classList.add(settings.inputErrorClass);
                    }
                }
            }
        }
    }, true);

    // При отправке формы (submit) проверяются все элементы. 
    // Обратите внимание, что форму можно отправить несколькими способами: 
    // нажатием enter на элементе input и кликом.
    form.addEventListener("submit", function(event) {
         event.preventDefault();
         if (event.target.tagName.toLowerCase() === "form") {
             // проверка всех элементов формы

             //event.target.classList.add(settings.formInvalidClass);
             
            var inputs = form.querySelector("."+settings.inputErrorClass);
            //console.info(event.target.classList);
            //console.info(inputs);
            if(inputs ==null) {
                event.target.classList.remove(settings.formInvalidClass);
                event.target.classList.add(settings.formValidClass);
            } else {
                event.target.classList.add(settings.formInvalidClass);
                event.target.classList.remove(settings.formValidClass);
            }
            
            var requreInput = form.querySelector("[data-required]");
            console.info("req = ", requreInput);
            console.info(requreInput.value);
            if (requreInput.value == "") {
                event.target.classList.add(settings.formInvalidClass);
                event.target.classList.remove(settings.formValidClass);
            }

         } 
     }, true);

}