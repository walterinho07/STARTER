// ===================================================================
// 1. DEFINIZIONI GLOBALI (Carica i suoni subito per iOS)
// ===================================================================

// Nomi file aggiornati: pronti, getset, go (tutti .wav)
const suonoPronti = new Audio('audio/pronti.wav');
const suonoPartenza = new Audio('audio/getset.wav'); 
const suonoSparo = new Audio('audio/go.wav');       

const startButton = document.getElementById('startButton');
const messaggioDiv = document.getElementById('messaggio');

let isRunning = false;

// ===================================================================
// 2. FUNZIONE SALVA-VITA PER IPHONE (Sblocco Audio)
// ===================================================================

function sbloccaAudioiOS() {
    // Tenta di riprodurre e mettere in pausa subito tutti i suoni.
    // Questo dice a iOS: "L'utente ha interagito, sblocca questi file!"
    //suonoPronti.play().then(() => { suonoPronti.pause(); suonoPronti.currentTime = 0; }).catch(() => {});
    suonoPartenza.play().then(() => { suonoPartenza.pause(); suonoPartenza.currentTime = 0; }).catch(() => {});
    suonoSparo.play().then(() => { suonoSparo.pause(); suonoSparo.currentTime = 0; }).catch(() => {});
}

// ===================================================================
// 3. FUNZIONE HELPER
// ===================================================================

function playSound(audioObject, text) {
    messaggioDiv.textContent = text;
    audioObject.currentTime = 0; // Riavvolge il suono all'inizio
    audioObject.play().catch(e => console.log("Errore riproduzione:", e));
}

// ===================================================================
// 4. LOGICA DELLA SEQUENZA
// ===================================================================

function startStarter() {
    if (isRunning) return;

    // --- PUNTO CRUCIALE: SBLOCCO AL CLICK ---
    sbloccaAudioiOS(); 
    // ----------------------------------------

    isRunning = true;
    startButton.disabled = true;
    console.log("--- Sequenza Avviata ---");

    // FASE 1: PRONTI
    playSound(suonoPronti, "PRONTI (On Your Marks)");

    // TEMPO TRA PRONTI E GET SET (es. 3000 = 3 secondi)
    const RITARDO_PRONTI_PARTENZA = 8000; 

    // FASE 2: PARTENZA (GET SET)
    setTimeout(() => {
        playSound(suonoPartenza, "PARTENZA (Get Set)");

        // Calcolo ritardo casuale per lo sparo (es. tra 2 e 5 secondi)
        const minRitardo = 1500; 
        const maxRitardo = 3000; 
        const ritardoCasuale = Math.random() * (maxRitardo - minRitardo) + minRitardo;

        console.log(`Ritardo sparo: ${ritardoCasuale.toFixed(0)} ms`);

        // FASE 3: SPARO (GO)
        setTimeout(() => {
            playSound(suonoSparo, "SPARO (Go)!");
            
            isRunning = false;
            startButton.disabled = false;

        }, ritardoCasuale);

    }, RITARDO_PRONTI_PARTENZA);
}

// ===================================================================
// 5. INIZIALIZZAZIONE PULITA
// ===================================================================

startButton.removeEventListener('click', startStarter);
startButton.addEventListener('click', startStarter);


