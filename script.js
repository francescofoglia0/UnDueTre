document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('card-container');
    const giraCartaBtn = document.getElementById('gira-carta-btn');
    const rigiocaBtn = document.getElementById('rigioca-btn');
    const statisticheBtn = document.getElementById('statistiche-btn');
    const mescolaMazzoBtn = document.getElementById('mescola-mazzo-btn');
    const result = document.getElementById('result');
    const statsContainer = document.getElementById('stats-container');
    const contatoreCarte = document.getElementById('contatore-carte');
    const mazzoCarte = document.getElementById('mazzo-carte');
    const mazzoContainer = document.getElementById('mazzo-container');
    const loseMessage = document.getElementById('lose-message');
    const winMessage = document.getElementById('win-message');

    const mazzo = [
        "1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C",
        "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D",
        "1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S",
        "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B"
    ];

    let mazzoMescolato = [];
    let indiceCarta = 0;
    let numeroAtteso = 1;
    let carteRimanenti = 40;
    let partitaInCorso = false;
    let partiteGiocate = 0;
    let partiteVinte = 0;

    function aggiornaContatoreCarte() {
        contatoreCarte.textContent = `Carte rimanenti: ${carteRimanenti}`;
    }

    function scorrimentoAutomatico() {
        // Scorrere automaticamente verso il fondo della pagina
        requestAnimationFrame(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    function mescolaMazzo() {
        
        mazzoMescolato = [...mazzo];
        for (let i = mazzoMescolato.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mazzoMescolato[i], mazzoMescolato[j]] = [mazzoMescolato[j], mazzoMescolato[i]];
        }
        
        // mazzoMescolato = [
        //     "2C", "3C", "1C", "4C", "5C", "6C", "7C", "8C", "9C", "10C",
        //     "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D",
        //     "1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S",
        //     "2B", "3B", "1B", "4B", "5B", "6B", "7B", "8B", "9B", "10B"
        // ];

        indiceCarta = 0;
        numeroAtteso = 1;
        carteRimanenti = 40;
        aggiornaContatoreCarte();
        cardContainer.innerHTML = '';
        result.textContent = '';
        giraCartaBtn.style.display = 'inline';
        giraCartaBtn.disabled = false; // Assicura che il pulsante sia riabilitato
        rigiocaBtn.style.display = 'none';
        statsContainer.style.display = 'none';
        statisticheBtn.style.display = 'inline';
        mescolaMazzoBtn.style.display = 'inline';
        mazzoCarte.classList.remove('mescola-animazione');
        mazzoContainer.style.display = 'block';
        loseMessage.style.display = 'none'; // Nasconde il messaggio di perdita
        winMessage.style.display = 'none';
        partitaInCorso = true;
        
    }

    function mostraPulsanteRigioca() {
        giraCartaBtn.style.display = 'none';
        rigiocaBtn.style.display = 'inline';
        statisticheBtn.style.display = 'inline';
        mescolaMazzoBtn.style.display = 'none';
        partitaInCorso = false;
    }

    function mostraMessaggioPerdita() {
        loseMessage.style.display = 'block';
    }

    function mostraMessaggioVittoria(){
        winMessage.style.display = 'block';
    }

    function aggiornaStatistiche() {
        const percentualeVittoria = partiteGiocate > 0 ? ((partiteVinte / partiteGiocate) * 100).toFixed(2) : 0;
        document.getElementById('stats').textContent = `Partite giocate: ${partiteGiocate}, Partite vinte: ${partiteVinte}, Percentuale di vittoria: ${percentualeVittoria}%`;
    }

    giraCartaBtn.addEventListener('click', function() {
        if (!partitaInCorso) return;
        mescolaMazzoBtn.style.display = 'none';
        statisticheBtn.style.display = 'none';
        mazzoContainer.style.display = 'none'; // Nasconde il mazzo quando si gira una carta

        if (indiceCarta >= mazzoMescolato.length) {
            winMessage.style.display = 'block';
            result.textContent = "Hai VINTO!";
            partiteVinte++;
            partiteGiocate++;
            aggiornaStatistiche();
            mostraPulsanteRigioca();
            return;
        }

        const carta = mazzoMescolato[indiceCarta];
        const cartaImg = document.createElement('img');
        cartaImg.src = `${carta}.png`;
        cartaImg.alt = carta;

        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper';

        const numeroCarta = document.createElement('span');
        numeroCarta.className = 'card-number';
        numeroCarta.textContent = numeroAtteso;

        cardWrapper.appendChild(cartaImg);
        cardWrapper.appendChild(numeroCarta);
        cardContainer.appendChild(cardWrapper);

        // Scorrere automaticamente verso il fondo della pagina se si inizia una nuova riga
        if (indiceCarta % 3 === 0) {
            scorrimentoAutomatico();
        }

        const valoreCarta = parseInt(carta) || 0;

        if (numeroAtteso === valoreCarta) {
            loseMessage.style.display = 'block'; // Mostra il messaggio di perdita
            result.textContent = "Gioco finito, hai perso!";
            partiteGiocate++;
            aggiornaStatistiche();
            mostraPulsanteRigioca();
        } else {
            numeroAtteso++;
            if (numeroAtteso > 3) {
                numeroAtteso = 1;
            }
            indiceCarta++;
            carteRimanenti--;
            aggiornaContatoreCarte();
        }
    });

    mescolaMazzoBtn.addEventListener('click', function() {
        mazzoCarte.classList.add('mescola-animazione');
        setTimeout(() => {
        mescolaMazzo();
        }, 1000); // Durata dell'animazione prima di mescolare effettivamente il mazzo
    });

    rigiocaBtn.addEventListener('click', function() {
        mescolaMazzo();
    });

    statisticheBtn.addEventListener('click', function() {
        statsContainer.style.display = statsContainer.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && partitaInCorso) {
            giraCartaBtn.click();
            event.preventDefault();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Enter' && !partitaInCorso) {
            rigiocaBtn.click();
            event.preventDefault();
        }
    });

    mescolaMazzo(); // Inizia la prima partita mescolando il mazzo
});
