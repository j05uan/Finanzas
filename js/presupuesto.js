// Cargar presupuestos
let listaPresupuestos = [];  // Ahora es una variable global que puedes modificar desde cualquier función
const userId = localStorage.getItem("userId"); 
const container = document.getElementById("rightContainer");

function verificar() {
    if (userId) {
        // Buscar al usuario por user_id en la lista de usuarios
        const usuario = usuarios.find(user => user.user_id === userId);

        if (usuario) {
            console.log("Bienvenido " + usuario.nombre);

            // Asignar presupuestos filtrados directamente a la variable global listaPresupuestos
            listaPresupuestos = presupuestos.filter(presupuesto => presupuesto.user_id === userId);
            
            if (listaPresupuestos.length > 0) {
                console.log("Presupuestos encontrados:", listaPresupuestos);
            } else {
                console.log("No se encontraron presupuestos para el usuario.");
            }

            // Llamar a mostrarPresupuestos después de verificar
            mostrarPresupuestos();

        } else {
            console.warn("Usuario no encontrado.");
        }
    } else {
        console.warn("No se encontró userId en localStorage.");
    }
}


window.onload = function() {
    verificar(); // Verificar primero y luego mostrar presupuestos
};

// Mostrar los presupuestos en el contenedor
function mostrarPresupuestos() {
    container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos presupuestos

    if (listaPresupuestos.length === 0) {
        container.innerHTML = "<p>No hay presupuestos disponibles.</p>";
        return;
    }

    const nuevoPresupuesto = document.createElement("div");
    nuevoPresupuesto.classList.add("nuevoPresupuesto");
    nuevoPresupuesto.innerHTML = `
        <h4> Añadir Presupuesto</h4>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
            </svg>
        </button>
    `;
    container.appendChild(nuevoPresupuesto);


    listaPresupuestos.forEach(presupuesto => {
        // Buscar el nombre del usuario por user_id
        const usuario = usuarios.find(user => user.user_id === presupuesto.user_id);
        const nombreUsuario = usuario ? usuario.nombre : "Usuario no encontrado";
        
        // Crear un elemento para cada presupuesto
        const presupuestoDiv = document.createElement("div");
        presupuestoDiv.classList.add("presupuesto");

        // Crear el contenido HTML para el presupuesto 
        presupuestoDiv.innerHTML = `
            <h3>Presupuesto ID: ${presupuesto.id}</h3>
            <p>User ID: ${presupuesto.user_id}</p>
            <p>Nombre: ${nombreUsuario}</p>
            <p>Ingreso Mensual: $${presupuesto.ingreso_mensual.toFixed(2)}</p>

        `;

        // Agregar el elemento al contenedor
        container.appendChild(presupuestoDiv);
    }

    
);
}
