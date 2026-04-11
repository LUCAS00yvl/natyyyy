// ================= 1. ANIMAÇÃO DE ABERTURA (FRAMES) =================
let hasOpened = false;
const introScreen = document.getElementById('intro-screen');
const introFrame = document.getElementById('intro-frame');
const introContainer = document.getElementById('intro-animation-container');
const hint = document.getElementById('intro-hint');

const frames = [
    "caixa001.png",
    "caixa002.png",
    "caixa003.png",
    "caixa004.png",
    "caixa005.png",
    "caixa006.png",
    "caixa007.png",
    "caixa008.png"
];

// SEGURANÇA: Força o primeiro frame a aparecer instantaneamente no ecrã 
// assim que a página carrega, evitando qualquer texto quebrado.
if (introFrame) {
    introFrame.src = frames[0];
}

// Pré-carregar as imagens na memória para garantir que a animação não engasga
frames.forEach(src => {
    const img = new Image();
    img.src = src;
});

function openSite() {
    if (hasOpened) return;
    hasOpened = true;
    
    if (hint) hint.style.opacity = '0'; // Esconde o texto piscante

    let currentFrame = 0;
    
    // Dispara o zoom IMEDIATAMENTE no frame 1
    if (introContainer) introContainer.classList.add('zoom-active');
    
    // Inicia a troca rápida de imagens (80 milissegundos por frame)
    const frameInterval = setInterval(() => {
        currentFrame++;
        
        if (currentFrame < frames.length) {
            introFrame.src = frames[currentFrame];
        } else {
            clearInterval(frameInterval);
            
            // O zoom já está a acontecer junto com os frames, 
            // só precisamos remover a tela preta de fundo suavemente
            setTimeout(() => {
                if (introScreen) introScreen.style.opacity = '0';
                document.body.style.overflowY = 'auto'; // Libera o scroll
                
                setTimeout(() => { 
                    if (introScreen) introScreen.style.display = 'none'; 
                    if(typeof typeTerminal === 'function') typeTerminal(); 
                    if(typeof startFloatingWords === 'function') startFloatingWords();
                }, 800); 
                
            }, 100); 
        }
    }, 80); 
}

window.addEventListener('wheel', openSite);
window.addEventListener('touchstart', openSite);
window.addEventListener('click', openSite);
window.addEventListener('keydown', openSite);

// ================= 2. ANIMAÇÕES DE SCROLL =================
let windowErrorShown = false;
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if(entry.target.id === 'final-heart-section' && !windowErrorShown) {
                setTimeout(showWindowsError, 1000);
                windowErrorShown = true;
            }
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in-section').forEach(s => obs.observe(s));

// ================= 3. CONTADOR DE TEMPO =================
function updateCounter() {
    const startDate = new Date(2025, 7, 13);
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    let text = "";
    if (years > 0) text += `${years} ano${years > 1 ? 's' : ''}, `;
    if (months > 0 || years > 0) text += `${months} mês${months !== 1 ? 'es' : ''} e `;
    text += `${days} dia${days !== 1 ? 's' : ''}`;

    const counterEl = document.getElementById('love-counter');
    if (counterEl) counterEl.innerText = text;
}
setInterval(updateCounter, 1000);
updateCounter();

// ================= 4. TERMINAL DA LINHA DE CÓDIGO =================
const terminalLines = [
    "> Inicializando Sistema de Amar a Naty...",
    "> Analisando compatibilidade dos dados...",
    "> [Cálculo] Paciência(Lucas) + Foco(Naty) = Sucesso garantido no Stardew Valley",
    "> [Cálculo] (Amor * Respeito) ^ Companheirismo = Infinito",
    "> Conectando ao servidor principal do coração: [CONECTADO]",
    "> AVISO: A quantidade de amor processada excedeu os limites de memória física.",
    "> print('Eu te amo eternamente, Naty');"
];

function typeTerminal() {
    const termBody = document.getElementById('terminal-text');
    if(!termBody) return;
    
    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
        if (lineIndex < terminalLines.length) {
            if (charIndex === 0) termBody.innerHTML += '<br>';
            if (charIndex < terminalLines[lineIndex].length) {
                termBody.innerHTML += terminalLines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, Math.random() * 40 + 10);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeChar, 600);
            }
        } else {
            termBody.innerHTML += '<span class="cursor"></span>'; 
        }
    }
    typeChar();
}

