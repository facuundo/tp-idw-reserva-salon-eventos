document.addEventListener('DOMContentLoaded', () => {
    const salir = document.getElementById("salir");
    if (salir) {
        salir.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = "js/login.html";
        });
    }

    const form = document.getElementById("formSalon");
    let editIndex = -1;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;
        const descripcion = document.getElementById("descripcion").value;

        const salon = { nombre, direccion, descripcion };
        const salones = JSON.parse(localStorage.getItem("salones")) || [];

        if (editIndex === -1) {
            salones.push(salon); 
        } else {
            salones[editIndex] = salon;
            editIndex = -1;
        }

        localStorage.setItem("salones", JSON.stringify(salones));
        form.reset();
        mostrarSalones();
    });

    window.eliminarSalon = function (index) {
        const salones = JSON.parse(localStorage.getItem("salones")) || [];
        salones.splice(index, 1);
        localStorage.setItem("salones", JSON.stringify(salones));
        mostrarSalones();
    };

    window.editarSalon = function (index) {
        const salones = JSON.parse(localStorage.getItem("salones")) || [];
        const salon = salones[index];

        document.getElementById("nombre").value = salon.nombre;
        document.getElementById("direccion").value = salon.direccion;
        document.getElementById("descripcion").value = salon.descripcion;

        editIndex = index;
    };

    mostrarSalones();
});

function mostrarSalones() {
    const tablaBody = document.querySelector("#tablaSalones");
    tablaBody.innerHTML = "";

    const salones = JSON.parse(localStorage.getItem("salones")) || [];

    salones.forEach((salon, i) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editarSalon(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarSalon(${i})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}
