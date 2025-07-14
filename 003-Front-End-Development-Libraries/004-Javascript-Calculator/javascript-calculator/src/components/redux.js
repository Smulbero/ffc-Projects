import { configureStore } from '@reduxjs/toolkit';
import {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  EQUALS,
  CLEAR,
  DECIMAL,
  BUTTONDATA
} from "./constants.js";

const initialState = {
  currentInput: ``,
  previousInput: ``,
  operation: null,
  result: null
}

const calculateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLUS:
    case MINUS:
    case MULTIPLY:
    case DIVIDE:
    case EQUALS:
    case CLEAR:
    case DECIMAL:
    default:
      return state;
  }
}

const buttondataReducer = (state = BUTTONDATA, action) => {
  return state;
}

const reducer = {
  calculate: calculateReducer,
  buttondata: buttondataReducer
};


export const store = configureStore({ reducer });