import { useSelector } from 'react-redux'


export const Timer = () => {
    const SECONDS = useSelector(state => state.seconds)
    const MINUTES = useSelector(state => state.minutes)
    const ON_BREAK = useSelector(state => state.onBreak)    

    const FORMATED_TIMER = `${MINUTES.toString().padStart(2, '0')}:${SECONDS.toString().padStart(2, '0')}`

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center p-3">
            <span id="timer-label">{ON_BREAK ? 'Break' : 'Session'}</span>
            <span id="time-left">{FORMATED_TIMER}</span>
            <audio id="beep" src="./sounds/alarm.mp3"></audio>
        </div>
    )
}