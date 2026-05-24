/* ==========================================================================
   LÓGICA INTERACTIVA Y CONEXIÓN PWA - MEUMPROYECT (PARCHE DE PRUEBA)
   ========================================================================== */

let eventoInstalacion = null;

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.boton-interactivo');
    const botonInstalar = document.getElementById('btn-instalar');

    // 1. Animación de pulso neón para los botones
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            this.classList.add('click-animacion');
            setTimeout(() => {
                this.classList.remove('click-animacion');
            }, 400);
        });
    });

    // 2. Forzamos la visibilidad del botón para pruebas
    if (botonInstalar) {
        botonInstalar.style.display = 'flex';
    }

    // Escucha del evento secreto
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        eventoInstalacion = e;
    });

    // 3. Acción al presionar el botón de instalar
    if (botonInstalar) {
        botonInstalar.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (eventoInstalacion) {
                eventoInstalacion.prompt();
                const { outcome } = await eventoInstalacion.userChoice;
                console.log(`El usuario decidió: ${outcome}`);
                eventoInstalacion = null;
            } else {
                console.log('El navegador no permite la instalación en este momento.');
                alert('La función de instalación no está disponible en este navegador o ya instalaste la tarjeta.');
            }
        });
    }
});

// CABLE LÓGICO PARA EL SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Sintonía de PWA enraizada'))
            .catch(err => console.log('Circunstancia con el registro', err));
    });
}