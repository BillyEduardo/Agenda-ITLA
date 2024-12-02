document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logoutButton');

    const showModal = (message) => {
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.textContent = message; 
        const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));
        notificationModal.show(); 
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                showModal('Inicio de sesión exitoso!');
                sessionStorage.setItem('loggedInUser', username);
                setTimeout(() => window.location.href = 'index.html', 2000); 
            } else {
                showModal('Usuario o contraseña incorrectos.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validación de la contraseña mínima
            if (password.length < 8) {
                showModal('La contraseña debe tener al menos 8 caracteres.');
                return;
            }

            if (password !== confirmPassword) {
                showModal('Las contraseñas no coinciden.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(u => u.username === username)) {
                showModal('El usuario ya existe.');
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                showModal('Registro exitoso!');
                setTimeout(() => window.location.href = 'login.html', 2000); 
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
});
