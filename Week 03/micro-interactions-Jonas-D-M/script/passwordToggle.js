// Voor het togglen van het password gaan we ook een functie maken: handlePasswordSwitcher.
// Haal in deze functie de password-input en de password-toggle op.
// We gaan luisteren of er geklikt wordt op de checkbox.
// Als er geklikt wordt, veranderen we het type van de input van 'password' naar 'text' en vice versa.

const handlePasswordSwitcher = function() {
  const passwordInput = document.querySelector('.js-password-input'),
    passwordToggle = document.querySelector('.js-password-toggle');

  passwordToggle.addEventListener('change', function() {
    if (passwordInput.type === 'text') {
      passwordInput.type = 'password';
    } else {
      passwordInput.type = 'text';
    }
  });
};

document.addEventListener('DOMContentLoaded', function() {
  handlePasswordSwitcher();
});
