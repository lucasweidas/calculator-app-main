export const previousDisplay = document.querySelector('#calc__previous');
export const currentDisplay = document.querySelector('#calc__current');

// Calculator "Constructor" Function
export default function Calculator() {
  let previousValue = '',
    currentValue = '',
    result = '',
    mathSymbol;

  return {
    adicao() {
      result = String(Number(previousValue) + Number(currentValue));
    },
    subtracao() {
      result = String(Number(previousValue) - Number(currentValue));
    },
    multiplicacao() {
      result = String(Number(previousValue) * Number(currentValue));
    },
    divisao() {
      result = String(Number(previousValue) / Number(currentValue));
    },
    resetCurrentValue() {
      currentValue = '';
    },
    resetPreviousValue() {
      previousValue = '';
    },
    checkMathSymbol() {
      if (mathSymbol === '+') return this.adicao();
      if (mathSymbol === '-') return this.subtracao();
      if (mathSymbol === 'x') return this.multiplicacao();
      if (mathSymbol === '/') this.divisao();
    },
    verifyPossibleMath() {
      if (previousValue !== '') {
        this.checkMathSymbol();
        const formatedValue = this.formatValue(result);
        this.updateCurrentDisplay(result);
        previousValue = this.removeComma(formatedValue);
        result = '';
      }
    },
    formatValue(value) {
      const index = value.indexOf('.');
      const integer = index !== -1 ? value.slice(0, index) : value;
      const decimal = index !== -1 ? value.slice(index) : '';
      const formater = new Intl.NumberFormat('en-US');
      return `${formater.format(integer)}${decimal}`;
    },
    removeComma(value) {
      return value.replace(/,/g, '');
    },
    updateCurrentDisplay(value) {
      currentDisplay.innerText = this.formatValue(value);
    },
    updatePreviousDisplay(value, symbol) {
      previousDisplay.innerText += ` ${value} ${symbol}`;
    },
    isResultDisplayed() {
      return previousDisplay.innerText.includes('=');
    },
    resetCalculator() {
      previousValue = '';
      currentValue = '';
      result = '';
      mathSymbol = '';
      previousDisplay.innerText = '';
      currentDisplay.innerText = '0';
    },
    setPreviousValue(value) {
      previousValue = value;
    },
    getPreviousValue() {
      return previousValue;
    },
    setCurrentValue(value) {
      currentValue = value;
    },
    getCurrentValue() {
      return currentValue;
    },
    setMathSymbol(symbol) {
      mathSymbol = symbol;
    },
    getMathSymbol() {
      return mathSymbol;
    },
    getResult() {
      return result;
    },
  };
}
