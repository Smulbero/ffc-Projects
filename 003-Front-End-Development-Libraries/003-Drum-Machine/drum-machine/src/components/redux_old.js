import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  currentInfo: null,
  power: true,
  volume: 50,
};

const SET_CURRENT_SOUND = 'SET_CURRENT_SOUND';
const TOGGLE_POWER = 'TOGGLE_POWER';
const SET_VOLUME = 'SET_VOLUME';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SOUND:
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

const setCurrentInfo = (info) => {
  return {
    type: SET_CURRENT_SOUND,
    info
  }
}
const togglePower = () => {
  return {
    type: TOGGLE_POWER
  }
}
const setVolume = (volume) => {
  return {
    type: SET_VOLUME,
    volume
  }
}

const mapStateToProps = (state) => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentInfo: (sound) => dispatch(setCurrentInfo(sound)),
    setVolume: (volume) => dispatch(setVolume(volume)),
    togglePower: () => dispatch(togglePower())
  }
}

export {
  store,
  togglePower,
  mapStateToProps,
  mapDispatchToProps
};