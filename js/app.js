const nombre = document.getElementById('nombre');
const nameLocalStorage = localStorage.getItem("usuario");

nombre.innerHTML=nameLocalStorage;