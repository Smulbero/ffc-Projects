import { 
  ADD_DIGIT,
  CHOOSE_OPERATION,
  CLEAR,
  EVALUATE
 } from './constants.js';

export const operation = (operation) => { return { type: CHOOSE_OPERATION, operator: operation }}
export const clear = () => { return { type: CLEAR } }
export const evaluate = () => { return { type: EVALUATE } }

export const addDigit = (number) => {
  return {
    type: ADD_DIGIT,
    number: number
  }
}