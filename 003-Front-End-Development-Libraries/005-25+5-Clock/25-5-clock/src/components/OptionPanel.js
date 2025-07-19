import { useDispatch } from "react-redux";
import { increment, decrement } from './actions.js'

export const OptionPanel = (props) => {  
    const { label, id, data, dataID, controlIncrementID, controlDecrementID, type } = props;
    const dispatch = useDispatch();

    const handleIncrement = () => {
        try {
            dispatch(increment(type)); // needs type break / session
        }
        catch(e) {
            console.error(`Error while incrementing: ${e}`)
        }
    }
    
    const handleDecrement = () => {
        try {
            dispatch(decrement(type)); // needs type break / session
        }
        catch(e) {
            console.error(`Error while decrementing: ${e}`)
        }
    }

    return (
        <div className="container bg-info rounded-4 d-flex flex-column justify-content-center align-items-center m-3">
            <label id={id}>{label}</label> 
            <div className="d-flex flex-row">
                <i id={controlIncrementID} className="bi bi-arrow-up-short" onClick={() => handleIncrement()}></i>
                <label id={dataID}>{data}</label>        
                <i id={controlDecrementID} className="bi bi-arrow-down-short" onClick={() => handleDecrement()}></i>
            </div>
        </div>
    )
}


