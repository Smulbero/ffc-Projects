import {
  SET_CURRENT_INFO,
  TOGGLE_POWER,
  SET_VOLUME
} from "./constants.js"

export const setCurrentInfo = (info) => {
  return {
    type: SET_CURRENT_INFO,
    info
  }
}
export const togglePower = () => {
  return {
    type: TOGGLE_POWER
  }
}
export const setVolume = (volume) => {
  return {
    type: SET_VOLUME,
    volume
  }
}