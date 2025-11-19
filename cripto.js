function obtenerCripto() {
    const monedaId = document.getElementById('moneda-select').value;
    
    // Ocultar resultados previos
    document.getElementById('resultado-cripto').style.display = 'none';

    if (!monedaId) {
        // No hacer nada si el usuario selecciona la opción por defecto
        document.getElementById('cripto-nombre').textContent = '';
        return;
    }
    
    // URL de la API de CoinGecko para obtener datos del mercado (precio, 24h change, market cap)
    // `vs_currency=usd` especifica que queremos los precios en USD
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${monedaId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Si el status es un error (ej. 429 Too Many Requests), lanzamos un error
                throw new Error(`Error ${response.status}: Problema con la API de CoinGecko.`);
            }
            return response.json();
        })
        .then(data => {
            if (!data[monedaId]) {
                throw new Error('Datos de la criptomoneda no encontrados.');
            }
            
            const criptoData = data[monedaId];
            
            // Formateo de números
            const precioUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(criptoData.usd);
            const marketCapUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(criptoData.usd_market_cap);
            const cambio24h = criptoData.usd_24h_change.toFixed(2);
            
            // Determinar color para el cambio
            const cambioColor = cambio24h >= 0 ? 'green' : 'red';
            
            // Obtener el nombre de la moneda para el título
            const monedaNombre = document.querySelector(`#moneda-select option[value="${monedaId}"]`).text.split('(')[0].trim();

            // Actualizar el DOM
            document.getElementById('cripto-nombre').textContent = monedaNombre;
            document.getElementById('cripto-precio').textContent = precioUSD;
            document.getElementById('cripto-cambio').innerHTML = `<span style="color: ${cambioColor};">${cambio24h}%</span>`;
            document.getElementById('cripto-market-cap').textContent = marketCapUSD;
            
            // Mostrar la sección de resultados
            document.getElementById('resultado-cripto').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al obtener datos de criptomoneda:', error);
            alert(`Error en la consulta: ${error.message}.`);
        });
}