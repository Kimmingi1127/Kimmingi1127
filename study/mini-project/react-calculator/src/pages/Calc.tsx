import React, { useState } from 'react';
import './Calc.css';

const Calc: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [clearDisplay, setClearDisplay] = useState(false);

  const handleButtonClick = (label: string) => {
    if ('0123456789'.includes(label)) {
      if (clearDisplay) {
        setDisplayValue(label);
        setClearDisplay(false);
      } else {
        setDisplayValue(displayValue === '0' ? label : displayValue + label);
      }
    } else if (label === '.') {
      if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.');
      }
    } else if (['+', '-', '*', '/'].includes(label)) {
      if (operator && previousValue) {
        calculate();
      }
      setOperator(label);
      setPreviousValue(displayValue);
      setClearDisplay(true);
    } else if (label === '=') {
      calculate();
    } else if (label === 'C') {
      setDisplayValue('0');
      setOperator(null);
      setPreviousValue(null);
    } else if (label === '←') {
      setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
    } else if (label === '%') {
      setDisplayValue((parseFloat(displayValue) / 100).toString());
    }
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
    }
    setDisplayValue(result.toString());
    setOperator(null);
    setPreviousValue(null);
    setClearDisplay(true);
  };

  const buttonLabels = [
    'C', '←', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];

  const getButtonClassName = (label: string) => {
    if (['C', '←', '%'].includes(label)) return 'button special';
    if (['/', '*', '-', '+'].includes(label)) return 'button operator';
    if (label === '=') return 'button equals';
    return 'button';
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        {buttonLabels.map((label) => (
          <button
            key={label}
            className={getButtonClassName(label)}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calc;
