
if (sessionStorage.getItem('usuario')) {
  alert('Ya habías iniciado sesión. Redirigiendo al formulario...');
  window.location.href = 'altaSalon.html';
}


document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usuario,
          password: contrasena
})
});

    const data = await response.json();
    console.log(data);


    if (response.ok) {
      sessionStorage.setItem('usuario', data.username);
      sessionStorage.setItem('token', data.token);
      alert('Inicio de sesión exitoso');
      window.location.href = 'altaSalon.html';
    } else {
      alert('Error: ' + (data.message || 'Usuario o contraseña incorrectos'));
    }
  } catch (error) {
    console.error('Error en la conexión:', error);
    alert('No se pudo establecer conexión con el servidor');
  }
  
});