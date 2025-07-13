import { configureStore } from '@reduxjs/toolkit';
import {
  SET_CURRENT_INFO,
  TOGGLE_POWER,
  SET_VOLUME
} from "./constants.js"

const initialState = {
  currentInfo: null,
  power: true,
  volume: 50,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INFO:
      return {
        ...state,
        currentInfo: action.info
      };
    case TOGGLE_POWER:
      return {
        ...state,
        power: !state.power
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.volume
      };
    default:
      return state;
  }
}

const store = configureStore({ reducer });

export {
  store
};