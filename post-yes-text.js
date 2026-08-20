const celebrationMessage = document.querySelector('.celebration-message');
const celebrationParagraphs = celebrationMessage.querySelectorAll(':scope > p:not(.eyebrow)');
const celebrationFinal = celebrationMessage.querySelector('.final-line');

celebrationParagraphs[0].textContent = 'Então agora podemos continuar escrevendo a nossa história...';
celebrationParagraphs[1].textContent = 'Você é a garota mais linda, cheirosa e incrível que eu poderia ter encontrado.';
celebrationFinal.innerHTML = `<p>Obrigada por escolher continuar.<br>E obrigada por ser você.</p>
  <p class="celebration-names">Ashley ♥ Samira</p>
  <div class="final-simple"><p>Samira.</p><p>Eu não sei o que o futuro reserva.<br>Mas sei que quero descobrir com você.</p><h2>Eu te amo.<br>Posso finalmente te chamar de minha mulher. <i>♥</i></h2><small>Ashley</small><small>28/03/2026 → ∞</small></div>`;
