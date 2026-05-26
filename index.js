let deferredPrompt;
const btnInstalar = document.getElementById('btn-instalar');

// 1. Registrar el Service Worker de fondo de manera limpia
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito.', reg.scope))
      .catch((err) => console.error('Error al registrar el Service Worker:', err));
  });
}

// 2. Capturar el evento de instalación que dispara el navegador del celular
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir que el navegador muestre su aviso automático molesto en barra inferior
  e.preventDefault();
  // Guardar el evento en nuestra variable para usarlo en nuestro botón diseñado
  deferredPrompt = e;
  // Hacer que nuestro botón sea visible o esté listo para interactuar
  if (btnInstalar) {
    btnInstalar.style.cursor = 'pointer';
  }
});

// 3. Escuchar el toque o clic en el botón "Agregar a la Pantalla"
if (btnInstalar) {
  btnInstalar.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Si el evento de instalación ya fue capturado y está listo
    if (deferredPrompt) {
      // Mostrar la caja de diálogo nativa de instalación del teléfono
      deferredPrompt.prompt();
      
      // Esperar a ver si el usuario aceptó o rechazó la instalación
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó instalar MeumProyect.');
        } else {
          console.log('El usuario rechazó la instalación.');
        }
        // Limpiar la variable para que no se duplique el evento
        deferredPrompt = null;
      });
    } else {
      // Mensaje de respaldo si la app ya está instalada o el navegador no la soporta aún
      alert('La tarjeta digital ya está instalada o tu navegador la ha agregado a la pantalla principal.');
    }
  });
}

// Opcional: Detectar si la aplicación ya se instaló con éxito desde cualquier otra vía
window.addEventListener('appinstalled', () => {
  console.log('MeumProyect fue instalada con éxito en el dispositivo.');
  deferredPrompt = null;
});