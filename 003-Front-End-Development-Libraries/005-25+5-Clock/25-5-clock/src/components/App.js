import { OptionPanel } from "./OptionPanel";
import { Timer } from "./Timer";
import { Controls } from "./Controls";
import { OPTION_PANEL_DATA, BREAK, SESSION } from './constants.js'
import { useSelector } from "react-redux"

function App() {
    const BREAK_LENGTH = useSelector(state => state.breakLength)
    const SESSION_LENGTH = useSelector(state => state.sessionLength)
  
    const dataFiller = (type) => {
      switch(type) {
        case BREAK: return BREAK_LENGTH
        case SESSION: return SESSION_LENGTH
        default: return 'Invalid data type'
      }
    }

  return (
    <main className="bg-primary d-flex align-items-center">
      <div className='container d-flex flex-column justify-content-center align-items-center'>
        <h1>25+5 clock</h1>
        <div className="d-flex flex-row m-3">
          {
            OPTION_PANEL_DATA.map((panel, index) => {
              panel.data = dataFiller(panel.type);

              return(
                <OptionPanel 
                  key={index}
                  label={panel.label}
                  id={panel.id}
                  data={panel.data}
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