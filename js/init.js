// js/init.js
export const INIT_DATA = {
    salones: [],
    servicios: [],
    reservas: []
};

if (!localStorage.getItem('salones')) {
    localStorage.setItem('salones', JSON.stringify(INIT_DATA.salones));
}

if (!localStorage.getItem('servicios')) {
    localStorage.setItem('servicios', JSON.stringify(INIT_DATA.servicios));
}

if (!localStorage.getItem('reservas')) {
    localStorage.setItem('reservas', JSON.stringify(INIT_DATA.reservas));
}