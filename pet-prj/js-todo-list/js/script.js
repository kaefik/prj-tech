//"use strict";

var tasks= {
    task: Array(),  // массив данных типа {done: True, name: "первая задача"}
    clearAll: function() {  // удаление всех задач
        this.task = Array();
    },
    clearCompleted: function() {  // удаление выполненных задач
        //words.filter(word => word.length > 6);
        this.task = this.task.filter(iTask => !iTask.done);
    }
} 

/* создать все задачи */
function create_all_task(tasks, listTask){
    for (var index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        var div =create_one_task(element, index);
        listTask.appendChild(div);
    }
}

/* фильтр активных задач */
function create_active_task(tasks, listTask){
    for (var index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        if (!element.done) {
            var div =create_one_task(element, index);
            listTask.appendChild(div);    
        }
    }
}

/* фильтр выполненных задач */
function create_completed_task(tasks, listTask){
    for (var index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        if (element.done) {
            var div =create_one_task(element, index);
            listTask.appendChild(div);    
        }
    }
}


/* создать одну задачу  */
function create_one_task(task, idNumTask) {
    /* 
        task - задача,
        idNumTask  - уникальный id для чекбокса
     */

    /*
        <div class="b-task">
            <input type="checkbox" id="chk-task">
                <label for="chk-task">первая задача</label>
                <div>x</div>
        </div>
    */

    var div = document.createElement("div");
    div.classList.add("b-task");

    var div_close = document.createElement("div");
    div_close.innerHTML = "x";

    var name_task = document.createElement("label");
    name_task.setAttribute("for", idNumTask);
    name_task.innerHTML = task.name;

    var done_task = document.createElement("input");
    done_task.setAttribute("type", "checkbox");
    done_task.setAttribute("id", idNumTask);
    done_task.checked = task.done;

    div.appendChild(done_task);
    div.appendChild(name_task);
    div.appendChild(div_close);
    return div;
}

function onBListsTaskFooter() {
    console.info(document.querySelector(".b-lists-task__footer").classList);
    document.querySelector(".b-lists-task__footer").classList.remove("b-lists-task__footer_hide");
    console.info(document.querySelector(".b-lists-task__footer").classList);
}

function offBListsTaskFooter() {
    document.querySelector(".b-lists-task__footer").classList.add("b-lists-task__footer_hide");
}

function job_todo(settings) {
    var maintodo = document.getElementById(settings.formId);

    //console.info(maintodo);

    console.info("tasks = ", tasks);
    /* первичная инициализация задач, если они присутствуют в коде страницы */
    if (tasks.task === undefined) {
        tasks.task = Array();
        console.info("tasks = ", tasks);
    }


    maintodo.addEventListener("click", function(event) {
        var btn = event.target;
        console.info("click");
        if (btn.getAttribute("for")==="btn-clear-completed") {
            tasks.clearCompleted();
            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_all_task(tasks.task, listTask);

            document.querySelector("#btn-all").checked = true;
            console.info("after clear completed task = ",tasks);
            if (tasks.task.length ===0) {
                offBListsTaskFooter();
            }

        }

        if (btn.getAttribute("for")==="btn-all") {
            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_all_task(tasks.task, listTask);

        }

        if (btn.getAttribute("for")==="btn-active") {
            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_active_task(tasks.task, listTask);

        }

        if (btn.getAttribute("for")==="btn-completed") {
            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_completed_task(tasks.task, listTask);

        }

        if(event.target.parentElement.classList.contains("b-task") && (event.target.tagName.toLowerCase()==="input")) {
            console.info(event.target);
            var num = Number(event.target.getAttribute("id").split("-").pop());
            if(num != null) {
                tasks.task[num].done =  event.target.checked;
            }
            console.info("num = ", num);
            console.info("tasks = ", tasks)
        }

    }, true);


    maintodo.addEventListener("submit", function(event) {

        var tasks_array = event.target.querySelectorAll(".b-task");
        console.info(tasks_array);
        console.info(tasks_array.length);

        if (tasks_array.length < tasks.task.length) {
            /* добавили задачу - добавляем последнюю добвленную задачу  */

            var i = tasks.task.length - 1;
            console.info(tasks.task[i]);
            var div = create_one_task(tasks.task[i], "chk-task-"+i);
            var r = event.target.querySelector(".b-lists-task__line");
            r.appendChild(div);
            onBListsTaskFooter();
        }
    }, true);


    maintodo.addEventListener("keypress", function(event) {
        
        if ((event.target.tagName.toLowerCase() === "input") && (event.key === "Enter")) {
            console.info("keypress Enter");
            //console.info(event.target.value);
            if (event.target.value.trim()==="") {
                console.info("empty string");
            } else {
                tasks.task.push({
                    done: false, 
                    name: event.target.value.trim()
                });
                event.target.value = "";
                console.info("tasks = ", tasks);
            }


        
        }
    });


}