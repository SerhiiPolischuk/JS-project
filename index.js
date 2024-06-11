let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

displayTasks();
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        tasks.push({text: taskText, completed: false});
        displayTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
    }
}
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.style.textDecoration = 'line-through';
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        
        li.appendChild(deleteButton);
        
        li.addEventListener('click', () => toggleTask(index));
        taskList.appendChild(li);
    });
    updateTaskCount();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    tasks = [];
    localStorage.removeItem('tasks');
    displayTasks();
}

function updateTaskCount() {
    const taskCount = document.getElementById('taskCount');
    const incompleteTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `Incomplete Tasks: ${incompleteTasks}`;
}

document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});