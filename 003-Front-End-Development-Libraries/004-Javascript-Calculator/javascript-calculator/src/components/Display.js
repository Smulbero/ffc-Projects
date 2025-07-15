import { useSelector } from 'react-redux';

const Display = () => {
 
  return (
    <div className="display bg-dark text-light container d-flex flex-column p-2 m-0 justify-content-center align-items-end">
      <div className="display-history m-2">
        History
      </div>
      <div className="display-current m-2">
        Current
      </div>
    </div>
  );
}

export default Display;