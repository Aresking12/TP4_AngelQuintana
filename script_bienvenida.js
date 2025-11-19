document.addEventListener('DOMContentLoaded', () => {
    // 1. Mensaje de bienvenida y pedir nombre/apellido
    alert("¡Bienvenido/a al Explorador de APIs!");

    let nombre = prompt("Por favor, ingresa tu Nombre:");
    let apellido = prompt("Ahora, ingresa tu Apellido:");

    // Limpiar y validar
    nombre = nombre ? nombre.trim() : '';
    apellido = apellido ? apellido.trim() : '';

    const nombreCompleto = `${nombre} ${apellido}`.trim();

    // 2. Dar la bienvenida e. Mostrar nombre
    const saludoDiv = document.getElementById('saludo-usuario');
    
    if (nombreCompleto) {
        saludoDiv.innerHTML = `<h2>¡Bienvenido/a, **${nombreCompleto}**!</h2>
                               <p>Selecciona una API para comenzar.</p>`;
    } else {
        saludoDiv.innerHTML = `<h2>¡Bienvenido/a, Explorador Anónimo!</h2>
                               <p>Selecciona una API para comenzar.</p>`;
    }
});