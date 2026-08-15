const celebrationMessage = document.querySelector('.celebration-message');
const celebrationParagraphs = celebrationMessage.querySelectorAll(':scope > p:not(.eyebrow)');
const celebrationFinal = celebrationMessage.querySelector('.final-line');

celebrationParagraphs[0].textContent = 'Então agora eu posso dizer oficialmente...';
celebrationParagraphs[1].textContent = 'Minha namorada é a garota mais linda, cheirosa e incrível que eu poderia ter encontrado.';
celebrationFinal.innerHTML = `<p>Obrigado por dizer sim.<br>E obrigado por ser você.</p>
  <p class="celebration-names">Ashley ♥ Samira</p>
  <div class="final-simple"><p>Samira.</p><p>Eu não sei o que o futuro reserva.<br>Mas sei que quero descobrir com você.</p><h2>Eu te amo.<br>Minha namorada. <i>♥</i></h2><small>Ashley</small><small>28/03/2026 → ∞</small></div>`;
