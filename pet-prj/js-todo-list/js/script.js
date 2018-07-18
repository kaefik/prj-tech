//"use strict";

var tasks= {
    task: Array(),  // массив данных типа {done: True, name: "первая задача"}
    num_edit: -1,  // если -1, то не редактируется задача, иначе номер задачи в this.task в которой осуществляется редактирование
    clearAll: function() {  // удаление всех задач
        this.task = Array();
    },
    clearCompleted: function() {  // удаление выполненных задач
        //words.filter(word => word.length > 6);
        this.task = this.task.filter(iTask => !iTask.done);
    },
    isEdit: function() {
        /* если true, то редактирование задачи  */
        if(this.num_edit==-1) {
            return false;
        } else {
            return true;
        }
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
            <div class="b-task__name">первая задача</div>
            <div class="b-task__btnclose">x</div>
        </div>
    */

    console.info("create_one_task");
    console.info("create_one_task task = ", task);

    var div = document.createElement("div");
    div.classList.add("b-task");

    var div_close = document.createElement("div");
    div_close.classList.add("b-task__btnclose");
    div_close.innerHTML = "x";

    var name_task = document.createElement("div");
    name_task.setAttribute("id", idNumTask);
    name_task.classList.add("b-task__name");
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


    var edit_input = document.querySelector(".b-input-line__search");
    edit_input.focus();

    maintodo.addEventListener("click", function(event) {
        var btn = event.target;
        console.info("click");
        console.info("click event.target = ", event.target);
        console.info("click tasks.task = ", tasks.task);

        if (btn.getAttribute("for")==="btn-clear-completed") {
            console.info("click  btn-clear-completed");

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
            console.info("click  btn-all");

            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_all_task(tasks.task, listTask);

        }

        if (btn.getAttribute("for")==="btn-active") {
            console.info("click  btn-aсtive");
            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_active_task(tasks.task, listTask);

        }

        if (btn.getAttribute("for")==="btn-completed") {
            console.info("click  btn-completed");
            var listTask = document.querySelector(".b-lists-task__line");
            listTask.innerHTML ="";
            create_completed_task(tasks.task, listTask);

        }

        if(event.target.parentElement.classList.contains("b-task") && (event.target.tagName.toLowerCase()==="input")) {
            console.info("click input b-task");
            console.info(event.target);
            var num = Number(event.target.getAttribute("id").split("-").pop());
            if(num != null) {
                tasks.task[num].done =  event.target.checked;
            }
            console.info("num = ", num);
            console.info("tasks = ", tasks)
        }

    });


    maintodo.addEventListener("dblclick", function(event) { 
        console.info("dblclick");
        console.info("dblclick", event.target);
        console.info("dblclick task = ", tasks.task);
        if (event.target.classList.contains("b-task__name")) {
            var edit_input = document.querySelector(".b-input-line__search");
            edit_input.value = event.target.innerHTML;
            edit_input.focus();

            var num = Number(event.target.getAttribute("id").split("-").pop());
            console.info("num = ", num);
            tasks.num_edit = num;
            
        }

    }, true);

    maintodo.addEventListener("submit", function(event) {

        var tasks_array = event.target.querySelectorAll(".b-task");
        console.info("submit");
        console.info(tasks_array);
        console.info(tasks_array.length);

        if (tasks_array.length < tasks.task.length) {
            /* добавили задачу - добавляем последнюю добвленную задачу  */

            console.info("submit добавили задачу - добавляем последнюю добвленную задачу");
            console.info("submit task = ", tasks.task);

            var i = tasks.task.length - 1;
            console.info(tasks.task[i]);
            var div = create_one_task(tasks.task[i], "chk-task-"+i);
            var r = event.target.querySelector(".b-lists-task__line");
            r.appendChild(div);
            onBListsTaskFooter();
            console.info(" end submit task = ", tasks.task);
        }

    }, true);


    maintodo.addEventListener("keypress", function(event) {
        
        if ((event.target.classList.contains("b-input-line__search")) && (event.key === "Enter")) {
            console.info("keypress Enter");
            //console.info(event.target.value);
            if (event.target.value.trim()==="") {
                console.info("empty string");
            } else {
                if (!tasks.isEdit()) {
                    console.info("keypress add new task");

                    tasks.task.push({
                        done: false, 
                        name: event.target.value.trim()
                    });
                    event.target.value = "";
                    console.info("tasks = ", tasks);    
                } else {
                    console.info("keypress edit task");
                    console.info("tasks.task[tasks.num_edit]  = ", tasks.task);
                    tasks.task[tasks.num_edit].name = event.target.value.trim();
                    event.target.value = "";
                    console.info("tasks = ", tasks);    
                    tasks.num_edit=-1;
                    var listTask = document.querySelector(".b-lists-task__line");
                    listTask.innerHTML ="";
                    create_all_task(tasks.task, listTask);
                    console.info("tasks.task[tasks.num_edit]  = ", tasks.task);
                }
                
            }


        
        }
    }, true);


}