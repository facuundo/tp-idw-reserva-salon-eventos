//export const initLocalStorage = () => {
//    if (!localStorage.getItem("salones")) {
//        localStorage.setItem("salones", JSON.stringify([]));
//    }
//};
export const initLocalStorage = () => {
  if (!localStorage.getItem("salones")) {
    const salonesIniciales = [
      {
        nombre: "Jupiter",
        direccion: "Av los planetas 208",
        descripcion: "Fiesta de Dinosaurios",
        imagen: "imagenes/salon_1.jpg"
      },
      {
        nombre: "Aurora",
        direccion: "Nogoyá 1745",
        descripcion: "Vista panorámica con parrilla",
        imagen: "imagenes/salon_2.jpg"
      },
      {
        nombre: "Vitra",
        direccion: "San Martín 3546",
        descripcion: "Con proyector y Wi-Fi",
        imagen: "imagenes/salon_3.jpg"
      }
    ];
    localStorage.setItem("salones", JSON.stringify(salonesIniciales));
  }
};
