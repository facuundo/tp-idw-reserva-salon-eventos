document.addEventListener("DOMContentLoaded", () => {
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    const contenedor = document.getElementById("contenedorCatalogo");

    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (salones.length === 0) {
        contenedor.innerHTML = `<p class="text-muted">No hay salones cargados aún.</p>`;
        return;
    }

    salones.forEach((salon, index) => {
        const col = document.createElement("div");
        col.className = "col";

        col.innerHTML = `
        <div class="card h-100 shadow">
            ${salon.imagen ? `<img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">` : ""}
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${salon.nombre}</h5>
                <p class="card-subtitle mb-1 text-muted">${salon.direccion}</p>
                <p class="badge bg-secondary mb-2">${salon.tipo}</p>
                <p class="card-text flex-grow-1">${salon.descripcion}</p>
                <a href="reserva.html?salon=${encodeURIComponent(salon.nombre)}" class="btn btn-primary mt-auto">Reservar</a>
            </div>
        </div>
        `;

        contenedor.appendChild(col);
    });
});
