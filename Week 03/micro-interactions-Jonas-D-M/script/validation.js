let email = {},
  password = {},
  signInButton;

const getDOMElements = function() {
  email.field = document.querySelector('.js-username-field');
  email.input = document.querySelector('.js-username-input');
  email.errorMessage = document.querySelector('.js-username-error-message');

  password.field = document.querySelector('.js-password-field');
  password.input = document.querySelector('.js-password-input');
  password.errorMessage = document.querySelector('.js-password-error-message');

  signInButton = document.querySelector('.js-sign-in-button');

  console.log(email, password, signInButton);
};

const isValidPassword = function(password) {
  return password.length > 2;
};

const isValidEmailAddress = function(emailAddress) {
  // Basis manier om e-mailadres te checken.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
  return !fieldValue || !fieldValue.length;
};

const addErrors = function(formfield) {
  formfield.classList.add('has-error');
};

const removeErrors = function(formField) {
  formField.field.classList.remove('has-error');
};

const doubleCheckEmail = function(e) {
  const typedInput = e.target.value;
  if (isValidEmailAddress(e.target.value)) {
    removeErrors(email);
    email.input.removeEventListener('input', doubleCheckEmail);
  } else {
    if (isEmpty(typedInput)) {
      email.errorMessage.innerHTML = 'This field is required';
    } else {
      email.errorMessage.innerHTML = 'The email is wrong';
    }
  }
};

const enableListeners = function() {
  email.input.addEventListener('blur', function(e) {
    console.log(e.target.value);
    const typedInput = e.target.value;
    if (!isValidEmailAddress(typedInput)) {
      if (isEmpty(typedInput)) {
        email.errorMessage.innerHTML = 'This field is required';
      } else {
        email.errorMessage.innerHTML = 'The emailaddress is wrong';
      }

      addErrors(email.field);
    }
  });
  password.input.addEventListener('blur', function(e) {
    console.log(e.target.value);
  });

  signInButton.addEventListener('blur', function(e) {
    console.log('CLICKED THE BUTTON');
  });
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM is ready to roll... 👍👍👍');
  getDOMElements();
  enableListeners();
});
