const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const list = document.querySelector("#taskList");
const counter = document.querySelector("#counter");
const filterAll = document.querySelector("#filterAll");
const filterActive = document.querySelector("#filterActive");
const filterComplete = document.querySelector("#filterComplete");
const filterSchool = document.querySelector("#filterSchool");
const filterWork = document.querySelector("#filterWork");
const filterPersonal = document.querySelector("#filterPersonal");
const filterDiv = document.querySelector("#filter");
const state = {
tasks: loadTasks()
};
let statusFilter = "all";
let tagFilter = "all";

function loadTasks() {
const saved = localStorage.getItem("tasks");
if (!saved) return [];
try {
return JSON.parse(saved);
} catch {
return [];
}
}

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function activeCounter() {
    return state.tasks.filter(task => !task.done).length;
}

function taskFilter() {
    return state.tasks.filter(task => {
        const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !task.done) ||
        (statusFilter === "complete" && task.done);

        const matchesTag =
        tagFilter === "all" ||
        (tagFilter === "School" && task.tag === "School") ||
        (tagFilter === "Work" && task.tag === "Work") ||
        (tagFilter === "Personal" && task.tag === "Personal");

        return matchesStatus && matchesTag;
    });
}

function render() {
  list.innerHTML = "";
  const filteredTasks = taskFilter();

  filteredTasks.forEach((task) => {
      const liBtns = document.createElement("div");
      liBtns.classList.add("liBtns");

      const li = document.createElement("li");
      if (task.tag === "all") {
        li.textContent = task.task;
      } else {
      li.textContent = `${task.task} | ${task.tag}`;
      }

      const complete = document.createElement("button");
      complete.textContent = "Complete";
      complete.classList.add("btn", "completeBtn");
      complete.addEventListener("click", () => {
        task.done = true;
        saveTasks();
        render();
      });

      if (task.done) {
        li.classList.add("checked");
        complete.classList.add("hidden");
      }

      const del = document.createElement("button");
      del.textContent = "Delete";
      del.classList.add("btn");
      del.addEventListener("click", () => {
        state.tasks = state.tasks.filter(t => t.id !== task.id);
        saveTasks();
        render();
      });

      li.appendChild(liBtns);
      liBtns.appendChild(complete);
      liBtns.appendChild(del);
      list.appendChild(li);
  });

  counter.textContent = `Active Tasks: ${activeCounter()}`;
}

function addTask() {
  const text = input.value.trim();
  const tagSelect = document.querySelector("#tagSelect");

  if (!text) {
    alert("Please enter a task name.");
    return;
  }

  const tagValue = tagSelect.value;

  let newTask = {
    id: Date.now(),
    task: text,
    tag: tagValue === "None" ? "all" : tagValue,
    done: false,
  }
  
  state.tasks.push(newTask);
  input.value = "";
  saveTasks();
  render();
}

addBtn.addEventListener("click", addTask);

filterAll.addEventListener("click", () => {
  statusFilter = "all";
  tagFilter = "all";
  render();
});

filterActive.addEventListener("click", () => {
  statusFilter = "active";
  render();
});

filterComplete.addEventListener("click", () => {
  statusFilter = "complete";
  render();
});

filterSchool.addEventListener("click", () => {
  tagFilter = "School";
  render();
});

filterWork.addEventListener("click", () => {
  tagFilter = "Work";
  render();
});

filterPersonal.addEventListener("click", () => {
  tagFilter = "Personal";
  render();
});

clearBtn.addEventListener("click", () => {
state.tasks = [];
saveTasks();
render();
});

render();