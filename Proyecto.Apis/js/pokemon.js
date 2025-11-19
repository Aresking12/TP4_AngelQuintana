function buscarPokemon() {
    const pokemonInput = document.getElementById('pokemon-input').value.trim().toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    // Ocultar resultados previos
    document.getElementById('resultado-pokemon').style.display = 'none';

    if (!pokemonInput) {
        alert("Por favor, ingresa un nombre o ID de Pokémon.");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado.');
            }
            return response.json();
        })
        .then(data => {
            // Extraer y formatear datos
            const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const tipos = data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ');
            // El peso en la API está en hectogramos (hg), lo convertimos a kilogramos (kg)
            const pesoKg = (data.weight / 10).toFixed(1); 

            // Actualizar el DOM
            document.getElementById('pokemon-nombre').textContent = nombre;
            document.getElementById('pokemon-tipo').textContent = tipos;
            document.getElementById('pokemon-peso').textContent = `${pesoKg} kg`;
            
            const imagen = document.getElementById('pokemon-imagen');
            imagen.src = data.sprites.front_default; // Imagen frontal por defecto
            imagen.alt = `Imagen de ${nombre}`;
            
            // Mostrar la sección de resultados
            document.getElementById('resultado-pokemon').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al buscar Pokémon:', error);
            alert(`Error: ${error.message}. Asegúrate de escribir el nombre o ID correctamente.`);
        });
}