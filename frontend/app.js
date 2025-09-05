const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const API_URL = "http://localhost:5001/tasks"; // ✅ Updated port

// Fetch and display all tasks when page loads
function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      taskList.innerHTML = ""; // clear old list
      tasks.forEach(task => addTaskToDOM(task));
    })
    .catch(err => console.error("Error loading tasks:", err));
}

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  if (name === "") return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  })
    .then(res => res.json())
    .then(task => {
      addTaskToDOM(task);
      taskInput.value = ""; // clear input box
    })
    .catch(err => console.error("Error adding task:", err));
});

// Delete a task
function deleteTask(id, liElement) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => {
      liElement.remove();
    })
    .catch(err => console.error("Error deleting task:", err));
}

// Add task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.name;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = () => deleteTask(task.id, li);

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Load tasks on page load
loadTasks();
