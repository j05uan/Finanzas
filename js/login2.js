// Configuración de intentos y tiempos de bloqueo
let loginAttempts = 0;
const maxAttempts = 3;
const lockoutTime = 120000; // 2 minutos de bloqueo temporal
const maxLockouts = 3; // Máximo de bloqueos temporales antes de bloquear por 24 horas
const fullLockoutTime = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

// Obtener elementos del DOM
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// Función para bloquear la cuenta por un tiempo
function lockAccount(duration, isFullLock = false) {
    const lockKey = isFullLock ? "fullLockout" : "isLockedOut";
    localStorage.setItem(lockKey, true);
    localStorage.setItem("lockTime", Date.now());

    const lockMessage = isFullLock 
        ? "Tu cuenta ha sido bloqueada por 24 horas." 
        : `Demasiados intentos fallidos. Bloqueo temporal por ${duration / 1000} segundos.`;
    
    message.textContent = lockMessage;

    setTimeout(() => {
        localStorage.removeItem(lockKey);
        localStorage.removeItem("lockTime");
        loginAttempts = 0;
        message.textContent = "";
    }, duration);
}

// Función para manejar los bloqueos por intentos fallidos
function handleFailedLogin() {
    loginAttempts++;
    
    if (loginAttempts >= maxAttempts) {
        let lockoutCount = parseInt(localStorage.getItem("lockoutCount") || "0");

        if (lockoutCount >= maxLockouts) {
            lockAccount(fullLockoutTime, true); // Bloquear por 24 horas
        } else {
            lockoutCount++;
            localStorage.setItem("lockoutCount", lockoutCount);
            lockAccount(lockoutTime); // Bloqueo temporal
        }
    } else {
        message.textContent = `Intento fallido. Te quedan ${maxAttempts - loginAttempts} intentos.`;
    }
}

// Función para verificar si la cuenta está bloqueada
function checkIfLocked() {
    const lockTime = localStorage.getItem("lockTime");
    const isLockedOut = localStorage.getItem("isLockedOut");
    const isFullLockout = localStorage.getItem("fullLockout");

    if (isFullLockout && Date.now() - lockTime < fullLockoutTime) {
        message.textContent = "Tu cuenta sigue bloqueada por 24 horas.";
        return true;
    }

    if (isLockedOut && Date.now() - lockTime < lockoutTime) {
        message.textContent = "La cuenta sigue bloqueada temporalmente.";
        return true;
    }

    return false;
}

// Función para hacer hash de la contraseña con CryptoJS
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
}

// Función para verificar las credenciales
async function login(email, password) {
    if (checkIfLocked()) return;

    const usuario = usuarios.find(user => user.email === email);
    if (!usuario) {
        message.textContent = "Usuario no encontrado.";
        handleFailedLogin();
        return;
    }

    const hashedPassword = hashPassword(password);

    // Compara el hash de la contraseña ingresada con la contraseña almacenada
    if (hashedPassword === usuario.contraseña) {
        message.textContent = `Inicio de sesión exitoso. Bienvenido, ${usuario.nombre}.`;
        localStorage.setItem("usuario", usuario.nombre);
        localStorage.setItem("email", usuario.email);
        localStorage.setItem("userId", usuario.user_id);
        localStorage.removeItem("lockoutCount"); // Resetear el contador de bloqueos
        loginAttempts = 0;
        window.location.href = "home.html";

    } else {
        message.textContent = "Contraseña incorrecta.";
        handleFailedLogin();
    }
}

// Event listener para el formulario de login
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (checkIfLocked()) return;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    await login(email, password);
});

// Comprobar si la cuenta está bloqueada al cargar la página
window.onload = checkIfLocked;


// configuracion del log out
// Obtener el botón de logout
const logoutButton = document.getElementById("logoutButton");

// Añadir el evento click para cerrar sesión
logoutButton.addEventListener("click", function() {
    localStorage.removeItem("usuario");   // Elimina el nombre del usuario
    localStorage.clear();

    // Redirigir al usuario a la página de inicio o login
    window.location.href = "index.html";
});
