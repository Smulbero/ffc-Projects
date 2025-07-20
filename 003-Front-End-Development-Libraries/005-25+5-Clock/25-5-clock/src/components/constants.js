export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
export const RESET = 'reset'
export const TOGGLE_TIMER = 'toggle_timer'
export const BREAK = 'break'
export const SESSION = 'session'
export const TIMER_ON = 'timer_on'

export const initialState = {    
    breakLength: 5,
    onBreak: false,
    sessionLength: 2,
    timerOn: false,
    seconds: 2,
    minutes: 0
}

export const OPTION_PANEL_DATA = [
    { label: 'Break Length', id: "break-label", data: null, dataID: "break-length", controlIncrementID: "break-increment", controlDecrementID: 'break-decrement', type: BREAK },
    { label: 'Session Length', id: "session-label", data: null, dataID: "session-length", controlIncrementID: "session-increment", controlDecrementID: 'session-decrement', type: SESSION}
]