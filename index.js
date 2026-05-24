if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

let deferredPrompt;
const btnInstalar = document.getElementById('btn-instalar');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

btnInstalar.addEventListener('click', (e) => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
    }
});