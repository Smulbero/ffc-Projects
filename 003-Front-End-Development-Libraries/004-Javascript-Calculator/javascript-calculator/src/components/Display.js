import { useSelector } from 'react-redux';

const Display = () => {
  const HISTORY = useSelector(state => state.operations.history) || [];
  const CURRENT_INPUT = useSelector(state => state.operations.currentInput);
 
  return (
    <div className="display bg-dark text-light container d-flex flex-column p-2 m-0 justify-content-center align-items-end">
      <div className="display-history m-2">
        {HISTORY.length > 0 ? HISTORY.join('') : "Store not found"}
      </div>
      <div className="display-current m-2">
        {CURRENT_INPUT !== null ? CURRENT_INPUT : "Store not found"}
      </div>
    </div>
  );
}

export default Display;