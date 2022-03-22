import * as button from './buttons.js';

// It will check what "radio" is checked, them will change the current theme and save on "LocalStorage".
export function changeTheme(evt) {
  // If the checked Toggle Theme is different that the "Dark" toggle:
  // the "theme" variable value will be changed.
  let theme = 'dark';

  // If "Light" Theme
  if (evt.target.id === 'light-toggle') {
    theme = 'light';
  } else if (evt.target.id === 'neon-toggle') {
    // If "Neon" Theme
    theme = 'neon';
  }

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Will change the current "checked" Theme Toggle Button
export function changeThemeToggle() {
  const theme = localStorage.theme;

  // Selecting and Checking the correct Theme toggle button
  document.querySelector(`#${theme}-toggle`).checked = true;
}

// Will check and identify the Pressed Calculator Button
export function checkPressedCalculatorBtn(evt) {
  const btnDataset = evt.target.dataset;

  // If it is a Calculator "Number" Button
  if (btnDataset.calcNumberBtn !== undefined) {
    return button.numberButton(evt);
  }

  // If it is a Calculator "Math Symbol" Button
  if (btnDataset.calcSymbolBtn !== undefined) {
    return button.mathSymbolButton(evt);
  }

  // If it is the Calculator "Dot" Button
  if (btnDataset.calcDotBtn !== undefined) {
    return button.dotButton();
  }

  // If it is the Calculator "Delete" Button
  if (btnDataset.calcDeleteBtn !== undefined) {
    return button.deleteButton();
  }

  // If it is the Calculator "Reset" Button
  if (btnDataset.calcResetBtn !== undefined) {
    return button.resetButton();
  }

  // If it is the Calculator "Result" Button
  if (btnDataset.calcResultBtn !== undefined) {
    return button.resultButton();
  }
}
