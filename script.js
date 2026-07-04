// Navigation Active State
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Academic Planner Functions
let tasks = [];

function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (taskText === '') return;
    
    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });
    
    input.value = '';
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;
    
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})" 
                    style="margin-left: auto; background: #ef4444; padding: 6px 12px; font-size: 0.9rem; border: none; border-radius: 4px; color: white;">
                Delete
            </button>
        `;
        
        taskList.appendChild(li);
    });
}

// Contact Form Validation
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !phone || !message) {
        alert("All fields are required!");
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }
    
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        alert("Phone number must contain only digits!");
        return;
    }
    
    alert("Thank you! Your message has been received. (This is a demo)");
    e.target.reset();
}

// Initialize tasks on planner page
if (document.getElementById('task-list')) {
    tasks = [
        { id: 1, text: "Complete COS 106 term project", completed: false },
        { id: 2, text: "Review JavaScript DOM manipulation", completed: true }
    ];
    renderTasks();
}