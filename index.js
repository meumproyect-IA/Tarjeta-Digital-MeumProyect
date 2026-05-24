/* ==========================================================================
   LÓGICA INTERACTIVA - MEUMPROYECT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.boton-interactivo');

    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            // Añade la clase de animación de pulso neón al hacer clic
            this.classList.add('click-animacion');
            
            // Remueve la clase después de que termine la animación para que pueda repetirse
            setTimeout(() => {
                this.classList.remove('click-animacion');
            }, 400);
        });
    });
});
// Cable lógico para activar la instalación como aplicación (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./index.js')
            .then(reg => console.log('Sintonía de PWA activada con éxito'))
            .catch(err => console.log('Circunstancia con el registro', err));
    });
}