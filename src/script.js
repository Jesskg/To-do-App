 // Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");

const todoList = document.getElementById("todoList");

const todoCount = document.getElementById("todoCount");

const addButton = document.querySelector(".button");

const deleteButton = document.getElementById("deleteButton");

// initialize our project

document.addEventListener("DOMContentLoaded", function() {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener('ketdown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

// this is when you as a user adds a new task and it get saved to local storage

function addTask() {
    const newTask = todoInput.value.trim();
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
    todoList.innerHTML ="";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" 
                id="input-${index}" ${item.disabled ? "checked" : ""}>

                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}"
                onclick="editTask(${index})">
                ${item.text}
                </p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

// this allows you to edit a task when you click on it

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function() {
        const updatedText = inputElement.value.trim();
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
};