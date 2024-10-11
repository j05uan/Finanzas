// Contadores de intentos de inicio de sesión fallidos y bloqueos
let loginAttempts = 0;
const maxAttempts = 3;
const lockoutTime = 1200000;  // 2 Minutos de bloqueo temporal
const maxLockouts = 3;      // Máximo de bloqueos temporales antes de bloquear por 24 horas
const fullLockoutTime = 24 * 60 * 60 * 1000;  // 24 horas en milisegundos

// Obtener elementos del DOM
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// Función para bloquear temporalmente el inicio de sesión
function lockAccountTemporarily() {
    localStorage.setItem("isLockedOut", true);
    localStorage.setItem("lockTime", Date.now()); // Guardar el momento en que se bloqueó

    message.textContent = "Demasiados intentos fallidos. Inténtalo de nuevo en 2 minutos.";
    
    setTimeout(() => {
        localStorage.removeItem("isLockedOut");  // Desbloquear después del tiempo
        localStorage.removeItem("lockTime");
        loginAttempts = 0;  // Reiniciar intentos
        message.textContent = "";
    }, lockoutTime);
}

// Función para bloquear la cuenta por 24 horas después de 3 bloqueos temporales
function lockAccountFor24Hours() {
    localStorage.setItem("fullLockout", true);
    localStorage.setItem("fullLockoutTime", Date.now());
    message.textContent = "Tu cuenta ha sido bloqueada por 24 horas debido a múltiples intentos fallidos.";
}

// Función para manejar intentos fallidos y bloqueo temporal
function handleFailedLogin() {
    loginAttempts++;

    if (loginAttempts >= maxAttempts) {
        if (localStorage.getItem("lockoutCount") >= 3) {
            lockAccountFor24Hours();  // Bloquear por 24 horas si ya ha habido 3 bloqueos temporales
        } else {
            isLockedOut = true; // Bloquear temporalmente
            message.textContent = `Has fallado 3 veces. Estás bloqueado por ${lockoutTime / 1000} segundos.`;
            
            // Incrementar el contador de bloqueos temporales
            let lockoutCount = localStorage.getItem("lockoutCount") || 0;
            lockoutCount++;
            localStorage.setItem("lockoutCount", lockoutCount);

            setTimeout(() => {
                isLockedOut = false; // Desbloquear después del tiempo especificado
                loginAttempts = 0;  // Resetear el contador de intentos fallidos
                message.textContent = "";
            }, lockoutTime);
        }
    } else {
        message.textContent = `Intento fallido. Te quedan ${maxAttempts - loginAttempts} intentos antes de ser bloqueado.`;
    }
}

// Función para verificar las credenciales de login
async function login(username, password) {
    if (checkIfLocked()) return; // Verificar si la cuenta está bloqueada por 24 horas

    if (isLockedOut) {
        message.textContent = `Estás temporalmente bloqueado. Intenta de nuevo en unos segundos.`;
        return;
    }

    const usuario = usuarios.find(user => user.email === username); // Buscar el usuario por nombre de usuario

    if (!usuario) {
        message.textContent = "Usuario no encontrado.";
        handleFailedLogin(); // Manejar intento fallido
        return;
    }

    // Verificar la contraseña usando bcrypt (simulación)
    const passwordMatches = await bcrypt.compare(password, usuario.contraseña); // Comparar contraseña

    if (passwordMatches) {
        message.textContent = "Inicio de sesión exitoso. Bienvenido, " + usuario.nombre;
        localStorage.removeItem("lockoutCount"); // Resetear el contador de bloqueos si el login es exitoso
        loginAttempts = 0; // Resetear el contador de intentos fallidos
    } else {
        message.textContent = "Contraseña incorrecta.";
        handleFailedLogin(); // Manejar intento fallido
    }
}

// Ejemplo de uso
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    login(username, password);
});

// Comprobar si la cuenta está bloqueada al cargar la página
function checkIfLocked() {
    const fullLockout = localStorage.getItem("fullLockout");
    const fullLockoutTime = localStorage.getItem("fullLockoutTime");
    const lockTime = localStorage.getItem("lockTime");

    if (fullLockout) {
        // Si la cuenta está bloqueada por 24 horas, verificar si ya pasó el tiempo
        if (Date.now() - fullLockoutTime < fullLockoutTime) {
            message.textContent = "Tu cuenta sigue bloqueada por 24 horas. Intenta más tarde.";
            return true;
        } else {
            localStorage.removeItem("fullLockout");
            localStorage.removeItem("fullLockoutTime");
            return false;
        }
    }

    if (lockTime) {
        // Si la cuenta está bloqueada temporalmente por 2 minutos
        if (Date.now() - lockTime < lockoutTime) {
            message.textContent = "La cuenta sigue bloqueada. Intenta de nuevo más tarde.";
            return true;
        } else {
            localStorage.removeItem("isLockedOut");
            localStorage.removeItem("lockTime");
        }
    }
    return false;
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Escuchar el evento de envío del formulario
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe

    // Verificar si la cuenta está bloqueada antes de permitir el intento de inicio de sesión
    if (checkIfLocked()) {
        return;
    }

    // Obtener los valores ingresados
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    (async () => {
        const inputPassword = password ;
        const hashed = await hashPassword(inputPassword);
    
        const isMatch = await verifyPassword(inputPassword, hashed);
        console.log("¿La contraseña coincide?", isMatch);  // Devuelve true
    })();

    // Buscar si el usuario existe en el array
    const usuario = usuarios.find(user => user.email === email);

    if (!usuario) {
        // Si el usuario no existe o la contraseña no coincide, sumar un intento fallido
        loginAttempts++;
        if (loginAttempts >= maxAttempts) {
            let lockouts = localStorage.getItem("lockouts") || 0;
            lockouts = parseInt(lockouts) + 1;
            localStorage.setItem("lockouts", lockouts);

            if (lockouts >= maxLockouts) {
                lockAccountFor24Hours();  // Bloquear por 24 horas si ha fallado 3 veces el bloqueo temporal
            } else {
                lockAccountTemporarily();  // Bloqueo temporal de 30 segundos
            }
        } else {
            message.textContent = "Credenciales incorrectas. Intento " + loginAttempts + " de " + maxAttempts;
        }
        return;
    }


    // Verificar la contraseña hasheada usando bcryptjs
    const isMatch = await bcrypt.compare(password, usuario.contraseña);

    if (isMatch) {
        // Acceso concedido, limpiar intentos y bloqueos
        localStorage.removeItem("lockouts");
        message.textContent = "Acceso concedido. Bienvenido, " + usuario.nombre + "!";
        localStorage.setItem("authToken", "usuario_autenticado_token");
        // Aquí redirigirías al usuario o cargarías la siguiente vista
    } else {
        // Incrementar el contador de intentos si la contraseña es incorrecta
        loginAttempts++;
        if (loginAttempts >= maxAttempts) {
            let lockouts = localStorage.getItem("lockouts") || 0;
            lockouts = parseInt(lockouts) + 1;
            localStorage.setItem("lockouts", lockouts);

            if (lockouts >= maxLockouts) {
                lockAccountFor24Hours();
            } else {
                lockAccountTemporarily();
            }
        } else {
            message.textContent = "Credenciales incorrectas. Intento " + loginAttempts + " de " + maxAttempts;
        }
    }
});

// Comprobar al cargar la página si la cuenta está bloqueada
window.onload = checkIfLocked;
