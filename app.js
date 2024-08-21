// function getting task from local storage
var loadTasks = function () {
    var storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
};
//puts localstorage tasks in the task array
var tasks = loadTasks();
//goes over each task in tasks array and renders it
var renderStoredTasks = function () {
    tasks.forEach(function (task) { return renderTask(task); });
};
//function for rendering task
var renderTask = function (task, parent) {
    if (parent === void 0) { parent = document.querySelector('.list'); }
    var taskElement = document.createElement('li');
    taskElement.textContent = task.description;
    //checkbox
    var taskCheckBox = document.createElement('input');
    taskCheckBox.type = 'checkbox';
    taskCheckBox.checked = task.isCompleted;
    //toggle checkbox eventlistner
    taskCheckBox.addEventListener('change', function () {
        task.isCompleted = !task.isCompleted;
        updateStorage();
    });
    taskElement.appendChild(taskCheckBox);
    parent === null || parent === void 0 ? void 0 : parent.appendChild(taskElement);
};
// function for generating main html
var generateMainHtml = function () {
    return /*html*/ " \n  <main>\n    <h2>Tasks</h2>\n    <form class=\"form\">\n      <input type=\"text\" class=\"form-input\" />\n      <button type=\"submit\" class=\"btn\">add task</button>\n    </form>\n  <ul class=\"list\"></ul>\n</main>";
};
// function for creating view
var createView = function (element, html) {
    element !== null ? (element.innerHTML = html) : null;
    renderStoredTasks();
};
// creating main view
var createMainView = createView(document.getElementById('app'), generateMainHtml());
// function for adding a task
var addTask = function (task) {
    tasks.push(task);
    console.log(tasks);
};
// function for updating storage
var updateStorage = function () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
// adds eventlistner to add task button
var createTaskEvent = function () {
    var taskForm = document.querySelector('.form');
    var formInput = document.querySelector('.form-input');
    var list = document.querySelector('.list');
    taskForm === null || taskForm === void 0 ? void 0 : taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var taskDescription = formInput === null || formInput === void 0 ? void 0 : formInput.value;
        if (taskDescription) {
            var task = {
                description: taskDescription,
                isCompleted: false,
            };
            addTask(task);
            renderTask(task, list);
            updateStorage();
            formInput.value = '';
            return;
        }
        alert('Please enter a task description');
    });
};
createTaskEvent();
// taskForm?.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const taskDescription = formInput?.value;
//   if (taskDescription) {
//     const task: Task = {
//       description: taskDescription,
//       isCompleted: false,
//     };
//     addTask(task);
//     formInput.value = '';
//     return;
//   }
//   alert('Please enter a task description');
// });
// const renderTask = (task: Task, parent: HTMLUListElement | null): void => {
//   const taskElement = document.createElement('li');
//   taskElement.textContent = task.description;
//   parent?.appendChild(taskElement);
// };