// ================= 5. CAÇA-NÍQUEL DO DESTINO =================
let isSpinning = false;
function spinSlots() {
    if (isSpinning) return;
    isSpinning = true;
    
    const btn = document.getElementById('btn-spin');
    const msg = document.getElementById('slot-message');
    if(!btn || !msg) return;
    
    btn.disabled = true;
    msg.style.display = 'none';

    const emojis = ['🍒', '🍋', '🔔', '🍉', '⭐', '❤️'];
    const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
    
    let spins = 0;
    const spinInterval = setInterval(() => {
        reels.forEach(reel => {
            if(reel) reel.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        });
        spins++;

        if (spins > 20) {
            clearInterval(spinInterval);
            reels.forEach(reel => { if(reel) reel.innerText = '❤️'; });
            msg.style.display = 'block';
            btn.disabled = false;
            isSpinning = false;
        }
    }, 100);
}

// ================= 6. HACK CYBERPUNK =================
const cyberGrid = document.getElementById('cyber-grid');
if(cyberGrid) {
    const hexCodes = [
        '1C', 'E9', 'FF', '55', 'BD',
        'FF', '1C', 'BD', '55', '1C',
        '55', 'BD', 'E9', 'FF', 'E9',
        '1C', '55', 'FF', 'BD', 'E9',
        'E9', 'BD', '1C', '55', 'FF'
    ];
    const correctSequence = ['1C', 'BD', '55'];
    let cyberBuffer = [];

    hexCodes.forEach((hex, index) => {
        const cell = document.createElement('div');
        cell.className = 'cyber-cell';
        cell.innerText = hex;
        
        cell.addEventListener('click', () => {
            if(cyberBuffer.length < 3 && !cell.classList.contains('cyber-active')) {
                cell.classList.add('cyber-active');
                
                document.getElementById(`buf-${cyberBuffer.length}`).innerText = hex;
                document.getElementById(`buf-${cyberBuffer.length}`).classList.add('filled');
                cyberBuffer.push(hex);
                
                if(cyberBuffer.length === 3) {
                    if(cyberBuffer.join(',') === correctSequence.join(',')) {
                        document.getElementById('cyber-message').style.display = 'block';
                        document.querySelectorAll('.cyber-cell').forEach(c => c.style.pointerEvents = 'none');
                    } else {
                        setTimeout(() => {
                            cyberBuffer = [];
                            document.querySelectorAll('.cyber-buffer').forEach(b => { b.innerText = ''; b.classList.remove('filled'); });
                            document.querySelectorAll('.cyber-cell').forEach(c => c.classList.remove('cyber-active'));
                        }, 500);
                    }
                }
            }
        });
        cyberGrid.appendChild(cell);
    });
}

// ================= 7. CAÇA AOS TESOUROS =================
let heartsFound = 0;
function findHeart(element) {
    if(!element.classList.contains('found')) {
        element.classList.add('found');
        heartsFound++;
        
        const hud = document.getElementById('treasure-hud');
        if(hud) {
            hud.classList.add('visible');
            document.getElementById('treasure-count').innerText = heartsFound;

            if (heartsFound === 5) {
                hud.innerHTML = "<i class='bi bi-stars'></i> Todos os segredos revelados! O nosso amor ilumina o céu.";
                startFireworks();
            }
        }
    }
}

function startFireworks() {
    const fwCanvas = document.getElementById('fireworks-canvas');
    if(!fwCanvas) return;
    const fwCtx = fwCanvas.getContext('2d');
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    fwCanvas.style.zIndex = '9997'; 
    
    const fwParticles = [];
    setInterval(() => {
        const x = Math.random() * fwCanvas.width;
        const y = Math.random() * fwCanvas.height / 2;
        const color = `hsl(${Math.random()*360}, 100%, 50%)`;
        for(let i=0; i<30; i++) {
            fwParticles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                alpha: 1, color: color
            });
        }
    }, 1000);

    function animateFw() {
        fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
        for(let i=0; i<fwParticles.length; i++) {
            const p = fwParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; 
            p.alpha -= 0.01;
            
            fwCtx.globalAlpha = Math.max(0, p.alpha);
            fwCtx.fillStyle = p.color;
            fwCtx.beginPath();
            fwCtx.arc(p.x, p.y, 2, 0, Math.PI*2);
            fwCtx.fill();
            
            if(p.alpha <= 0) { fwParticles.splice(i, 1); i--; }
        }
        fwCtx.globalAlpha = 1;
        requestAnimationFrame(animateFw);
    }
    animateFw();
}

