export const PLUS = "add";
export const MINUS = "subtract";
export const MULTIPLY = "multiply";
export const DIVIDE = "divide";
export const EVALUATE = "equals";
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
    { label: "C", value: CLEAR,       className: "btn-danger col-6"},
    { label: "/", value: DIVIDE,      className: "btn-light" },
    { label: "*", value: MULTIPLY,    className: "btn-light" },
  ],  
  [ 
    { label: "7", value: "seven",           className: "btn-dark" },
    { label: "8", value: "eight",           className: "btn-dark" },
    { label: "9", value: "nine",           className: "btn-dark" },
    { label: "-", value: MINUS,       className: "btn-light" },
  ],  
  [ 
    { label: "4", value: "four",           className: "btn-dark" },
    { label: "5", value: "five",           className: "btn-dark" },
    { label: "6", value: "six",           className: "btn-dark" },
    { label: "+", value: PLUS,        className: "btn-light" },
  ],  
  [ 
    { label: "1", value: "one",           className: "btn-dark" },
    { label: "2", value: "two",           className: "btn-dark" },
    { label: "3", value: "three",           className: "btn-dark" },
  ],
  [
    { label: "0", value: "zero",           className: "btn-dark col-6"},
    { label: ".", value: DECIMAL,     className: "btn-dark" },
    { label: "=", value: EVALUATE,    className: "btn-info equal-button "}
  ]
]