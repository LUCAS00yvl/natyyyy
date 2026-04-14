// ================= 1. ANIMAÇÃO DE ABERTURA (CONTROLO TOTAL POR FRAME) =================
let hasOpened = false;
let isAnimating = false;

const introScreen = document.getElementById('intro-screen');
const introFrame = document.getElementById('intro-frame');
const introContainer = document.getElementById('intro-animation-container');
const hint = document.getElementById('intro-hint');

// AQUI: Controle de cada frame da animação, definindo a imagem, escala e opacidade desejada, além do tempo que cada frame deve durar.
const frames = [
    { src: "caixa001.png", scale: 2.0, opacity: 1.0, duration: 150 },
    { src: "caixa002.png", scale: 1.5, opacity: 1.0, duration: 150 },
    { src: "caixa003.png", scale: 1.8, opacity: 1.0, duration: 150 },
    { src: "caixa004.png", scale: 2.2, opacity: 0.7, duration: 150 },
    { src: "caixa005.png", scale: 3.5, opacity: 0.5, duration: 150 },
    { src: "caixa006.png", scale: 5.5, opacity: 0.3, duration: 150 },
    { src: "caixa007.png", scale: 7.5, opacity: 0.1, duration: 150 },
    { src: "caixa008.png", scale: 9.0, opacity: 0.05, duration: 50 } 
];

if (introFrame) {
    introFrame.src = frames[0].src;
    introFrame.style.transform = `scale(${frames[0].scale})`;
    introFrame.style.opacity = frames[0].opacity;
}

frames.forEach(f => {
    const img = new Image();
    img.src = f.src;
});

async function playIntroAnimation() {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        introFrame.src = frame.src;
        introFrame.style.transition = `transform ${frame.duration}ms linear, opacity ${frame.duration}ms linear`;
        introFrame.style.transform = `scale(${frame.scale})`;
        introFrame.style.opacity = frame.opacity;
        await new Promise(resolve => setTimeout(resolve, frame.duration));
    }

    if (introScreen) {
        introScreen.style.transition = 'opacity 0.8s ease-out';
        introScreen.style.opacity = '0';
    }
    
    window.scrollTo(0, 0); 
    
    setTimeout(() => { 
        if (introScreen) introScreen.style.display = 'none'; 
        
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
        isAnimating = false;
        
        if(typeof startFloatingWords === 'function') startFloatingWords();
    }, 800); 
}

function openSite() {
    if (hasOpened) return;
    hasOpened = true;
    isAnimating = true; 
    
    if (hint) hint.style.opacity = '0';
    playIntroAnimation();
}

function handleInteraction(e) {
    if (hasOpened && !isAnimating) return;
    if (e.type !== 'click' && e.cancelable) {
        e.preventDefault();
    }
    if (!hasOpened) {
        openSite();
    }
}

window.addEventListener('wheel', handleInteraction, { passive: false });
window.addEventListener('touchmove', handleInteraction, { passive: false });
window.addEventListener('touchstart', handleInteraction, { passive: false });
window.addEventListener('keydown', handleInteraction, { passive: false });
window.addEventListener('click', handleInteraction);


// ================= 2. ANIMAÇÕES DE SCROLL =================
let windowErrorShown = false;
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Dispara o erro do Windows ao chegar perto do fim
            if(entry.target.id === 'final-heart-section' && !windowErrorShown) {
                setTimeout(showWindowsError, 1000);
                windowErrorShown = true;
            }
            
            // Para o terminal rodar apenas quando chegar à última secção
            if(entry.target.querySelector('.terminal-body')) {
                if(typeof typeTerminal === 'function') typeTerminal(); 
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
    if (months > 0 || years > 0) text += `${months} mes${months !== 1 ? 'es' : ''} e `;
    text += `${days} dia${days !== 1 ? 's' : ''}`;

    const counterEl = document.getElementById('love-counter');
    if (counterEl) counterEl.innerText = text;
}
setInterval(updateCounter, 1000);
updateCounter();


