import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  CLEAR,
  DIVIDE,
  MULTIPLY,
  PLUS,
  MINUS,
  EVALUATE,
  DECIMAL,
} from "./constants.js";
import {
  addDigit,
  operation,
  clear,
  evaluate,
} from "./actions.js";

const ButtonPanel = () => {
  const BUTTONDATA = useSelector((state) => state.buttondata) || [];

  return (
    <div className="button-panel w-100 h-100 container p-0 m-0">
      {
        BUTTONDATA.map((row, index) => {
          const rowData = [];
          row.forEach((button) => {
            rowData.push(button);
          })
          return <Row key={index} rowData={rowData} />
        })
      }
    </div>
  )
}

const Row = (props) => {
  const { rowData } = props || [];

  return (
    <div className="row m-0 p-0">
      {
        rowData.map((button, index) => {
          return (
            <Button
              key={index}
              label={button.label}
              value={button.value}
              className={button.className}
            />
          )
        })
      }

    </div>
  )
}

const Button = (props) => {
  const dispatch = useDispatch();
  const { label, value, className } = props;

  const handleClick = useCallback((value, label) => {
    const operationMap = [PLUS, MINUS, MULTIPLY, DIVIDE, EVALUATE, CLEAR, DECIMAL];
    try {
      if (!operationMap.includes(value)) {
        console.log(`Adding Digit - Label: ${label}, Type of label: ${typeof label}`);
        dispatch(addDigit(label));
      } else if (value === CLEAR) {
        console.log(`Clearing Input`);
        dispatch(clear(value));
      } else if (value === EVALUATE) {
        console.log("Evaluating Expression");
        dispatch(evaluate(value));
      } else {
        console.log(`Choosing Operation - Label: ${label}, Type of label: ${typeof label}`);
        dispatch(operation(label));
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  }, [dispatch]);

  return (
    <button
      id={label}
      className={`btn ${className} col-3`}
      onClick={() => handleClick(value, label)}
    >
      {label}
    </button>
  );
}

export default ButtonPanel;