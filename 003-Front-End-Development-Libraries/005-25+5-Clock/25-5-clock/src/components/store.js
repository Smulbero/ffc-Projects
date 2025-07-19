import { configureStore } from '@reduxjs/toolkit'
import {
    initialState,
    INCREMENT,
    DECREMENT,
    TOGGLE_TIMER,
    RESET,
    BREAK,
    SESSION,
    TIMER_ON
} from './constants'

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                breakLength: action.payload === BREAK ? state.breakLength + 1 : state.breakLength,
                sessionLength: action.payload === SESSION ? state.sessionLength + 1 : state.sessionLength,
                currentTimer: action.payload === SESSION ?
                    state.sessionLength === 0 ?
                        0 :
                        state.sessionLength + 1 :
                    state.sessionLength
            }
        case DECREMENT:
            return {
                ...state,
                breakLength: action.payload === BREAK ?
                    state.breakLength === 0 ?
                        0 :
                        state.breakLength - 1 :
                    state.breakLength,
                sessionLength: action.payload === SESSION ?
                    state.sessionLength === 0 ?
                        0 :
                        state.sessionLength - 1 :
                    state.sessionLength,
                currentTimer: action.payload === SESSION ?
                    state.sessionLength === 0 ?
                        0 :
                        state.sessionLength - 1 :
                    state.sessionLength
            }
        case TOGGLE_TIMER:
            return {
                ...state,
                timerOn: !state.timerOn
            }
        case RESET:
            return initialState
        case TIMER_ON:
            while (state.breakLength >= 0 && state.timerOn) {
                if (state.breakLength === 0 && state.currentTimer === 0) {
                    console.log(`Timer ran out of breaks`)
                    return {
                        ...state,
                        timerOn: false
                    }
                }
                if (state.currentTimer === 0) {
                    playAlarm();
                    return {
                        ...state,
                        breakLength: state.breakLength === 0 ?
                            0 :
                            state.breakLength - 1,
                        currentTimer: state.sessionLength
                    }
                }
                return {
                    ...state,
                    currentTimer: state.currentTimer - 1 // format mm:ss | handle as a string?
                }
            }
            break
        default:
            return state
    }
}

export const store = configureStore({ reducer });

const playAlarm = () => {
    console.log('Timer reached 0\nPlaying alarm sound');
}