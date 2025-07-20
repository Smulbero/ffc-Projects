const RESULT = document.getElementById("output");
const USERINPUT = document.getElementById("number");
const CONVERTBTN = document.getElementById("convert-btn");


const ROMAN_NUMERALS = {
  1000: "M",
  900: "CM",
  500: "D",
  400: "CD",
  100: "C",
  90: "XC",
  50: "L",
  40: "XL",
  10: "X",
  9: "IX",
  5: "V",
  4: "IV",
  1: "I"
}

CONVERTBTN.addEventListener("click", (e) => {  
  e.preventDefault();  
  const USERINPUTVAL = parseInt(USERINPUT.value);

  if(isNaN(USERINPUTVAL)) {
    RESULT.innerHTML = "Please enter a valid number"
    return;
  }
  else if(USERINPUTVAL >= 4000 ) {
    RESULT.innerHTML = "Please enter a number less than or equal to 3999"
    return;
  } 
  else if (USERINPUTVAL <= 0){
    RESULT.innerHTML = "Please enter a number greater than or equal to 1"
    return;
  } 
  else {      
    RESULT.innerHTML = convertToRoman(USERINPUTVAL);
    return;
  }  
})

const convertToRoman = (num) => {
  let result = "";    
  
  // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.

  for(let i = 0; i < Object.keys(ROMAN_NUMERALS).length; i++) {
    // Reverse the object keys to get the largest number first
    while(num >= Object.keys(ROMAN_NUMERALS).reverse()[i]) {
      // Append the corresponding Roman numeral to the result string
      result += ROMAN_NUMERALS[Object.keys(ROMAN_NUMERALS).reverse()[i]];
      num -= Object.keys(ROMAN_NUMERALS).reverse()[i];
    }
  }
  return result;
}