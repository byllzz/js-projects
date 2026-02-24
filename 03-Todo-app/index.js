'use strict';

function render_UI() {
  const wrapper = document.createElement("div");
  wrapper.className = `
  w-full h-auto p-10 max-w-[700px] bg-black text-white mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl flex flex-col items-center gap-3
  `;

  wrapper.innerHTML = `
  <!-- header -->
  <div class="rounded-3xl border border-solid border-white border-2 flex flex-row items-center justify-between p-7 w-full">

    <!-- header left -->
    <div class="flex flex-col items-start gap-[10px] w-full">
      <h1 class="text-5xl font-bold">Todo Done</h1>
      <p class="text-xl ml-2">Keep it up!</p>

      <div class="w-full h-[13px] rounded-[999px] ml-2 mt-2 bg-white">
        <div id="progressBar" class="w-0 bg-red-500 h-[13px] rounded-[999px] transition-all duration-300"></div>
      </div>
    </div>

    <!-- header right -->
    <div class="flex items-center gap-2 bg-white text-black text-5xl font-medium rounded-full p-3 h-[130px] w-[130px] justify-center">
      <span id="doneCount">0</span>
      <span>/</span>
      <span id="totalCount">0</span>
    </div>
  </div>

  <!-- input -->
  <div class="w-full h-[55px] flex flex-row items-center gap-2 my-8">
    <input
      id="todoInput"
      type="text"
      placeholder="Write your todo..."
      class="w-full h-full pl-4 rounded-full text-black font-medium border-none focus:outline-none"
    />
    <button id="addTodo" class="cursor-pointer h-[55px] w-[60px] bg-blue-600 rounded-full text-6xl flex items-center justify-center active:scale-90 transition">
      <span class="relative bottom-[5px]">&plus;</span>
    </button>
  </div>

  <!-- todos -->
  <ul class="todoWrapper w-full h-[270px] flex flex-col items-center gap-[15px] overflow-y-auto p-3"></ul>
  `;

  document.body.appendChild(wrapper);
}

render_UI();

const inputTodo = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoWrapper = document.querySelector(".todoWrapper");
const progressBar = document.getElementById("progressBar");
const doneCountEl = document.getElementById("doneCount");
const totalCountEl = document.getElementById("totalCount");

let todos = [];

addTodoBtn.addEventListener("click", createTodo);
inputTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") createTodo();
});

function createTodo() {
  const value = inputTodo.value.trim();
  if (!value) return;

  const todoObj = {
    id: Date.now(),
    text: value,
    completed: false
  };

  todos.push(todoObj);
  inputTodo.value = "";
  renderTodos();
}

function renderTodos() {
  todoWrapper.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = `
    w-full h-[60px] flex items-center justify-between rounded-lg p-3
    ${todo.completed ? "bg-green-300 line-through" : "bg-[#ccc]"}
    text-black transition
    `;

    li.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" ${todo.completed ? "checked" : ""} />
        <span class="font-medium">${todo.text}</span>
      </div>

      <button class="deleteBtn bg-red-500 text-white px-3 py-1 rounded-lg active:scale-90 transition">
        ✕
      </button>
    `;

    const checkbox = li.querySelector("input");
    const deleteBtn = li.querySelector(".deleteBtn");

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      updateStats();
      renderTodos();
    });

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      renderTodos();
    });

    todoWrapper.prepend(li);
  });

  updateStats();
}

function updateStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  totalCountEl.textContent = total;
  doneCountEl.textContent = completed;

  const percentage = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = percentage + "%";
}



