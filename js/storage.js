export function inicializarLocalStorage() {
  if (!localStorage.getItem('salones')) {
    const salonesIniciales = [
      { id: 1, nombre: "Salón Azul", descripcion: "Ideal para fiestas infantiles", capacidad: 50, direccion: "Calle Falsa 123" },
      { id: 2, nombre: "Salón Dorado", descripcion: "Bodas y eventos corporativos", capacidad: 120, direccion: "Av. Principal 456" }
    ];
    localStorage.setItem('salones', JSON.stringify(salonesIniciales));
  }
}