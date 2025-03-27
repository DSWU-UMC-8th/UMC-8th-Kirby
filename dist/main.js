"use strict";
let todos = [];
let dones = [];
const inputEl = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        var _a;
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
        <span>${todo.text}</span>
        <button class="complete-btn">완료</button>
      `;
        (_a = li.querySelector(".complete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            moveToDone(todo.id);
        });
        todoList.appendChild(li);
    });
};
const renderDones = () => {
    doneList.innerHTML = "";
    dones.forEach((done) => {
        var _a;
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
        <span>${done.text}</span>
        <button class="delete-btn">삭제</button>
      `;
        (_a = li.querySelector(".delete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            deleteDone(done.id);
        });
        doneList.appendChild(li);
    });
};
const addTodo = () => {
    const value = inputEl.value.trim();
    if (value === "")
        return;
    const newTodo = {
        id: Date.now(),
        text: value,
    };
    todos.push(newTodo);
    inputEl.value = "";
    renderTodos();
};
const moveToDone = (id) => {
    const target = todos.find((t) => t.id === id);
    if (!target)
        return;
    todos = todos.filter((t) => t.id !== id);
    dones.push(target);
    renderTodos();
    renderDones();
};
const deleteDone = (id) => {
    dones = dones.filter((d) => d.id !== id);
    renderDones();
};
addBtn.addEventListener("click", addTodo);
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
