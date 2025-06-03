// js/altaSalon.js
import { INIT_DATA } from './init.js';

document.addEventListener('DOMContentLoaded', () => {
    cargarSalones();
    document.getElementById('formSalon').addEventListener('submit', guardarSalon);
});

function cargarSalones() {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const tbody = document.getElementById('tablaSalones');
    tbody.innerHTML = '';

    salones.forEach((salon, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td>
                <button class="btn btn-warning btn-sm editar" data-id="${index}">Editar</button>
                <button class="btn btn-danger btn-sm eliminar" data-id="${index}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Eventos para botones
    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', editarSalon);
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', eliminarSalon);
    });
}

function guardarSalon(e) {
    e.preventDefault();
    const id = document.getElementById('salon-id').value;
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const descripcion = document.getElementById('descripcion').value;

    const salones = JSON.parse(localStorage.getItem('salones'));
    
    if (id === '') {
        // Nuevo salón
        salones.push({ nombre, direccion, descripcion });
    } else {
        // Editar salón existente
        salones[id] = { nombre, direccion, descripcion };
    }

    localStorage.setItem('salones', JSON.stringify(salones));
    document.getElementById('formSalon').reset();
    cargarSalones();
}

function editarSalon(e) {
    const id = e.target.getAttribute('data-id');
    const salones = JSON.parse(localStorage.getItem('salones'));
    const salon = salones[id];

    document.getElementById('salon-id').value = id;
    document.getElementById('nombre').value = salon.nombre;
    document.getElementById('direccion').value = salon.direccion;
    document.getElementById('descripcion').value = salon.descripcion;
}

function eliminarSalon(e) {
    const id = e.target.getAttribute('data-id');
    const salones = JSON.parse(localStorage.getItem('salones'));
    
    salones.splice(id, 1);
    localStorage.setItem('salones', JSON.stringify(salones));
    cargarSalones();
}