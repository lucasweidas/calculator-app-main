import Calculator, { previousDisplay, currentDisplay } from './calculator.js';

const calc = new Calculator();

// Calculator "Numbers" Buttons
export function numberButton(evt) {
  const currentText = calc.removeComma(currentDisplay.innerText);

  if (calc.isResultDisplayed() || (currentText !== calc.getCurrentValue() && previousDisplay.innerText === '')) {
    calc.resetCalculator();
  }

  const textValue = evt.target.innerText;
  const currentValue = calc.getCurrentValue();
  const newValue = currentValue === '0' ? textValue : currentValue + textValue;

  calc.setCurrentValue(newValue);
  calc.updateCurrentDisplay(newValue);
}

// Calculator "Math Symbols" Buttons
export function mathSymbolButton(evt) {
  const mathSymbol = evt.target.innerText;
  const value = calc.removeComma(currentDisplay.innerText);

  if (previousDisplay.innerText === '') {
    calc.setPreviousValue(value);
    calc.setMathSymbol(mathSymbol);
    calc.updatePreviousDisplay(value, mathSymbol);
    return calc.resetCurrentValue();
  }

  if (calc.isResultDisplayed()) {
    calc.setMathSymbol(mathSymbol);
    calc.resetCurrentValue();
    return (previousDisplay.innerText = `${calc.getPreviousValue()} ${mathSymbol}`);
  }

  const currentValue = calc.getCurrentValue();

  if (currentValue === '') {
    const previousText = previousDisplay.innerText;
    const newText = previousText.slice(0, previousText.length - 1).concat(mathSymbol);

    calc.setMathSymbol(mathSymbol);
    !calc.getPreviousValue() && calc.setPreviousValue(value);
    return (previousDisplay.innerText = newText);
  }

  calc.verifyPossibleMath();
  calc.updatePreviousDisplay(currentValue, mathSymbol);
  calc.resetCurrentValue();
  calc.setMathSymbol(mathSymbol);
  !calc.getPreviousValue() && calc.setPreviousValue(currentValue);
}

// Calculator "Dot" Button
export function dotButton() {
  let value = calc.getCurrentValue();

  if (calc.isResultDisplayed()) {
    value = '';
    calc.resetCalculator();
  }

  if (value.includes('.')) return;

  if (value === '' || calc.getResult()) value = '0';

  value += '.';
  calc.setCurrentValue(value);
  calc.updateCurrentDisplay(value);
}

// Calculator "Delete" Button
export function deleteButton() {
  const currentText = calc.removeComma(currentDisplay.innerText);
  const previousText = previousDisplay.innerText;

  if (currentText === '0' && previousText === '') return;

  if (calc.getCurrentValue() !== currentText && !calc.isResultDisplayed()) {
    return;
  }

  if (calc.isResultDisplayed()) {
    calc.resetPreviousValue();
    calc.resetCurrentValue();
    return (previousDisplay.innerText = '');
  }

  if (currentText.length === 1 && previousText !== '') {
    calc.setCurrentValue('');
    return calc.updateCurrentDisplay('0');
  }

  if (currentText.length === 1) {
    if (previousText !== '') return (previousDisplay.innerText = '');

    calc.setCurrentValue('');
    return calc.updateCurrentDisplay('0');
  }

  const newValue = currentText.slice(0, currentText.length - 1);

  calc.setCurrentValue(newValue);
  calc.updateCurrentDisplay(newValue);
}

// Calculator "Reset" Button
export function resetButton() {
  calc.resetCalculator();
}

// Calculator "Result" Button
export function resultButton() {
  const value = calc.removeComma(currentDisplay.innerText);

  if (previousDisplay.innerText === `${value} =`) return;

  !calc.getCurrentValue() && calc.setCurrentValue(value);

  if (calc.isResultDisplayed()) {
    const previousValue = calc.getPreviousValue();

    calc.verifyPossibleMath();
    return (previousDisplay.innerText = `${previousValue} ${calc.getMathSymbol()} ${calc.getCurrentValue()} =`);
  }

  calc.verifyPossibleMath();
  calc.updatePreviousDisplay(calc.getCurrentValue(), '=');
  !calc.getPreviousValue() && calc.setPreviousValue(value);
}
