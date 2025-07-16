import { configureStore } from '@reduxjs/toolkit';
import {
  EVALUATE,
  CLEAR,
  DECIMAL,
  ADD_DIGIT,
  CHOOSE_OPERATION
} from "./constants.js";

const initialState = {
  currentInput: '0',
  previousInput: "",
  history: [],
  operation: null,
  result: null,
  overwrite: false,
}

const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGIT:

      if (state.overwrite) {
        return {
          ...state,
          currentInput: action.number,
          overwrite: false,
        }
      }

      // Prevent multiple leading zeros
      if (state.currentInput === 0 && action.number === 0) {
        return state;
      }

      // If the current input is zero, replace it with the new digit
      if (state.currentInput === '0' && action.number !== '0') {
        return {
          ...state,
          currentInput: action.number,
        }
      }

      return {
        ...state,
        currentInput: state.currentInput + action.number,
      }

    case DECIMAL:

      // Prevent multiple decimals
      if (state.currentInput.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentInput: state.currentInput + '.',
      }

    case CHOOSE_OPERATION:      

      // Prevent multiple operation presses back to back
      if(state.operation !== null) return state;
    
      return {
        ...state,
        operation: action.operator,
        previousInput: state.currentInput,
        currentInput: '0',
        overwrite: false,
        history: [state.previousInput,
           `${state.currentInput.endsWith('.') ?
              state.currentInput + '0' :
              state.currentInput} 
            ${action.operator} `
          ],
      }

    case EVALUATE:

      if (!state.operation || state.previousInput === null) return state;

      const result = evaluateHelp(state.previousInput, state.currentInput, state.operation);

      return {
        ...state,
        currentInput: result.toString(),
        previousInput: "",
        operation: null,
        overwrite: true,
        history: [
           `${state.previousInput.endsWith('.') ? 
              state.previousInput + '0' : 
              state.previousInput}
            ${state.operation} ${state.currentInput} = `
          ],
      }

    case CLEAR:
      return initialState;

    default:
      return state;
  }
}



const reducer = {
  operations: operationsReducer
};


export const store = configureStore({ reducer });

const evaluateHelp = (a, b, operator) => {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        throw new Error("Cannot divide by zero");
      }
      return num1 / num2;      
    default: return 0;
  }
}