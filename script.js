/* ── PERSONALIZE AQUI ────────────────────────────────────────────── */
const configuracao = {
  meuNome: 'Ashley', nomeDela: 'Samira', dataInicio: '2026-03-28T00:00:00', dataReencontro: '2026-04-19', dataPresente: '2026-07-14',
  // Ex.: musica: 'assets/nossa-musica.mp3'. Deixe vazio enquanto não tiver um arquivo.
  musica: '',
  spotifyEmbed: 'https://open.spotify.com/embed/track/1T3hcBQRwacjWLuJJFt8co?utm_source=generator',
  dedicatória: 'Você aperta a minha mente, mas eu te amo e não vivo sem você.',
  // Use caminhos locais, por exemplo: 'assets/foto-1.jpg'.
  fotos: ['assets/momento-1.jpeg', 'assets/momento-2.jpeg', 'assets/momento-3.jpeg', 'assets/momento-4.jpeg', 'assets/momento-5.jpeg'],
  legendas: ['Uma lembrança que eu guardaria mil vezes.', 'Eu gosto desse momento porque você está nele.', 'Mais um pedacinho da nossa história.', 'Eu espero que a gente tenha muitos momentos assim.', 'Uma vista que eu jamais vou esquecer.'],
  carta: `Eu fiquei pensando em como escrever isso sem transformar tudo em um texto enorme.

Então acho que vou simplesmente falar o que sinto.

Eu amo você.

Eu amo seu jeito, seu sorriso, seu cheiro, sua presença.

Você é linda, mas é muito mais do que isso.

Tem alguma coisa em você que eu não encontro em mais ninguém.

Eu nunca imaginei que encontraria um amor assim. Principalmente no meio de todo esse caos.

Eu não esperava encontrar alguém que me fizesse sentir tudo isso. Mas encontrei.

E foi você.

Desde que você voltou para a minha vida, algumas coisas simplesmente parecem melhores.

Eu gosto de falar com você. Eu gosto de estar perto de você. Eu gosto de pensar em você.

E gosto ainda mais da ideia de continuar descobrindo quem você é.

Eu não sei exatamente o que o futuro vai trazer.

Mas sei quem eu gostaria de ter ao meu lado enquanto ele acontece.

Você.

Com amor,
Ashley ♥`
};

document.querySelectorAll('[data-name="ela"]').forEach(el => el.textContent = configuracao.nomeDela + (el.textContent.includes('...') ? '...' : ''));
document.querySelectorAll('[data-name="meu"]').forEach(el => el.textContent = configuracao.meuNome);
document.getElementById('letter-text').innerHTML = configuracao.carta.split('\n\n').map(p => `<p>${p}</p>`).join('');

const gallery = document.getElementById('gallery'), modal = document.getElementById('photo-modal');
configuracao.fotos.forEach((src, index) => { const card = document.createElement('article'); card.className = 'photo'; const image = document.createElement('div'); image.className = 'photo-image' + (src ? ' has-image' : ''); if(src) image.style.backgroundImage = `url("${src}")`; else image.textContent = `foto ${index + 1}`; card.append(image, Object.assign(document.createElement('p'), {textContent: configuracao.legendas[index] || 'Uma lembrança nossa.'})); card.onclick = () => { if(!src) return; document.getElementById('modal-image').src = src; document.getElementById('modal-image').alt = configuracao.legendas[index]; document.getElementById('modal-caption').textContent = configuracao.legendas[index]; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }; gallery.appendChild(card); });
document.querySelector('.modal-close').onclick = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); };
modal.onclick = e => { if(e.target === modal) document.querySelector('.modal-close').click(); };

const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }}), {threshold:.16}); document.querySelectorAll('.reveal').forEach(el => { if(!el.classList.contains('visible')) observer.observe(el); });

