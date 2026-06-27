const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedbtn = document.getElementById("completedBtn");
const tasklist = document.getElementById("tasklist");
const addButton = document.getElementById("addbutton");
const taskInput = document.getElementById("taskInput");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;
    const pending = total - completed;
    console.log(total, completed, pending);
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}
function createTask(task){
    const li = document.createElement("li");
    li.dataset.completed = task.completed;
    const span = document.createElement("span");
    span.textContent = task.text;
    if(task.completed) {
        span.classList.add("completed");
    }
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete-btn");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    editButton.addEventListener("click", function(){
        const newText = prompt("Edit your task",task.text);
        if(newText == null){
            return;
        }
        if(newText.trim() === ""){
            alert("Task cannot be empty");
            return;
        }
        task.text = newText.trim();
        span.textContent = task.text;
        localStorage.setItem("tasks",JSON.stringify(tasks));
    });
    completeButton.addEventListener("click",function(){
    task.completed = !task.completed;
    li.dataset.completed = task.completed;
    span.classList.toggle("completed");
    localStorage.setItem("tasks",JSON.stringify(tasks));
    updateCounter();
 });
 deleteButton.addEventListener("click",function() {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    li.remove();
    updateCounter();
 });
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(completeButton);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    li.appendChild(span);
    li.appendChild(buttons);
    tasklist.appendChild(li);
}
console.log(tasks);
 tasks.forEach(function(task){
    createTask(task);
});
updateCounter();
addButton.addEventListener("click", function() {
    const task = taskInput.value.trim();
 if (task == ""){
    alert("please enter a task");
    return;
}
    const newTask = {
    text: task,
    completed: false
  };
    tasks.push(newTask);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    createTask(newTask);
    updateCounter();
    taskInput.value = "";
    console.log(localStorage.getItem("tasks"));
});
    allBtn.addEventListener("click",function(){
        const allTasks = tasklist.querySelectorAll("li");
        allTasks.forEach(function(li){
        li.style.display = "flex";
    });
});
completedbtn.addEventListener("click",function(){
    const allTasks = tasklist.querySelectorAll("li");
    allTasks.forEach(function(li){
        if(li.dataset.completed === "true"){
            li.style.display = "flex";
        }
    else{
        li.style.display = "none";
    }
    });
});
activeBtn.addEventListener("click",function(){
    const allTasks = tasklist.querySelectorAll("li");
    allTasks.forEach(function(li){
        if(li.dataset.completed === "false"){
            li.style.display = "flex";
        }
    else{
        li.style.display = "none";
    }
    });
});