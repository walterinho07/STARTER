// ===================================================================
// 1. DEFINIZIONI GLOBALI
// ===================================================================

const suonoPronti = new Audio('audio/pronti.wav');
const suonoPartenza = new Audio('audio/getset.wav'); 
const suonoSparo = new Audio('audio/go.wav');       

const startButton = document.getElementById('startButton');
const messaggioDiv = document.getElementById('messaggio');

let isRunning = false;
let audioSbloccato = false; // <--- NUOVA VARIABILE PER EVITARE L'ECO

// ===================================================================
// 2. FUNZIONE DI SBLOCCO (MODIFICATA)
// ===================================================================

function sbloccaAudioiOS() {
    // Esegue play e pausa velocemente su Partenza e Sparo
    // Nota: Pronti non serve perché suona subito dopo il click
    suonoPartenza.play().then(() => { suonoPartenza.pause(); suonoPartenza.currentTime = 0; }).catch(() => {});
    suonoSparo.play().then(() => { suonoSparo.pause(); suonoSparo.currentTime = 0; }).catch(() => {});
}

// ===================================================================
// 3. FUNZIONE HELPER
// ===================================================================

function playSound(audioObject, text) {
    messaggioDiv.textContent = text;
    audioObject.currentTime = 0; 
    audioObject.play().catch(e => console.log("Errore play:", e));
}

// ===================================================================
// 4. LOGICA PRINCIPALE
// ===================================================================

function startStarter() {
    if (isRunning) return;

    // --- PUNTO CRUCIALE PER RIMUOVERE L'ECO ---
    // Esegui lo sblocco SOLO se non l'abbiamo già fatto
    if (!audioSbloccato) {
        sbloccaAudioiOS();
        audioSbloccato = true; // Ora ricordiamo che è fatto
        console.log("Audio sbloccato per iOS");
    }
    // ------------------------------------------

    isRunning = true;
    startButton.disabled = true;
    console.log("--- Sequenza Avviata ---");

    // FASE 1: PRONTI
    playSound(suonoPronti, "PRONTI (On Your Marks)");

    // TEMPO TRA PRONTI E PARTENZA
    const RITARDO_PRONTI_PARTENZA = 8000; 

    // FASE 2: PARTENZA
    setTimeout(() => {
        playSound(suonoPartenza, "PARTENZA (Get Set)");

        // Ritardo casuale Sparo
        const minRitardo = 1500; 
        const maxRitardo = 3000; 
        const ritardoCasuale = Math.random() * (maxRitardo - minRitardo) + minRitardo;

        console.log(`Ritardo sparo calcolato: ${ritardoCasuale.toFixed(0)} ms`);

        // FASE 3: SPARO
        setTimeout(() => {
            playSound(suonoSparo, "SPARO (Go)!");
            
            isRunning = false;
            startButton.disabled = false;

        }, ritardoCasuale);

    }, RITARDO_PRONTI_PARTENZA);
}

// ===================================================================
// 5. INIZIALIZZAZIONE
// ===================================================================

startButton.removeEventListener('click', startStarter);
startButton.addEventListener('click', startStarter);




