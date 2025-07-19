import { useSelector, useDispatch } from 'react-redux'
import { timerOn } from './actions';

export const Timer = () => {
    const dispatch = useDispatch();
    const TEXT_TO_SHOW = 'Session';
    const CURRENT_TIMER = useSelector(state => state.currentTimer);
    const TIMER = useSelector(state => state.timerOn);

    const INTERVAL = 1000
    if (TIMER) {
        setTimeout(() => {
            dispatch(timerOn());
        }, INTERVAL);
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <span id="timer-label">{TEXT_TO_SHOW}</span>
            <span id="time-left">{CURRENT_TIMER}</span>
        </div>
    )
}