// ================= 8. BLOCK BLAST =================
const gameGrid = document.getElementById('game-grid');
if(gameGrid) {
    const colors = ['#e63946', '#457b9d', '#2a9d8f', '#e9c46a'];
    const gridSize = 8;
    const totalBlocks = gridSize * gridSize; 
    let blocksState = Array(totalBlocks).fill(true); 
    let activeBlocks = totalBlocks;

    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement('div');
        block.classList.add('game-block');
        block.dataset.index = i;
        block.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        block.addEventListener('click', function() {
            if (!blocksState[i]) return;
            
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const toDestroy = [
                i, 
                (row > 0) ? i - gridSize : -1, 
                (row < gridSize - 1) ? i + gridSize : -1, 
                (col > 0) ? i - 1 : -1, 
                (col < gridSize - 1) ? i + 1 : -1 
            ];

            toDestroy.forEach(idx => {
                if (idx >= 0 && idx < totalBlocks && blocksState[idx]) {
                    blocksState[idx] = false;
                    activeBlocks--;
                    const b = gameGrid.querySelector(`[data-index='${idx}']`);
                    b.classList.add('popped');
                }
            });

            if (activeBlocks <= 0) {
                gameGrid.style.opacity = '0';
                setTimeout(() => { 
                    gameGrid.style.display = 'none'; 
                    renderQuestion(); 
                }, 500); 
            }
        });
        gameGrid.appendChild(block);
    }
}

// QUIZ
const quizQuestions = [
    { q: "Qual destas séries é a melhor para maratonar?", b1: "The Big Bang Theory", b2: "Jovem Sheldon" },
    { q: "Quem foca mais na fazenda do Stardew Valley?", b1: "Lucas", b2: "Naty" },
    { q: "O Corinthians vai ganhar títulos este ano?", b1: "Sim", b2: "Com Certeza" },
    { q: "Aceita ser minha para sempre?", isFinal: true }
];
let currentQ = 0;

function renderQuestion() {
    const questionEl = document.getElementById('quiz-question');
    const btnDiv = document.getElementById('quiz-buttons');
    if(!questionEl || !btnDiv) return;

    const q = quizQuestions[currentQ];
    questionEl.innerText = q.q;
    
    if (q.isFinal) {
        btnDiv.innerHTML = `
            <button class="btn btn-success me-3 px-4 py-2 fs-5" onclick="alert('Eu também te amo infinitamente!')">Sim</button>
            <button id="btn-no" class="btn btn-danger px-4 py-2 fs-5" style="position: relative;">Não</button>
        `;
        const btnNo = document.getElementById('btn-no');
        btnNo.addEventListener('mouseover', moveButton);
        btnNo.addEventListener('touchstart', moveButton);
    } else {
        btnDiv.innerHTML = `
            <button class="btn btn-primary me-3 px-4 py-2 fs-5" onclick="nextQuestion()">${q.b1}</button>
            <button class="btn btn-secondary px-4 py-2 fs-5" onclick="nextQuestion()">${q.b2}</button>
        `;
    }
}

function nextQuestion() {
    currentQ++;
    if(currentQ < quizQuestions.length) renderQuestion();
}

function moveButton() {
    const btnNo = document.getElementById('btn-no');
    const maxX = window.innerWidth - btnNo.clientWidth - 40;
    const maxY = window.innerHeight - btnNo.clientHeight - 40;
    btnNo.style.position = 'fixed';
    btnNo.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
    btnNo.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';
    btnNo.style.zIndex = '9999';
}

// ================= 9. COFRE SECRETO =================
function checkPassword() {
    const pass = document.getElementById('vault-pass').value.trim();
    if(pass === '13/08') {
        document.getElementById('vault-content').style.display = 'block';
        document.getElementById('vault-pass').style.border = '2px solid #1db954';
        document.getElementById('vault-pass').disabled = true;
    } else {
        document.getElementById('vault-pass').style.border = '2px solid red';
        document.getElementById('vault-pass').value = '';
        document.getElementById('vault-pass').placeholder = 'Senha incorreta!';
    }
}

// ================= 10. MAPA MODAL & ERRO =================
function updateModal(title, desc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
}

