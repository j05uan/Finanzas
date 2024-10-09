const bcrypt = require('bcryptjs');

// Función para hashear una contraseña
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Se llama la funcion para que se Hashee la contraseña para almacenarla 
(async () => {
    const password = "1234";
    const hashed = await hashPassword(password);
    console.log("Contraseña Hasheada:", hashed);
})();


// Verificacion de contraseña

// Función para comparar una contraseña con un hash
async function verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

(async () => {
    const password = "MiSuperContraseñaSegura";
    const hashed = await hashPassword(password);

    const isMatch = await verifyPassword(password, hashed);
    console.log("¿La contraseña coincide?", isMatch);  // Devuelve true
})();


