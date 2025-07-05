import Controls from './Controls.js';
import Buttons from './Buttons.js';

export function Board() {

  const BUTTONDATA = [
    { buttonName: "Q", audioPath: "/sounds/Heater-1.mp3" },
    { buttonName: "W", audioPath: "/sounds/Heater-2.mp3" },
    { buttonName: "E", audioPath: "/sounds/Heater-3.mp3" },
    { buttonName: "A", audioPath: "/sounds/Heater-4_1.mp3" },
    { buttonName: "S", audioPath: "/sounds/Heater-6.mp3" },
    { buttonName: "D", audioPath: "/sounds/Dsc_Oh.mp3" },
    { buttonName: "Z", audioPath: "/sounds/Kick_n_Hat.mp3" },
    { buttonName: "X", audioPath: "/sounds/RP4_KICK_1.mp3" },
    { buttonName: "C", audioPath: "/sounds/Cev_H2.mp3" }
  ]

  return (
    <div className="container bg-light row d-flex justify-content-center w-75 text-dark" id="display">
      <Buttons buttons={BUTTONDATA} />
      <Controls />
    </div>
  );
}