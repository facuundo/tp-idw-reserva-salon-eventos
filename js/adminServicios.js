// js/adminServicios.js
document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    document.getElementById('form-servicio').addEventListener('submit', guardarServicio);
});

function cargarServicios() {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const tbody = document.querySelector('#tabla-servicios tbody');
    tbody.innerHTML = '';

    servicios.forEach((servicio, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>
                <button class="btn btn-warning btn-sm editar" data-id="${index}">Editar</button>
                <button class="btn btn-danger btn-sm eliminar" data-id="${index}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Eventos para botones
    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', editarServicio);
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', eliminarServicio);
    });
}

function guardarServicio(e) {
    e.preventDefault();
    const id = document.getElementById('servicio-id').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    const servicios = JSON.parse(localStorage.getItem('servicios'));
    
    if (id === '') {
        servicios.push({ nombre, descripcion });
    } else {
        servicios[id] = { nombre, descripcion };
    }

    localStorage.setItem('servicios', JSON.stringify(servicios));
    document.getElementById('form-servicio').reset();
    cargarServicios();
}

function editarServicio(e) {
    const id = e.target.getAttribute('data-id');
    const servicios = JSON.parse(localStorage.getItem('servicios'));
    const servicio = servicios[id];

    document.getElementById('servicio-id').value = id;
    document.getElementById('nombre').value = servicio.nombre;
    document.getElementById('descripcion').value = servicio.descripcion;
}

function eliminarServicio(e) {
    const id = e.target.getAttribute('data-id');
    const servicios = JSON.parse(localStorage.getItem('servicios'));
    
    servicios.splice(id, 1);
    localStorage.setItem('servicios', JSON.stringify(servicios));
    cargarServicios();
}