const winErrorBox = document.getElementById('windows-error');
function showWindowsError() { if(winErrorBox) winErrorBox.style.display = 'block'; }
function closeWinError() {
    if(winErrorBox) winErrorBox.style.display = 'none';
    alert('Aviso ignorado. O amor continua a rodar em segundo plano.');
}

// ================= 11. PLAYLIST SPOTIFY =================
const playlist = [
    { title: "Star Shopping", artist: "Lil Peep", src: "star_shopping.mp3" },
    { title: "Nuts", artist: "Lil Peep", src: "nuts.mp3" },
    { title: "Save That Shit", artist: "Lil Peep", src: "save_that_shit.mp3" },
    { title: "Yellow", artist: "Coldplay", src: "yellow.mp3" },
    { title: "Nossa Mensagem", artist: "Lucas", src: "audio_secreto.mp3" }
];
let currentTrack = 0;
const audioEl = document.getElementById('audio-element');
const playIcon = document.getElementById('play-icon');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const playlistContainer = document.getElementById('playlist-container');

if(playlistContainer) {
    playlist.forEach((track, index) => {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'playlist-track';
        trackDiv.id = `track-ui-${index}`;
        trackDiv.innerHTML = `
            <div class="track-number">${index + 1}</div>
            <div>
                <p class="track-title">${track.title}</p>
                <p class="track-artist">${track.artist}</p>
            </div>
        `;
        trackDiv.addEventListener('click', () => {
            currentTrack = index;
            loadTrack(currentTrack);
            if(audioEl) audioEl.play();
            if(playIcon) playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
        });
        playlistContainer.appendChild(trackDiv);
    });
}

function loadTrack(index) {
    if(trackName) trackName.innerText = playlist[index].title;
    if(trackArtist) trackArtist.innerText = playlist[index].artist;
    if(audioEl) audioEl.src = playlist[index].src;
    
    document.querySelectorAll('.playlist-track').forEach(el => el.classList.remove('playing'));
    const trackUi = document.getElementById(`track-ui-${index}`);
    if(trackUi) trackUi.classList.add('playing');
}

function togglePlay() {
    if(!audioEl || !playIcon) return;
    if (audioEl.paused) {
        audioEl.play();
        playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
    } else {
        audioEl.pause();
        playIcon.classList.replace('bi-pause-fill', 'bi-play-fill');
    }
}
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    if(audioEl) audioEl.play();
    if(playIcon) playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
}
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    if(audioEl) audioEl.play();
    if(playIcon) playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
}
loadTrack(0);
if(audioEl) audioEl.addEventListener('ended', nextTrack);

// ================= 12. CÁPSULA DO TEMPO =================
const capsuleDate = new Date(2026, 7, 13);
const currentDate = new Date(); 
const capsuleContent = document.getElementById('capsule-content');
if(capsuleContent && currentDate >= capsuleDate) {
    capsuleContent.innerHTML = `
        <i class="bi bi-unlock-fill fs-1 text-success"></i>
        <p class="mt-2 fw-bold text-success">Cápsula Aberta! Feliz 1 ano de namoro. Eu te amo muito.</p>
    `;
}

// ================= 13. LETREIRO NEON =================
function toggleNeon() {
    document.body.classList.toggle('neon-active');
}

// ================= 14. QUADRO DE MISSÕES =================
function completeQuest(btn) {
    const questCard = btn.closest('.quest-card');
    questCard.classList.add('completed');
    btn.innerText = 'Missão Cumprida!';
    btn.disabled = true;
    btn.classList.replace('btn-outline-dark', 'btn-success');
}

// ================= 15. CALENDÁRIO SEMANAL =================
const calendarGrid = document.getElementById('calendar-grid');
if(calendarGrid) {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dailyMessages = [
        "Até nos domingos de preguiça, tu és a minha paz.",
        "Segunda é difícil, mas o teu sorriso muda tudo.",
        "Terça com T de 'Te amo muito'.",
        "Quarta-feira e eu já estou com saudades de te ver.",
        "Quinta-feira: quase fim de semana para jogarmos juntos!",
        "Sextou! O melhor dia para estarmos juntos.",
        "Sábado perfeito é sempre ao teu lado."
    ];
    const currentDay = new Date().getDay(); 

    daysOfWeek.forEach((day, index) => {
        const door = document.createElement('div');
        door.className = 'calendar-door';
        if(index !== currentDay) door.classList.add('locked');
        
        door.innerHTML = `
            <div class="front">${day}</div>
            <div class="back">${dailyMessages[index]}</div>
        `;
        
        door.addEventListener('click', () => {
            if(index === currentDay) {
                door.classList.add('open');
            } else {
                alert('Ei! Só pode abrir a porta do dia de hoje. A paciência é uma virtude! ❤️');
            }
        });
        calendarGrid.appendChild(door);
    });
}

