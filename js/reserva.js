// js/reserva.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const salon = params.get('salon');
    document.getElementById('salon').value = salon;

    document.getElementById('form-reserva').addEventListener('submit', (e) => {
        e.preventDefault();
        const reserva = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            fecha: document.getElementById('fecha').value,
            salon: salon
        };

        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        alert('Reserva realizada con éxito!');
        window.location.href = 'index.html';
    });
});