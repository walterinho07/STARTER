// ===================================================================
// 1. DEFINIZIONI
// ===================================================================

// Percorsi dei file audio (ASSUMENDO CHE SIANO NELLA CARTELLA 'audio/')
const AUDIO_PRONTI = 'audio/pronti.wav';
const AUDIO_PARTENZA = 'audio/getset.wav';
const AUDIO_SPARO = 'audio/go.wav';

// Riferimenti agli elementi HTML
const startButton = document.getElementById('startButton');
const messaggioDiv = document.getElementById('messaggio');

// Flag per prevenire partenze multiple
let isRunning = false;


// ===================================================================
// 2. FUNZIONI HELPER
// ===================================================================

/**
 * Riproduce un file audio e aggiorna lo stato visivo.
 * @param {string} filePath - Il percorso del file audio (es. 'audio/pronti.mp3').
 * @param {string} statusText - Il testo da visualizzare nell'interfaccia.
 */
function playSound(filePath, statusText) {
    messaggioDiv.textContent = statusText;
    const sound = new Audio(filePath);
    
    // I browser moderni bloccano l'autoplay, ma permettono la riproduzione 
    // se avviata da un'azione dell'utente (come il click sul pulsante)
    sound.play().catch(error => {
        console.error(`Errore durante la riproduzione di ${filePath}:`, error);
        messaggioDiv.textContent = "Errore Audio: Assicurati di aver cliccato il pulsante per iniziare.";
    });
}


// ===================================================================
// 3. FUNZIONE PRINCIPALE DI START
// ===================================================================

function startStarter() {
    if (isRunning) return; // Impedisce l'avvio se la sequenza è già in corso
    isRunning = true;
    startButton.disabled = true; // Disabilita il pulsante durante l'esecuzione
    
    console.log("--- Sequenza di Partenza Avviata ---");

    // --- FASE 1: PRONTI (ON YOUR MARKS) ---
    
    playSound(AUDIO_PRONTI, "PRONTI (On Your Marks)");

    // Pausa Fissa: 1 secondo (1000 ms) tra Pronti e Partenza
    const RITARDO_PRONTI_PARTENZA = 5000; 

    // --- FASE 2: PARTENZA (SET) ---

    setTimeout(() => {
        playSound(AUDIO_PARTENZA, "PARTENZA (Set)");

        // Calcolo del Ritardo Casuale (Tempo di Attesa dello Sparo)
        // Intervallo IAAF minimo e massimo tipico è tra 0.1 e 6.0 secondi.
        const minRitardo = 2000; // 1.0 secondi
        const maxRitardo = 3000; // 2.0 secondi

        // Genera un numero casuale tra minRitardo e maxRitardo
        const ritardoCasuale = Math.random() * (maxRitardo - minRitardo) + minRitardo;

        console.log(`> Ritardo Casuale Sparo: ${ritardoCasuale.toFixed(0)} ms`);

        // --- FASE 3: SPARO ---
        
        // Programma lo Sparo dopo il ritardo casuale
        setTimeout(() => {
            
            // Inizia la misurazione del tempo del cronometro qui! (TODO)
            
            playSound(AUDIO_SPARO, "SPARO!");
            console.log("SPARO ESEGUITO!");
            
            // Ripristina lo stato
            isRunning = false;
            startButton.disabled = false;

        }, ritardoCasuale);

    }, RITARDO_PRONTI_PARTENZA);
}


// ===================================================================
// 4. INIZIALIZZAZIONE
// ===================================================================

startButton.addEventListener('click', startStarter);