 // Retrieve todo from local storage or initialize an empty array
interface TodoItem {
  text: string;
  disabled: boolean;
}

// geting dom elements with the correct types

let todo: TodoItem [] = JSON.parse(localStorage.getItem("todo") ?? "[]");

const todoInput =  document.getElementById("todoInput") as HTMLInputElement | null;

const todoList: HTMLElement | null = document.getElementById("todoList");

const todoCount: HTMLElement | null = document.getElementById("todoCount");

const addButton: any = document.querySelector(".button");

const deleteButton: HTMLElement | null = document.getElementById("deleteButton");

// initialize our project

document.addEventListener("DOMContentLoaded", function(): void { 
    addButton?.addEventListener("click", addTask);
    
    todoInput?.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
   
    deleteButton?.addEventListener("click", deleteAllTasks);
    
    displayTasks();
});

// this is when you as a user adds a new task and it get saved to local storage

function addTask(): void {

    if (!todoInput) return;
    
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

function deleteAllTasks(): void {
    todo = [];
    saveToLocalStorage();
displayTasks();
}

// this displays all the tasks on the webpage (a bit confusing but will get the hang of it)

function displayTasks() {
    if(!todoList || !todoCount) return; // exit if todoList is not found
 
      todoList.innerHTML = "";
    todo.forEach((item, index) => {
    const container = document.createElement("div");
    container.classList.add("todo-container");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.id = `input-${index}`;
    checkbox.checked = item.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    // Task text

    const taskText = document.createElement("p");
    taskText.id = `todo-${index}`;
    taskText.className = item.disabled ? "disabled" : "";
    taskText.textContent = item.text;
    taskText.addEventListener("click", () => editTask(index));

    // Delete tasks button

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.className = "deleteTask";
    deleteTaskBtn.textContent = "Delete Task";
    deleteTaskBtn.addEventListener("click", () => deleteTask(index));


    container.appendChild(checkbox);
    container.appendChild(taskText);
    container.appendChild(deleteTaskBtn);
    todoList.appendChild(container);
  });
    
    todoCount.textContent = todo.length.toString();
}

// delete task function

function deleteTask(index: number) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}
// this allows you to edit a task when you click on it

function editTask(index:any) {
    const todoItem = document.getElementById(`todo-${index}`);
    if (!todoItem) return; // exist if the element is not found

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
function toggleTask(index: number) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

// this saves the tasks to local storage

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
};