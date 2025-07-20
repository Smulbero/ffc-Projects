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
import { timerOn } from './actions';

let intervalID = null;

const reducer = (state = initialState, action) => {    
    switch (action.type) {
        case INCREMENT:            
            switch(action.payload) {
                case BREAK:
                    if(state.breakLength === 60) return state
                    
                    return {
                        ...state,
                        breakLength: state.breakLength + 1
                    }
                case SESSION:
                    if(state.sessionLength === 60) return state

                    return {
                        ...state,
                        sessionLength: state.sessionLength + 1,
                        minutes: state.sessionLength + 1
                    }
                default: return state
            }
        case DECREMENT:
            switch(action.payload) {
                case BREAK:
                    if(state.breakLength - 1 === 0) return state

                    return {
                        ...state,
                        breakLength: state.breakLength - 1
                    }
                case SESSION:
                    if(state.sessionLength -1 === 0) return state

                    return {
                        ...state,
                        sessionLength: state.sessionLength - 1,
                        minutes: state.sessionLength - 1
                    }
                default: return state
            }            
        case TOGGLE_TIMER:
            if(!state.timerOn) {
                intervalID = setInterval(() => {
                    store.dispatch(timerOn())
                }, 1000)
            }
            else {
                if(intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            }
            return {
                ...state,
                timerOn: !state.timerOn
            }
        case RESET:
            stopAlarmAudio();
            if(intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            return initialState
        case TIMER_ON:            

            // Timer reaches 0, play alarm
            if (state.minutes === 0 && state.seconds === 0) {
                playAlarmAudio();
                if(state.onBreak) {
                    return {
                        ...state,
                        onBreak: false,
                        minutes: state.sessionLength
                    }
                }
                return {
                    ...state,                    
                    onBreak: true,
                    minutes: state.breakLength
                }
            }
                        
            if(state.seconds === 0 && state.minutes >= 1) {
                return {
                    ...state,
                    seconds: 59,
                    minutes: state.minutes - 1
                }
            }

            if(state.seconds >= 1) {
                return {
                    ...state,
                    seconds: state.seconds - 1
                }
            }

            return {
                ...state,
                minutes: state.minutes - 1
            }

        default:
            return state
    }
}

export const store = configureStore({ reducer });

const playAlarmAudio = () => {
    console.log('Playing alarm sound');
    const audioElement = document.getElementById('beep');
    audioElement.play().catch(e => {
        console.error(`Audio playback failed ${e}`)
    })
}

const stopAlarmAudio = () => {
    const audioElement = document.getElementById('beep');
    audioElement.pause();
    audioElement.currentTime = 0;
}