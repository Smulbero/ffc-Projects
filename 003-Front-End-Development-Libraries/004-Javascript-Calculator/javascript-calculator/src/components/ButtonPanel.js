import { useSelector, useDispatch } from "react-redux";

const ButtonPanel = () => {
  const dispatch = useDispatch();

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
  const { label, value, className } = props;

  return (
    <button id={label} className={`btn ${className} col-3`} onClick={() => console.log(value)}>
      {label}
    </button>
  );
}

export default ButtonPanel;