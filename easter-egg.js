const secretEaster = document.getElementById('secret-easter');
const secretTrigger = document.getElementById('secret-trigger');
const secretLetter = document.getElementById('secret-letter');
const secretClose = document.getElementById('secret-close');

document.querySelector('.celebration-message').appendChild(secretEaster);

secretTrigger.addEventListener('click', () => {
  secretEaster.classList.add('letter-visible');
  secretLetter.setAttribute('aria-hidden', 'false');
  secretClose.focus();
});

secretClose.addEventListener('click', () => {
  secretEaster.classList.remove('letter-visible');
  secretLetter.setAttribute('aria-hidden', 'true');
  secretTrigger.focus();
});

secretLetter.addEventListener('click', event => {
  if (event.target === secretLetter) secretClose.click();
});
