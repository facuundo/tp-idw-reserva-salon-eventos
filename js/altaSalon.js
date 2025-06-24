document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('usuario')) {
        alert('Debes iniciar sesión primero');
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById("formSalon");
    const tabla = document.getElementById("tablaSalones");
    const imagenInput = document.getElementById("imagen");
    const btnSubmit = form.querySelector('button[type="submit"]');

    let indiceEdicion = null;  
    renderizarSalones();

    const salir = document.getElementById("salir");
    if (salir) {
        salir.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const tipo = document.getElementById("tipo").value;
        const descripcion = document.getElementById("descripcion").value.trim();
        const imagen = imagenInput.files[0];

        if (!nombre || !direccion || !tipo || !descripcion || (!imagen && indiceEdicion === null)) {
            alert("Completá todos los campos y subí una imagen.");
            return;
        }

        const procesarSalon = (imagenBase64) => {
            const nuevoSalon = { nombre, direccion, tipo, descripcion, imagen: imagenBase64 };
            const salones = JSON.parse(localStorage.getItem("salones")) || [];

            if (indiceEdicion === null) {
                salones.push(nuevoSalon);
                alert("Salón guardado exitosamente.");
            } else {
                salones[indiceEdicion] = {
                    ...salones[indiceEdicion],
                    nombre, direccion, tipo, descripcion,
                    ...(imagenBase64 && { imagen: imagenBase64 }) 
                };
                alert("Salón actualizado.");
                indiceEdicion = null;
                btnSubmit.textContent = "Guardar salón";
            }

            localStorage.setItem("salones", JSON.stringify(salones));
            form.reset();
            renderizarSalones();
        };

        if (imagen) {
            const lector = new FileReader();
            lector.onload = (event) => procesarSalon(event.target.result);
            lector.readAsDataURL(imagen);
        } else {
            
            const salones = JSON.parse(localStorage.getItem("salones")) || [];
            const imagenBase64 = salones[indiceEdicion]?.imagen;
            procesarSalon(imagenBase64);
        }
    });

    function renderizarSalones() {
        if (!tabla) return;
        tabla.innerHTML = "";

        const salones = JSON.parse(localStorage.getItem("salones")) || [];

        salones.forEach((salon, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${salon.nombre}</td>
                <td>${salon.direccion}</td>
                <td>${salon.descripcion}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="editarSalon(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${index})">Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    window.eliminarSalon = function (index) {
        const salones = JSON.parse(localStorage.getItem("salones")) || [];
        if (confirm("¿Estás seguro de que querés eliminar este salón?")) {
            salones.splice(index, 1);
            localStorage.setItem("salones", JSON.stringify(salones));
            renderizarSalones();
        }
    };

    window.editarSalon = function (index) {
        const salones = JSON.parse(localStorage.getItem("salones")) || [];
        const salon = salones[index];

        document.getElementById("nombre").value = salon.nombre;
        document.getElementById("direccion").value = salon.direccion;
        document.getElementById("tipo").value = salon.tipo;
        document.getElementById("descripcion").value = salon.descripcion;

        indiceEdicion = index;
        btnSubmit.textContent = "Actualizar salón";
        alert("Modificá los datos y presioná 'Actualizar salón'");
    };
});