// QUIZ
const quizQuestions = [
    { q: "Aceita ser o amor da minha vida?", b1: "Sim", b2: "É CLARO QUE SIM" },
    { q: "Quem ama mais?", b1: "Lucas", b2: "LUCAS" },
    { q: "A gente vai se casar?", b1: "Sim", b2: "COM CERTEZA" },
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
            <button class="btn btn-success me-3 px-4 py-2 fs-5" onclick="alert('Eu também vou te amar para sempre!')">Sim</button>
            <button id="btn-no" class="btn btn-danger px-4 py-2 fs-5" style="position: relative;">Não</button>
        `;
        const btnNo = document.getElementById('btn-no');
        btnNo.addEventListener('mouseover', moveButton);
        btnNo.addEventListener('touchstart', moveButton);
    } else {
        btnDiv.innerHTML = `
            <button class="btn btn-primary px-4 py-2 fs-5" onclick="nextQuestion()">${q.b1}</button>
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
renderQuestion();


// ================= 5. COFRE SECRETO =================
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


// ================= 6. MAPA MODAL & ERRO =================
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


// ================= 7. PLAYLIST SPOTIFY =================
const playlist = [
    { title: "nuts", artist: "Lil Peep", src: "" },
    { title: "gym class", artist: "Lil Peep", src: "" },
    { title: "Save That Shit", artist: "Lil Peep", src: "" },
    { title: "white tee", artist: "Lil Peep", src: "" },
    { title: "witchblades", artist: "Lil Peep", src: "" },
    { title: "benz truck", artist: "Lil Peep", src: "" }
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


// ================= 8. CÁPSULA DO TEMPO =================
const capsuleDate = new Date(2026, 7, 13);
const currentDate = new Date(); 
const capsuleContent = document.getElementById('capsule-content');
if(capsuleContent && currentDate >= capsuleDate) {
    capsuleContent.innerHTML = `
        <i class="bi bi-unlock-fill fs-1 text-success"></i>
        <p class="mt-2 fw-bold text-success">Cápsula Aberta! Feliz 1 ano de namoro. Eu te amo muito.</p>
    `;
}


// ================= 9. QUADRO DE MISSÕES =================
function completeQuest(btn) {
    const questCard = btn.closest('.quest-card');
    questCard.classList.add('completed');
    btn.innerText = 'Meta Cumprida!';
    btn.disabled = true;
    btn.classList.replace('btn-outline-dark', 'btn-success');
}


// ================= 10. AVALIAÇÃO DE SÉRIES =================
function rateMedia(starElement, rating) {
    const container = starElement.closest('.star-rating');
    const stars = container.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.replace('bi-star', 'bi-star-fill');
            star.classList.add('active');
        } else {
            star.classList.replace('bi-star-fill', 'bi-star');
            star.classList.remove('active');
        }
    });
}


// ================= 11. CALENDÁRIO SEMANAL =================
const calendarGrid = document.getElementById('calendar-grid');
if(calendarGrid) {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dailyMessages = [
        "O melhor dia da semana, aquele que finalmente passo contigo",
        "A saudade aperta demais e eu não consigo parar de pensar em você",
        "Longe do nosso próximo encontro, mas eu faço de tudo para que o dia passe rápido e eu possa te ver logo",
        "Ainda não é o dia, mas ainda assim fico feliz por ter a melhor namorada desse mundo",
        "Quase fim de semana e logo a gente vai se ver!!!!!",
        "Sextaaaaaa, falta só hoje!",
        "Sábado, a gente finalmente vai se ver ❤️❤️❤️"
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
                alert('Só pode abrir o dia de hoje kkkk');
            }
        });
        calendarGrid.appendChild(door);
    });
}


// ================= 12. QUEBRA-CABEÇAS DESLIZANTE =================
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


// ================= 13. MÁQUINA POLAROID =================
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


// ================= 14. EFEITO DE CHUVA "EU TE AMO" NO FUNDO =================
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

