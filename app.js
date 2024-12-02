document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskTableBody = document.getElementById("taskTableBody");
    const taskModal = new bootstrap.Modal(document.getElementById("taskModal"));
    const showFormButton = document.getElementById("showFormButton");
    const saveChangesButton = document.getElementById("saveChangesButton");
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const searchInput = document.getElementById("searchInput"); 
    const priorityFilter = document.getElementById("priorityFilter"); 

    let editingIndex = null;
    let taskToDeleteIndex = null;
    let tasks = loadTasksFromStorage();
    let filteredTasks = tasks; 

    // Cargar tareas desde localStorage
    function loadTasksFromStorage() {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Guardar tareas en localStorage
    function saveTasksToStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Renderizar tareas en la tabla
    function renderTasks() {
        taskTableBody.innerHTML = ""; 
        filteredTasks.forEach((task, index) => {
            const taskRow = document.createElement("tr");
            taskRow.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.date}</td>
                <td>${task.priority}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
                </td>
            `;

            // Asignar eventos a botones
            taskRow.querySelector(".btn-warning").addEventListener("click", function () {
                editTask(index);
            });

            taskRow.querySelector(".btn-danger").addEventListener("click", function () {
                deleteTask(index);
            });

            taskTableBody.appendChild(taskRow);
        });
    }

    // Añadir o editar tarea
    // Añadir o editar tarea
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskTitle = document.getElementById("taskTitle").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskPriority = document.getElementById("taskPriority").value;

    const newTask = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        priority: taskPriority,
    };

    if (editingIndex === null) {
        tasks.push(newTask); 
        showToast("Tarea creada con éxito!");  // Mostrar el mensaje cuando la tarea se crea
    } else {
        tasks[editingIndex] = newTask; 
        showToast("Tarea editada exitosamente!");  // Mostrar el mensaje cuando la tarea se edita
    }

    saveTasksToStorage(); 
    taskForm.reset();
    taskModal.hide();
    editingIndex = null;
    renderTasks(); 
});

    // Eliminar tarea con confirmación
    function deleteTask(index) {
        taskToDeleteIndex = index;
        confirmDeleteModal.show();
    }

    confirmDeleteButton.addEventListener("click", function () {
        if (taskToDeleteIndex !== null) {
            tasks.splice(taskToDeleteIndex, 1);
            saveTasksToStorage(); 
            renderTasks(); 
            taskToDeleteIndex = null;
            confirmDeleteModal.hide();
            renderTasks();
        }
    });

    // Editar tarea
    function editTask(index) {
        editingIndex = index;
        const task = tasks[index];

        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDate").value = task.date;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskPriority").value = task.priority;

        taskModal.show();
        saveChangesButton.style.display = "inline-block";
        renderTasks();
    }

    // Mostrar formulario para nueva tarea
    showFormButton.addEventListener("click", function () {
        taskForm.reset();
        editingIndex = null;
        saveChangesButton.style.display = "none";
        taskModal.show();
    });

    // Función para filtrar tareas según el título
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase(); 

        
        filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm));
        renderTasks(); 
    });

    // Función para filtrar tareas por prioridad
    priorityFilter.addEventListener("change", function () {
        const selectedPriority = priorityFilter.value;

        if (selectedPriority) {
            filteredTasks = tasks.filter((task) => task.priority === selectedPriority);
        } else {
            filteredTasks = tasks; 
        }

        renderTasks(); 
    });

    // Función para mostrar el Toast
function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('toastMessage'));
    const toastBody = document.getElementById('toastBody');
    toastBody.textContent = message; 
    toast.show();  
}


    // Cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser'); 
        window.location.href = 'login.html'; 
      });

    // Inicializar tabla de tareas
    renderTasks();
  
  
});
