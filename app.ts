//types used
type CreateView = (Element: HTMLElement | null, html: string) => void;
type Task = {
  description: string;
  isCompleted: boolean;
};

// function getting task from local storage
const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};
//puts localstorage tasks in the task array
const tasks: Task[] = loadTasks();

//goes over each task in tasks array and renders it
const renderStoredTasks = (): void => {
  tasks.forEach((task) => renderTask(task));
};

//function for rendering task
const renderTask = (
  task: Task,
  parent: HTMLUListElement | null = document.querySelector<HTMLUListElement>(
    '.list'
  )
): void => {
  const taskElement = document.createElement('li');
  taskElement.textContent = task.description;

  //checkbox
  const taskCheckBox = document.createElement('input');
  taskCheckBox.type = 'checkbox';
  taskCheckBox.checked = task.isCompleted;

  //toggle checkbox eventlistner
  taskCheckBox.addEventListener('change', () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckBox);
  parent?.appendChild(taskElement);
};

// function for generating main html
const generateMainHtml = (): string => {
  return /*html*/ ` 
  <main>
    <h2>Tasks</h2>
    <form class="form">
      <input type="text" class="form-input" />
      <button type="submit" class="btn">add task</button>
    </form>
  <ul class="list"></ul>
</main>`;
};

// function for creating view
const createView: CreateView = (element, html) => {
  element !== null ? (element.innerHTML = html) : null;
  renderStoredTasks();
};

// creating main view
const createMainView = createView(
  document.getElementById('app'),
  generateMainHtml()
);

// function for adding a task
const addTask = (task: Task): void => {
  tasks.push(task);
  console.log(tasks);
};

// function for updating storage
const updateStorage = (): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// adds eventlistner to add task button
const createTaskEvent = () => {
  const taskForm = document.querySelector<HTMLFormElement>('.form');
  const formInput = document.querySelector<HTMLInputElement>('.form-input');
  const list = document.querySelector<HTMLUListElement>('.list');

  taskForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = formInput?.value;
    if (taskDescription) {
      const task: Task = {
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