import {
    INCREMENT,
    DECREMENT,
    RESET,
    TOGGLE_TIMER,
    BREAK,
    SESSION,
    TIMER_ON
} from './constants.js'

export const increment = (type) => {
    return {
        type: INCREMENT,
        payload: type === BREAK ? BREAK : SESSION
    }
}
export const decrement = (type) => {
    return {
        type: DECREMENT,
        payload: type === BREAK ? BREAK : SESSION
    }
}

export const reset = () => {
    return {
        type: RESET
    }
}

export const toggleTimer = () => {
    return {
        type: TOGGLE_TIMER
    }
}

export const timerOn = () => {
    return {
        type: TIMER_ON
    }
}