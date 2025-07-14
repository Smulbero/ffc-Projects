import { useSelector } from 'react-redux';

const Display = () => {
 
  return (
    <div className="display">
      <div className="display-history">
        History
      </div>
      <div className="display-current">
        Current
      </div>
    </div>
  );
}

export default Display;