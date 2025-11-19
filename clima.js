function obtenerClima() {
    const ciudad = document.getElementById('ciudad').value;
    const apiKey = 'YOUR_API_KEY'; // **¡Importante! Reemplaza con tu API Key real**
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    if (!ciudad) {
        alert("Por favor, ingresa el nombre de una ciudad.");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Lanza un error si la respuesta no es 200-299 (ej. ciudad no encontrada)
                throw new Error(`Error: Ciudad no encontrada o problema con la API. Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Actualizar los elementos en el HTML con los datos
            document.getElementById('nombre-ciudad').textContent = data.name;
            document.getElementById('temp').textContent = `${data.main.temp}°C`;
            document.getElementById('humedad').textContent = `${data.main.humidity}%`;
            document.getElementById('descripcion-clima').textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        })
        .catch(error => {
            console.error('Hubo un error al obtener los datos del clima:', error);
            document.getElementById('nombre-ciudad').textContent = 'Error';
            document.getElementById('temp').textContent = 'N/A';
            document.getElementById('humedad').textContent = 'N/A';
            document.getElementById('descripcion-clima').textContent = 'No se pudo obtener el clima para esa ciudad.';
        });
}