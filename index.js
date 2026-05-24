/* ==========================================================================
   LÓGICA INTERACTIVA Y CONEXIÓN PWA - MEUMPROYECT
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

    // 2. Escucha del evento secreto del navegador para mostrar el botón
    window.addEventListener('beforeinstallprompt', (e) => {
        // Evita que el navegador intente hacer las cosas a su manera antigua
        e.preventDefault();
        // Guarda el evento en nuestra caja
        eventoInstalacion = e;
        // Hace visible el botón de instalación en la tarjeta digital
        if (botonInstalar) {
            botonInstalar.style.display = 'flex';
        }
    });

    // 3. Acción al presionar el botón de instalar
    if (botonInstalar) {
        botonInstalar.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!eventoInstalacion) return;
            
            // Muestra la pregunta nativa del celular o PC
            eventoInstalacion.prompt();
            
            // Espera a ver qué decide el usuario
            const { outcome } = await eventoInstalacion.userChoice;
            console.log(`El usuario decidió: ${outcome}`);
            
            // Limpiamos la caja porque el evento ya se usó
            eventoInstalacion = null;
            // Escondemos el botón ya que se cumplió la misión
            botonInstalar.style.display = 'none';
        });
    }

    // Ocultar botón si ya está instalada la app
    window.addEventListener('appinstalled', () => {
        console.log('¡MeumProyect instalada con éxito!');
        if (botonInstalar) {
            botonInstalar.style.display = 'none';
        }
        eventoInstalacion = null;
    });
});

// CABLE LÓGICO PARA EL SERVICE WORKER
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Sintonía de PWA enraizada con éxito en la Cabaña'))
            .catch(err => console.log('Circunstancia con el registro del motor', err));
    });
}