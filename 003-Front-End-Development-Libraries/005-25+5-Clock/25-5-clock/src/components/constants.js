export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
export const RESET = 'reset'
export const TOGGLE_TIMER = 'toggle_timer'
export const BREAK = 'break'
export const SESSION = 'session'
export const TIMER_ON = 'timer_on'

export const initialState = {    
    breakLength: 2,
    sessionLength: 5,
    timerOn: false,
    currentTimer: 5, // format mm:ss | handle as a string?
}

export const OPTION_PANEL_DATA = [
    { label: 'Break Length', id: "break-label", dataID: "break-length", controlIncrementID: "break-increment", controlDecrementID: 'break-decrement', type: BREAK },
    { label: 'Session Length', id: "session-label", dataID: "session-length", controlIncrementID: "session-increment", controlDecrementID: 'session-decrement', type: SESSION}
]