const audio = document.getElementById('audio'), musicButton = document.getElementById('music-toggle'), label = document.getElementById('music-label'), musicStatus = document.getElementById('music-status'), trilhaButton = document.getElementById('trilha-control');
let trilhaContext, trilhaAtiva = false, trilhaTimer, trilhaIndex = 0;
const notasTrilha = [[261.63,.9],[329.63,.7],[392,.9],[523.25,1.1],[440,.8],[349.23,.8],[293.66,1],[392,.9]];
function tocarNotaTrilha([frequencia, duracao]) { const agora = trilhaContext.currentTime, nota = trilhaContext.createOscillator(), volume = trilhaContext.createGain(); nota.type = 'triangle'; nota.frequency.setValueAtTime(frequencia, agora); volume.gain.setValueAtTime(.0001, agora); volume.gain.exponentialRampToValueAtTime(.09, agora + .04); volume.gain.exponentialRampToValueAtTime(.0001, agora + duracao); nota.connect(volume).connect(trilhaContext.destination); nota.start(agora); nota.stop(agora + duracao + .05); }
function tocarTrilha() { if (!trilhaAtiva) return; tocarNotaTrilha(notasTrilha[trilhaIndex++ % notasTrilha.length]); trilhaTimer = window.setTimeout(tocarTrilha, 820); }
async function iniciarTrilha() { if (!trilhaContext) trilhaContext = new (window.AudioContext || window.webkitAudioContext)(); if (trilhaContext.state === 'suspended') await trilhaContext.resume(); if (!trilhaAtiva) { trilhaAtiva = true; tocarTrilha(); } trilhaButton.classList.add('ativa'); trilhaButton.setAttribute('aria-pressed', 'true'); trilhaButton.innerHTML = '<span>♫</span> PAUSAR TRILHA'; }
function pararTrilha() { trilhaAtiva = false; window.clearTimeout(trilhaTimer); trilhaButton.classList.remove('ativa'); trilhaButton.setAttribute('aria-pressed', 'false'); trilhaButton.innerHTML = '<span>♫</span> ATIVAR TRILHA'; }
trilhaButton.onclick = () => { if (trilhaAtiva) pararTrilha(); else iniciarTrilha(); };

if(configuracao.spotifyEmbed){ musicButton.style.display = 'none'; musicStatus.textContent = configuracao.dedicatória; }
if(configuracao.musica){ audio.src = configuracao.musica; musicStatus.textContent = 'Uma música escolhida especialmente para você.'; }
musicButton.onclick = async () => { if(!audio.src) { musicStatus.textContent = 'Adicione o caminho da música em “musica” no começo do script.js.'; return; } if(audio.paused) { pararTrilha(); await audio.play(); label.textContent = 'PAUSE'; musicButton.querySelector('.play-icon').textContent = '❚❚'; } else audio.pause(); };
audio.onpause = () => { label.textContent = 'PLAY'; musicButton.querySelector('.play-icon').textContent = '▶'; }; audio.onplay = () => { pararTrilha(); label.textContent = 'PAUSE'; musicButton.querySelector('.play-icon').textContent = '❚❚'; };
window.onSpotifyIframeApiReady = IFrameAPI => { const url = configuracao.spotifyEmbed; if (!url) return; const uri = url.replace('https://open.spotify.com/embed/track/', 'spotify:track:').split('?')[0]; IFrameAPI.createController(document.getElementById('spotify-embed'), { width: '100%', height: 152, uri }, controller => controller.addListener('playback_update', event => { if (!event.data.isPaused) pararTrilha(); })); };

function tick(){ const d = Math.max(0, Date.now() - new Date(configuracao.dataInicio).getTime()); const s = Math.floor(d/1000); [['days',Math.floor(s/86400)],['hours',Math.floor(s%86400/3600)],['minutes',Math.floor(s%3600/60)],['seconds',s%60]].forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,'0')); } tick(); setInterval(tick,1000);

const no = document.getElementById('no'), yes = document.getElementById('yes'), noMessage = document.getElementById('no-message'), choices = document.getElementById('choices'); let attempts = 0;
const messages = ['Tem certeza? 👀','Você quase conseguiu! 😂','Esse botão não vale!','Olha o SIM ali... ♥','Não foge de mim também 🥺','Eu acho que você sabe a resposta.'];
function runAway(e){ e.preventDefault(); attempts++; const container = choices.getBoundingClientRect(), yesBox = yes.getBoundingClientRect(); const maxX = Math.max(80, window.innerWidth - no.offsetWidth - 24), maxY = Math.max(90, window.innerHeight - no.offsetHeight - 24); let x,y,tries=0; do {x = 12 + Math.random()*maxX; y = 12 + Math.random()*maxY; tries++;} while(tries<20 && x+no.offsetWidth>yesBox.left-20 && x<yesBox.right+20 && y+no.offsetHeight>yesBox.top-20 && y<yesBox.bottom+20); no.style.position='fixed'; no.style.left=x+'px'; no.style.top=y+'px'; no.style.zIndex=10; noMessage.textContent = attempts >= 5 ? 'Desistiu? 😌♥' : (attempts >= 7 ? 'Samira, você realmente está tentando? 😂♥' : messages[(attempts-1)%messages.length]); }
no.addEventListener('pointerdown',runAway); no.addEventListener('mouseenter', e => { if(e.pointerType !== 'touch') runAway(e); });
window.addEventListener('resize', () => { no.style.position = ''; no.style.left = ''; no.style.top = ''; });
yes.onclick = async () => { if(audio.src && audio.paused) { try { await audio.play(); } catch {} } document.getElementById('celebration').classList.add('active'); for(let i=0;i<110;i++){const p=document.createElement('i');p.className='piece';p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*1.8+'s';p.style.setProperty('--x',(Math.random()-.5)*280+'px');p.style.background=['#c8a36a','#e87986','#f5e8c9'][i%3];document.getElementById('confetti').appendChild(p);} };
