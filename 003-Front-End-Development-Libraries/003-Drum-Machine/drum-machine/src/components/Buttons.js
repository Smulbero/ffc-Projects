import { useCallback, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentInfo } from "./actions"

function Buttons(props) {
  const dispatch = useDispatch()
  const POWER = useSelector((state) => state.power);
  const VOLUME = useSelector((state) => state.volume) / 100;
  const BUTTONDATA = props.buttons || [];
  const BUTTONS = BUTTONDATA.map((button) => button.buttonName) || [];

  /* 
    _BUTTONAUDIOPATHS variable is used for tests only and wouldnt normally be used
  */
  const _BUTTONAUDIOPATHS = BUTTONDATA.map((button) => button.audioPath);

  // Group buttons into rows of a specified size
  const groupButtons = (buttonsArr, size) => {
    if (buttonsArr) {
      const groups = [];
      for (let i = 0; i < buttonsArr.length; i += size) {
        groups.push(buttonsArr.slice(i, i + size));
      }
      return groups;
    } else {
      return [];
    }
  };

  const playSound = useCallback(
    (key) => {
      if (POWER) {
        const button = BUTTONDATA.find((btn) => btn.buttonName === key);
        if (button) {
          console.log("123")
          const audioPath = button.audioPath;
          const currentSound = audioPath;
          dispatch(setCurrentInfo(currentSound));
          const audio = new Audio(audioPath);
          audio.volume = VOLUME;
          audio.play().catch((error) => {
            console.error(`Error playing sound for button ${key}:`, error);
          });
        }
      } else {
        console.log("Power is off, cannot play sound.");
      }
    },
    [BUTTONDATA, VOLUME, POWER]
  );

  // Group buttons into rows of n buttons
  const buttonGroups = groupButtons(BUTTONS, 3);

  return BUTTONS.length === 0 ? (
    <div>No buttons available</div>
  ) : (
    <div className="buttons container border p-3 rounded col-4 d-flex flex-column align-items-center">
      {buttonGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="row">
          {group.map((button, btnIndex) => {
            // globalIndex variable needed only beucase of freeCodeCamp tests changed code structure
            const globalIndex = groupIndex * 3 + btnIndex;
            return (
              /*
                audiopath prop is for tests only and wouldnt be normally used
              */
             
              <Button
                key={btnIndex}
                name={button}
                callback={playSound}
                audiopath={_BUTTONAUDIOPATHS[globalIndex]}
              />
            )
          }
          )}
        </div>
      ))}
    </div>
  );
}

const Button = memo(function Button(props) {
  const BUTTONNAME = props.name || "empty";
  const AUDIOPATH = props.audiopath || "";
  const callback = props.callback || (() => {});
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toUpperCase() === BUTTONNAME) {
        playAudio();
        /*
          callback function for original implementation
          playAudio function for freeCodeCamp tests
        */
        // callback(BUTTONNAME);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [BUTTONNAME, callback]);

  const handleClick = useCallback((event) => {
      if (event.type === "click") { callback(BUTTONNAME) }
    },[BUTTONNAME]
  );


  /*
    CODE FROM THIS COMMENT TO NEXT COMMENT IS FOR ONLY FREECODECAMP TESTS TO PASS
  */

  const _AUDIOREF = useRef(null);

  const playAudio = () => {
    if (_AUDIOREF.current) {
      _AUDIOREF.current.play().catch((error) => {        
        console.error("Audio playback failed:", error);
      })
      const currentSound = _AUDIOREF.current.attributes.src.value
      console.log(currentSound)
      dispatch(setCurrentInfo(currentSound));
    }
  };

  /*
    CODE FOR TESTS ENDS HERE
  */

  /*
    playAudio function for onClick and onKeyDown is only for the tests
    normally onClick function would be replaced with handleClick
    and onKeyDown attribute isnt needed
  */
  return (
    <button
      className="btn btn-primary m-1 col-md-auto drum-pad"
      id={BUTTONNAME}
      onClick={playAudio}
      onKeyDown={playAudio}
    >
      {/* 
        Audio element for tests only
        Element wont normally be needed
      */}
      <audio
        ref={_AUDIOREF}
        src={AUDIOPATH}
        className="clip"
        id={BUTTONNAME}
      ></audio>
      {BUTTONNAME}
    </button>
  );
});

export default Buttons;
