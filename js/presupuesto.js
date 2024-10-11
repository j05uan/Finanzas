// Cargar presupuestos
const listaPresupuestos = [];
const userId = localStorage.getItem("userId"); 

if (userId) { // Verificar que userId no sea null o undefined
    for (let presupuesto of presupuestos) { 
        if (presupuesto.user_id === userId) {
            listaPresupuestos.push(presupuesto);
        }
    }
} else {
    console.warn("No se encontró userId en localStorage.");
}

function mostrarPresupuestos(listaPresupuestos, usuarios) {
    const contenedor = document.getElementById("presupuestosContainer");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos presupuestos

    if (listaPresupuestos.length === 0) {
        contenedor.innerHTML = "<p>No hay presupuestos disponibles.</p>";
        return;
    }

    listaPresupuestos.forEach(presupuesto => {
        // Buscar el nombre del usuario por user_id
        const usuario = usuarios.find(user => user.id === presupuesto.user_id);
        const nombreUsuario = usuario ? usuario.nombre : "Usuario no encontrado";

        // Crear un elemento para cada presupuesto
        const presupuestoDiv = document.createElement("div");
        presupuestoDiv.classList.add("presupuesto"); // Agregar una clase para estilos

        // Crear el contenido HTML para el presupuesto
        presupuestoDiv.innerHTML = `
            <h3>Presupuesto ID: ${presupuesto.id}</h3>
            <p>User ID: ${presupuesto.user_id}</p>
            <p>Nombre: ${nombreUsuario}</p>
            <p>Ingreso Mensual: $${presupuesto.ingreso_mensual.toFixed(2)}</p>
        `;

        // Agregar el elemento al contenedor
        contenedor.appendChild(presupuestoDiv);
    });
}

function actualizarPresupuesto(id, nuevosDatos) {
    // Buscar el índice del presupuesto en la lista
    const index = listaPresupuestos.findIndex(presupuesto => presupuesto.id === id);

    // Si se encuentra el presupuesto, se actualizan los datos
    if (index !== -1) {
        listaPresupuestos[index] = {
            ...listaPresupuestos[index],  // Conservar los datos existentes
            ...nuevosDatos                 // Aplicar los nuevos datos
        };

        // Actualizar el localStorage (si es necesario)
        localStorage.setItem("listaPresupuestos", JSON.stringify(listaPresupuestos));

        console.log("Presupuesto actualizado:", listaPresupuestos[index]);
        return listaPresupuestos[index]; // Retornar el presupuesto actualizado
    } else {
        console.error("Presupuesto no encontrado.");
        return null; // O lanzar un error
    }
}


function eliminarPresupuesto(id) {
    const index = listaPresupuestos.findIndex(presupuesto => presupuesto.id === id);

    // Si se encuentra el presupuesto, se elimina
    if (index !== -1) {
        const presupuestoEliminado = listaPresupuestos.splice(index, 1)[0]; // Elimina el presupuesto del array

        // Actualizar el localStorage (si es necesario)
        localStorage.setItem("listaPresupuestos", JSON.stringify(listaPresupuestos));

        console.log("Presupuesto eliminado:", presupuestoEliminado);
        return presupuestoEliminado; // Retornar el presupuesto eliminado
    } else {
        console.error("Presupuesto no encontrado.");
        return null; // O lanzar un error
    }
}
