var _a;
// geting dom elements with the correct types
var todo = JSON.parse((_a = localStorage.getItem("todo")) !== null && _a !== void 0 ? _a : "[]");
var todoInput = document.getElementById("todoInput");
var todoList = document.getElementById("todoList");
var todoCount = document.getElementById("todoCount");
var addButton = document.querySelector(".button");
var deleteButton = document.getElementById("deleteButton");
// initialize our project
document.addEventListener("DOMContentLoaded", function () {
    addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addTask);
    todoInput === null || todoInput === void 0 ? void 0 : todoInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});
// this is when you as a user adds a new task and it get saved to local storage
function addTask() {
    if (!todoInput)
        return;
    var newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}
// deletes all tasks from the list and local storage
function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}
// this displays all the tasks on the webpage (a bit confusing but will get the hang of it)
function displayTasks() {
    if (!todoList || !todoCount)
        return; // exit if todoList is not found
    todoList.innerHTML = "";
    todo.forEach(function (item, index) {
        var container = document.createElement("div");
        container.classList.add("todo-container");
        // Checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.id = "input-".concat(index);
        checkbox.checked = item.disabled;
        checkbox.addEventListener("change", function () { return toggleTask(index); });
        // Task text
        var taskText = document.createElement("p");
        taskText.id = "todo-".concat(index);
        taskText.className = item.disabled ? "disabled" : "";
        taskText.textContent = item.text;
        taskText.addEventListener("click", function () { return editTask(index); });
        // Delete tasks button
        var deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.className = "deleteTask";
        deleteTaskBtn.textContent = "Delete Task";
        deleteTaskBtn.addEventListener("click", function () { return deleteTask(index); });
        container.appendChild(checkbox);
        container.appendChild(taskText);
        container.appendChild(deleteTaskBtn);
        todoList.appendChild(container);
    });
    todoCount.textContent = todo.length.toString();
}
// delete task function
function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}
// this allows you to edit a task when you click on it
function editTask(index) {
    var todoItem = document.getElementById("todo-".concat(index));
    if (!todoItem)
        return; // exist if the element is not found
    var existingText = todo[index].text;
    var inputElement = document.createElement("input");
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    inputElement.addEventListener("blur", function () {
        var updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}
// this saves the tasks to local storage
function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
;
