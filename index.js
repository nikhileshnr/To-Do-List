// index.js

let itag = document.getElementById("itag");
let btn = document.getElementById("btn");
let list = document.getElementById("list");

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push(task.querySelector('p').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

function addTask(text) {
    if (!text) return;
    let task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <p>${text}</p>
        <svg id="del" xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
        </svg>`;

    let del = task.querySelector("#del");
    del.addEventListener("click", function() {
        list.removeChild(task);
        saveTasks();
    });
    list.appendChild(task);
    saveTasks();
}

btn.addEventListener("click", function() {
    let text = itag.value.trim();
    if (text) {
        addTask(text);
        itag.value = "";
    }
});

document.addEventListener('DOMContentLoaded', loadTasks);
