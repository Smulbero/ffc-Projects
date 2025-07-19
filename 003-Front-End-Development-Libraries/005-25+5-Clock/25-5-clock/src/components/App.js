import { OptionPanel } from "./OptionPanel";
import { Timer } from "./Timer";
import { Controls } from "./Controls";
import { OPTION_PANEL_DATA } from './constants.js'
import { useSelector } from "react-redux"

function App() {
    const BREAK_LENGTH = useSelector(state => state.breakLength)
    const SESSION_LENGTH = useSelector(state => state.sessionLength)
  
  return (
    <main className="bg-primary">
      <div className='container d-flex flex-column'>
        <div className="d-flex flex-row m-3">
          {
            OPTION_PANEL_DATA.map((panel, index) => {
              return(
                <OptionPanel 
                  key={index}
                  label={panel.label}
                  id={panel.id}
                  data={panel.label === 'Break Length' ? BREAK_LENGTH : SESSION_LENGTH}
                  dataID={panel.dataID}
                  controlIncrementID={panel.controlIncrementID}
                  controlDecrementID={panel.controlDecrementID}
                  type={panel.type}
                />
              )
            })
          }
        </div>
        <div className="bg-info rounded-4">
          <Timer />
          <Controls />
        </div>
      </div>
    </main>
  );
}

export default App;