// ================= 16. QUEBRA-CABEÇAS DESLIZANTE =================
const puzzleBoard = document.getElementById('puzzle-board');
if(puzzleBoard) {
    let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let emptyIdx = 8;
    
    for(let i=0; i<150; i++) {
        const row = Math.floor(emptyIdx / 3);
        const col = emptyIdx % 3;
        const neighbors = [];
        if(row > 0) neighbors.push(emptyIdx - 3);
        if(row < 2) neighbors.push(emptyIdx + 3);
        if(col > 0) neighbors.push(emptyIdx - 1);
        if(col < 2) neighbors.push(emptyIdx + 1);
        
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        [tiles[emptyIdx], tiles[randomNeighbor]] = [tiles[randomNeighbor], tiles[emptyIdx]];
        emptyIdx = randomNeighbor;
    }

    function renderPuzzle() {
        puzzleBoard.innerHTML = '';
        tiles.forEach((val, idx) => {
            const piece = document.createElement('div');
            if(val === 8) {
                piece.className = 'puzzle-piece puzzle-empty';
            } else {
                piece.className = 'puzzle-piece';
                const bgRow = Math.floor(val / 3);
                const bgCol = val % 3;
                piece.style.backgroundPosition = `${bgCol * 50}% ${bgRow * 50}%`;
            }
            piece.addEventListener('click', () => moveTile(idx));
            puzzleBoard.appendChild(piece);
        });
    }

    function moveTile(idx) {
        const emptyPos = tiles.indexOf(8);
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        const eRow = Math.floor(emptyPos / 3);
        const eCol = emptyPos % 3;
        const isAdjacent = (Math.abs(row - eRow) === 1 && col === eCol) || (Math.abs(col - eCol) === 1 && row === eRow);
        
        if(isAdjacent) {
            [tiles[idx], tiles[emptyPos]] = [tiles[emptyPos], tiles[idx]];
            renderPuzzle();
            checkPuzzleWin();
        }
    }

    function checkPuzzleWin() {
        const isWin = tiles.every((val, i) => val === i);
        if(isWin) {
            const msg = document.getElementById('puzzle-message');
            if(msg) msg.style.display = 'block';
            
            Array.from(puzzleBoard.children).forEach(child => {
                child.style.pointerEvents = 'none';
                if(child.classList.contains('puzzle-empty')) {
                    child.classList.remove('puzzle-empty');
                    const bgRow = Math.floor(8 / 3);
                    const bgCol = 8 % 3;
                    child.style.backgroundPosition = `${bgCol * 50}% ${bgRow * 50}%`;
                }
            });
        }
    }
    renderPuzzle();
}

// ================= 17. MÁQUINA POLAROID COM GATINHA =================
function takePolaroid() {
    const flash = document.getElementById('camera-flash');
    const polaroid = document.getElementById('polaroid-output');
    if(!flash || !polaroid) return;
    
    flash.classList.add('flash-active');
    
    setTimeout(() => {
        flash.classList.remove('flash-active');
        setTimeout(() => {
            polaroid.classList.add('show');
        }, 300);
    }, 150);
}

// ================= 18. EFEITO DE CHUVA "EU TE AMO" NO FUNDO =================
function startFloatingWords() {
    const wordsContainer = document.getElementById('floating-words-container');
    if (!wordsContainer) return;
    
    const languages = [
        "Eu te amo", "I love you", "Te amo", "Je t'aime", 
        "Ich liebe dich", "Ti amo", "Aishiteru", "Saranghae", 
        "Wo ai ni", "Ik hou van jou"
    ];
    
    setInterval(() => {
        const word = document.createElement('div');
        word.className = 'floating-word';
        word.innerText = languages[Math.floor(Math.random() * languages.length)];
        word.style.left = Math.random() * 95 + 'vw';
        word.style.animationDuration = (Math.random() * 10 + 10) + 's';
        word.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        wordsContainer.appendChild(word);
        
        setTimeout(() => word.remove(), 21000);
    }, 1000);
}