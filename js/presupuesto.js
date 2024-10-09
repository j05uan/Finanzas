const listaPresupuestos = [];

const cargarPresupuestos = async () => {
    try {
        listaPresupuestos.splice(0);
        const respuesta = await fetch('http://localhost:3000/presupuesto');

        if (!respuesta.ok) {
            throw new Error(`Error al cargar presupuestos. Estado: ${respuesta.status} (${respuesta.statusText})`);
        }

        const presupuesto = await respuesta.json();

        if (Array.isArray(presupuesto)) {
            listaPresupuestos.push(...presupuesto);
        } else {
            throw new Error('La respuesta no es un array de presupuestos.');
        }

        console.log('Presupuestos cargados:', listaPresupuestos);
    } catch (error) {
        console.error("Error al cargar presupuestos:", error.message);
    }
};

// Cargar presupuetos

for (let presupuesto of presupuesto){
    console.log(carro);
    if(presupuesto){
        
    }
}
