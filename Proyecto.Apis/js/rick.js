function buscarPersonaje() {
    const personajeId = document.getElementById('personaje-id').value.trim();
    const url = `https://rickandmortyapi.com/api/character/${personajeId}`;

    // Ocultar resultados previos
    document.getElementById('resultado-rick').style.display = 'none';

    if (!personajeId || isNaN(personajeId) || parseInt(personajeId) < 1) {
        alert("Por favor, ingresa un ID de personaje válido (un número positivo).");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Personaje no encontrado (ID inválido).');
            }
            return response.json();
        })
        .then(data => {
            // Actualizar el DOM
            document.getElementById('rick-nombre').textContent = data.name;
            document.getElementById('rick-estado').textContent = data.status;
            document.getElementById('rick-especie').textContent = data.species;
            
            const imagen = document.getElementById('rick-imagen');
            imagen.src = data.image;
            imagen.alt = `Imagen de ${data.name}`;
            
            // Mostrar la sección de resultados
            document.getElementById('resultado-rick').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al buscar personaje:', error);
            alert(`Error: ${error.message}. Intenta con otro ID.`);
        });
}