import { 
  ADD_DIGIT,
  CHOOSE_OPERATION,
  CLEAR,
  EVALUATE,
  DECIMAL
 } from './constants.js';

export const operation = (operation) => { return { type: CHOOSE_OPERATION, operator: operation }}
export const clear = () => { return { type: CLEAR } }
export const evaluate = () => { return { type: EVALUATE } }
export const decimal = () => { return { type: DECIMAL } }

export const addDigit = (number) => {
  return {
    type: ADD_DIGIT,
    number: number
  }
}