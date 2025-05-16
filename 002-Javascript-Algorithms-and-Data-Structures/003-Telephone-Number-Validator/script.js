const VALBTN = document.getElementById("check-btn");
const CLRBTN = document.getElementById("clear-btn");
const INPUT = document.getElementById("user-input");
const RESULT = document.getElementById("results-div");

VALBTN.addEventListener("click", (e) => {
  e.preventDefault();
  if(INPUT.value === "") {
    alert("Please provide a phone number")
  } else {
    RESULT.innerHTML = validateInput(INPUT.value);
  }
} )

const validateInput = (number) => {
  //Regex for validating US phone number
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
  
  if(number.match(regex)) {
    return `Valid US number: ${number}`;
  } else {
    return `Invalid US number: ${number}`;
  }
}

CLRBTN.addEventListener("click", (e) => {
  e.preventDefault();
  INPUT.value = "";
  RESULT.innerHTML = "";
})