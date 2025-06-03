// js/catalogo.js
document.addEventListener('DOMContentLoaded', () => {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const contenedor = document.getElementById('catalogo-salones');

    salones.forEach(salon => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="imagenes/salon_1.jpg" class="card-img-top" alt="${salon.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${salon.nombre}</h5>
                        <p class="card-text">${salon.direccion}</p>
                        <p class="card-text">${salon.descripcion}</p>
                        <a href="reserva.html?salon=${encodeURIComponent(salon.nombre)}" class="btn btn-primary">Reservar</a>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += card;
    });
});