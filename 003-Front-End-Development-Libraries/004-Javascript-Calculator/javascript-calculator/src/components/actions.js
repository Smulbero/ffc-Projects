import { PLUS } from './constants.js';

export const plus = (number) => {
  return {
    type: PLUS,
    number: number
  }
}