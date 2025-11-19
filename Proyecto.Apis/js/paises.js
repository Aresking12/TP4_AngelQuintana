function buscarPais() {
    const paisInput = document.getElementById('pais').value.trim();
    const url = `https://restcountries.com/v3.1/name/${paisInput}?fullText=true`;
    
    // Ocultar resultados previos
    document.getElementById('resultado-pais').style.display = 'none';

    if (!paisInput) {
        alert("Por favor, ingresa el nombre de un país.");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('País no encontrado.');
            }
            return response.json();
        })
        .then(data => {
            // REST Countries devuelve un array de resultados. Tomamos el primero.
            const paisData = data[0]; 

            // Formatear población con separadores de miles
            const poblacionFormateada = paisData.population.toLocaleString('es-ES');

            // Actualizar el DOM
            document.getElementById('nombre-pais').textContent = paisData.name.common;
            document.getElementById('capital-pais').textContent = paisData.capital ? paisData.capital[0] : 'N/A';
            document.getElementById('poblacion-pais').textContent = poblacionFormateada;
            
            const banderaImg = document.getElementById('bandera-pais');
            banderaImg.src = paisData.flags.svg;
            banderaImg.alt = `Bandera de ${paisData.name.common}`;
            
            // Mostrar la sección de resultados
            document.getElementById('resultado-pais').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al buscar país:', error);
            alert(`Error: ${error.message}. Intenta con otro nombre de país.`);
        });
}