export const PLUS = "plus";
export const MINUS = "minus";
export const MULTIPLY = "multiply";
export const DIVIDE = "divide";
export const EVALUATE = "evaluate";
export const CLEAR = "clear";
export const DECIMAL = "decimal";
export const ADD_DIGIT = "add_digit";
export const CHOOSE_OPERATION = "choose_operation";

    /*

    Layout plan
    
    Display
    C C / X
    7 8 9 -
    4 5 6 +
    1 2 3 =
    0 0 . =
    
    */

export const BUTTONDATA = [
  [
    { label: "C", value: CLEAR,     className: "btn-danger col-6"},
    { label: "/", value: DIVIDE,    className: "btn-light" },
    { label: "*", value: MULTIPLY,  className: "btn-light" },
  ],
  [
    { label: "7", value: 7,         className: "btn-dark" },
    { label: "8", value: 8,         className: "btn-dark" },
    { label: "9", value: 9,         className: "btn-dark" },
    { label: "-", value: MINUS,     className: "btn-light" },
  ],
  [
    { label: "4", value: 4,         className: "btn-dark" },
    { label: "5", value: 5,         className: "btn-dark" },
    { label: "6", value: 6,         className: "btn-dark" },
    { label: "+", value: PLUS,      className: "btn-light" },
  ],
  [
    { label: "1", value: 1,         className: "btn-dark" },
    { label: "2", value: 2,         className: "btn-dark" },
    { label: "3", value: 3,         className: "btn-dark" },
  ],
  [
    { label: "0", value: 0,         className: "btn-dark col-6"},
    { label: ".", value: DECIMAL,   className: "btn-dark" },
    { label: "=", value: EVALUATE,    className: "btn-info equal-button "}
  ]
]