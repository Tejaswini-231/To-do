document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

let tasks = [];

function addTask() {
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;

    const task = {
        id: Date.now(),
        title,
        desc,
        deadline,
        priority,
        category,
        completed: false
    };

    tasks.push(task);
    displayTasks();
    clearForm();
}

function displayTasks() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        if (!task.completed) {
            const taskItem = document.createElement('li');
            taskItem.id = task.id;

            taskItem.innerHTML = `
                <span>${task.title} - ${task.category} - ${task.deadline}</span>
                <button class="complete-btn" onclick="markAsCompleted(${task.id})">Complete</button>
            `;

            // Apply priority-based coloring
            taskItem.classList.add(`${task.priority}-priority`);

            // Check for deadline alerts
            const currentDate = new Date();
            const taskDeadline = new Date(task.deadline);
            if (taskDeadline - currentDate < 86400000 && !task.completed) {
                taskItem.classList.add('deadline-alert');
            }

            taskList.appendChild(taskItem);
        }
    });
}

function markAsCompleted(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = true;
        }
        return task;
    });

    moveCompletedTasks();
}

function moveCompletedTasks() {
    const completedList = document.getElementById('completed');
    completedList.innerHTML = '';

    tasks.forEach(task => {
        if (task.completed) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${task.title} - ${task.category}`;
            taskItem.classList.add('completed-task');
            completedList.appendChild(taskItem);
        }
    });

    displayTasks();
}

function clearForm() {
    document.getElementById('task-form').reset();
}
