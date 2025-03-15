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
  */
  const regex = /[\W_]/g;
  const cleanStr = str.replace(regex, '').toLowerCase();  
  const reversedStr = cleanStr.split('').reverse().join('');

  console.log(`
    Clean String: ${cleanStr}\n
    Reversed String: ${reversedStr}
  `)

  if (cleanStr === reversedStr) {
    return `${str} is a palindrome`;
  } else {
    return `${str} is not a palindrome`;
  }  
};
