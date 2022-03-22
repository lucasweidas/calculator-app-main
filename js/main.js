import * as event from './modules/events.js';

(() => {
  const calcHeader = document.querySelector('#theme-toggles');
  const calcButtons = document.querySelector('#calc-buttons');

  // This is used to Select the "radio" button for accessibility
  document.addEventListener('DOMContentLoaded', event.changeThemeToggle());
  
  document.removeEventListener('DOMContentLoaded', event.changeThemeToggle());

  // Theme Change Event Delegation
  calcHeader.addEventListener('change', event.changeTheme);

  // Calculator Buttons Event Delegation
  calcButtons.addEventListener('click', event.checkPressedCalculatorBtn);
})();
