interface TodoItem {
  id: number;
  text: string;
}

let todos: TodoItem[] = [];
let dones: TodoItem[] = [];

const inputEl = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

const renderTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
        <span>${todo.text}</span>
        <button class="complete-btn">완료</button>
      `;
    li.querySelector(".complete-btn")?.addEventListener("click", () => {
      moveToDone(todo.id);
    });
    todoList.appendChild(li);
  });
};

const renderDones = () => {
  doneList.innerHTML = "";
  dones.forEach((done) => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
        <span>${done.text}</span>
        <button class="delete-btn">삭제</button>
      `;
    li.querySelector(".delete-btn")?.addEventListener("click", () => {
      deleteDone(done.id);
    });
    doneList.appendChild(li);
  });
};

const addTodo = () => {
  const value = inputEl.value.trim();
  if (value === "") return;
  const newTodo: TodoItem = {
    id: Date.now(),
    text: value,
  };
  todos.push(newTodo);
  inputEl.value = "";
  renderTodos();
};

const moveToDone = (id: number) => {
  const target = todos.find((t) => t.id === id);
  if (!target) return;
  todos = todos.filter((t) => t.id !== id);
  dones.push(target);
  renderTodos();
  renderDones();
};

const deleteDone = (id: number) => {
  dones = dones.filter((d) => d.id !== id);
  renderDones();
};

// 버튼 클릭으로 할 일 추가
addBtn.addEventListener("click", addTodo);

// Enter 키로도 할 일 추가
inputEl.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
