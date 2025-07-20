import { useDispatch } from "react-redux"
import { reset, toggleTimer } from './actions.js'

export const Controls = () => {
    const dispatch = useDispatch()

    const handleReset = () => {
        try {
            dispatch(reset())
        }
        catch (e) {
            console.error(`Error while trying to reset: ${e}`)
        }
    }

    const handleToggleTimer = () => {
        try {
            dispatch(toggleTimer());
        }
        catch (e) {
            console.error(`Error while trying to toggle timer on/off: ${e}`)
        }
    }

return (
    <div className="container d-flex flex-row justify-content-center align-items-center">
        <div id="start_stop" onClick={() => handleToggleTimer()}>
            <i className="bi bi-play-fill"></i>
            <i className="bi bi-pause-fill"></i>
        </div>
        <i id="reset" className="bi bi-arrow-clockwise" onClick={() => handleReset()}></i>
    </div>
)
} 