
// Función para hashear la contraseña (mejorada)
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
}
const form = document.getElementById("registrarse");
const errorMessage = document.getElementById("message");

// Validar el formulario de registro
form.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
        // Obtener valores de los inputs
        const nombre = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Validar los campos
        if (!validarNombre(nombre)) throw new Error("El nombre no es válido.");
        if (!validarTelefono(telefono)) throw new Error("El teléfono no es válido.");
        if (!validarEmail(email)) throw new Error("El correo no es válido.");
        if (!validarContraseña(password, confirmPassword)) throw new Error("Las contraseñas no coinciden o no cumplen con los requisitos.");

        // Verificar si el email ya está registrado
        const emailExistente = usuarios.find(user => user.email === email);
        if (emailExistente) throw new Error("Este correo ya está registrado.");

        // Hashear la contraseña
        const hashedPassword = hashPassword(password);

        // Crear el nuevo usuario
        const nuevoUsuario = {
            user_id: (usuarios.length + 1).toString(),
            nombre: nombre,
            email: email,
            telefono: telefono,
            role: "usuario",
            contraseña: hashedPassword,
            fecha_registro: new Date().toISOString()
        };

        // Agregar el nuevo usuario al array de usuarios
        usuarios.push(nuevoUsuario);
        console.log("Usuario registrado:", nuevoUsuario);

        // Guardar el nuevo usuario en localStorage
        guardarUsuarioEnBD(nuevoUsuario);

        // Mostrar mensaje de éxito y redirigir
        errorMessage.textContent = "Registro exitoso!";
        errorMessage.style.color = "green";

        // Redirigir al usuario después de unos segundos (opcional)
        setTimeout(() => {
            window.location.href = "seccion.html";
        }, 2000); // 2 segundos de espera para ver el mensaje de éxito

    } catch (error) {
        // Mostrar el mensaje de error
        errorMessage.textContent = error.message;
        errorMessage.style.color = "red";
        console.error("Error durante el registro:", error);
    }
});


function guardarUsuarioEnBD(usuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
}
function validarNombre(nombre) {
    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return false;
    }
    return true;
}


function validarEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, introduce un email válido.");
        return false;
    }
    return true;
}

function validarTelefono(phone) {
    if (phone.length < 8) {
        alert("El teléfono debe tener al menos 8 dígitos.");
        return false;
    }
    return true;
}

function validarContraseña(password, confirmPassword) {
    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return false;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        alert("La contraseña debe contener al menos una letra y un número.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }
    return true;

    
}

function displayMessage(text, isError = true) {
    message.style.color = isError ? "red" : "green";
    message.textContent = text;
}
// Limpiar el formulario y mostrar mensaje de éxito
form.reset();
// displayMessage("Registro exitoso.", false);