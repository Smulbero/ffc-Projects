import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  togglePower,
  setCurrentInfo,
  setVolume
 } from "./actions"

function Controls() {  
  const dispatch = useDispatch()
  const POWERSTATUS = useSelector(state => state.power); 
  const INFO = useSelector(state => state.currentInfo) || "Info not found"; 
  const VOLUMEMIN = 0;
  const VOLUMEMAX = 100;
  
  const handlePowerToggle = useCallback(() => {  
    try {
      dispatch(togglePower())      
      dispatch(setCurrentInfo(`Power: ${POWERSTATUS ? "ON" : "OFF"}`))   
    } catch (error) {
      console.error("Error toggling power:", error);
    }
  }, [dispatch]);

  const handleVolumeChange = useCallback((volume) => {
    try {
      dispatch(setVolume(volume))
      dispatch(setCurrentInfo(`Volume: ${volume}`))
    } catch (error) {
      console.log("Error setting volume:", error)
    }
  }, [dispatch])

  return (
    <div className="controls container border p-3 rounded col-4">
      Power and Volume sliders not working because code structure for freeCodeCamp tests differs from orinigal implementation
      <Slider title="Power" callback={handlePowerToggle}/>
      <InfoBox info={INFO}/>
      <Slider title="Volume" min={VOLUMEMIN} max={VOLUMEMAX} callback={handleVolumeChange}/>
    </div>
  );
}

const Slider = memo(function Slider (props) {
  const TITLE = props.title || "componentTitleMissing";
  const MIN = props.min || 0;
  const MAX = props.max || 1;
  const callback = props.callback || (() => {});
  
 const handleChange = (event) => {
      callback(event.target.value);
 };

  return (
    <div className="switch d-flex flex-column align-items-center mb-3">
      <label>{TITLE}</label>
      <input 
        type="range" 
        min={MIN} 
        max={MAX} 
        onChange={e => handleChange(e)}
      />
    </div>
  )
})

const InfoBox = memo(function InfoBox(props) {
  const INFO = props.info || "Info not Found"
  return (
    <div className="info-container bg-secondary text-white p-2 rounded" id="display">
      {INFO}
    </div>
  );
})

export default Controls;