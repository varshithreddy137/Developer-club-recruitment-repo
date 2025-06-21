document.addEventListener("DOMContentLoaded", () => {
    const storedTasks =localStorage.getItem("tasks");  
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);    
        updateTasksList();
    }
}
);

let tasks=[]

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}; 

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false, pinned: false ,createdAt: new Date()})
        taskInput.value = "";

        updateTasksList();
        saveTasks();
    } 
    
}

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList(); 
    saveTasks(); 
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    
   deleteTask(index);
    
    taskInput.focus();
    
    updateTasksList(); 
    saveTasks();
}

const togglePinTask = (index) => {
    tasks[index].pinned = !tasks[index].pinned;


    tasks.sort((a, b) => b.pinned - a.pinned);

    updateTasksList();
    saveTasks();
};


const updateTasksList = () => {
    const tasksList = document.getElementById("task-list");
    tasksList.innerHTML = "";


    tasks.sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned - a.pinned;
    return new Date(b.createdAt) - new Date(a.createdAt);  

    });


    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML =  `
            <div class="task-item">
                <div class="task ${task.completed ? 'completed' : ''} ${task.pinned ? 'pinned' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked':""}/>
                    <p class ="giventask">${task.text}</p>
                    <p class="task-date">${new Date(task.createdAt).toLocaleString()}</p>

                </div>
                <div class="icons">
                    <img src="./images/edit.png" onClick="editTask(${index})" />
                    <img src="./images/delete.png" onClick="deleteTask(${index})" />
                    <img src="./images/pin.png" onClick="togglePinTask(${index})" />
                </div>
            </div> 
`;
        listItem.addEventListener("change", () => toggleTaskCompletion(index));
        tasksList.appendChild(listItem);
    });
};


        

document.getElementById("newTask").addEventListener("click", function(e) { 
    e.preventDefault();
    addTask();
    
     
   
});