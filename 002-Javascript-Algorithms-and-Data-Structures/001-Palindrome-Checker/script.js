const TEXTFIELD = document.getElementById('text-input');
const SUBMITBUTTON = document.getElementById('check-btn');
const RESULTFIELD = document.getElementById('result');

SUBMITBUTTON.addEventListener('click', (event) => {
  event.preventDefault();

  if (TEXTFIELD.value !== '') {
    RESULTFIELD.innerHTML = isPalindrome(TEXTFIELD.value);
    RESULTFIELD.style.display = "block";
  } else {alert('Please input a value')}
  
});

const isPalindrome = (str) => {

  /*
  Match any character that is not a letter,  digit, or underscore. 
  The underscore _ is explicitly included in the character class to ensure it is matched.
  Clean the string with regex and convert it to lowercase
  */
  const REGEX = /[\W_]/g;
  const CLEANSTR = str.replace(REGEX, '').toLowerCase();
  // Split the string into an array of characters, reverse the array, and then join the array back into a string  
  const REVERSERSTR = CLEANSTR.split('').reverse().join('');

  // console.log(`
  //   Clean String: ${CLEANSTR}\n
  //   Reversed String: ${REVERSERSTR}
  // `)

  if (CLEANSTR === REVERSERSTR) {
    return `${str} is a palindrome`;
  } else {
    return `${str} is not a palindrome`;
  }  
};
