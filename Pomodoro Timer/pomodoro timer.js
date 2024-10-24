let minutes = 25;
let seconds = 0;
let isRunning = false;
let sessionCount = 1;
let interval;

const taskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');
const minuteDisplay = document.getElementById('minutes');
const secondDisplay = document.getElementById('seconds');
const sessionDisplay = document.getElementById('sessionCount');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const themeSwitchBtn = document.getElementById('themeSwitch');

function updateDisplay() {
    minuteDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startPauseTimer() {
    if (!isRunning) {
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        interval = setInterval(countdown, 1000);
    } else {
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        clearInterval(interval);
    }
}

function countdown() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval);
            sessionCount++;
            sessionDisplay.textContent = sessionCount;
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    updateDisplay();
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    startPauseBtn.textContent = 'Start';
    sessionCount = 1;
    sessionDisplay.textContent = sessionCount;
    clearTasks();
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
themeSwitchBtn.addEventListener('click', toggleTheme);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const newTaskItem = document.createElement('li');
        newTaskItem.textContent = taskText;
        taskList.appendChild(newTaskItem);
        taskInput.value = "";
    }
}

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

function clearTasks() {
    taskList.querySelectorAll('li:not(:first-child)').forEach(task => task.remove());
}

function timerCompleted() {
    clearInterval(interval);
    sessionCount++;
    sessionDisplay.textContent = sessionCount;
    clearTasks();
}