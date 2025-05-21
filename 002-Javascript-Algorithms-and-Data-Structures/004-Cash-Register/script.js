const totalPrice = document.getElementById('total-price-value');
const drawerElements = document.getElementById('register-amount');
const purchaseBtn = document.getElementById('purchase-btn');
const customerCash = document.getElementById('cash');
const registerStatus = document.getElementById('change-due');

let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
let cidTotal = 0;
let change = 0;
let coinValue = 0;
let changeArr = [];
let exactPossible = true;
totalPrice.textContent = `$${price.toFixed(2)}`;

const calculateChange = () => {
  change = Number((Number(customerCash.value) - price).toFixed(2));
  let remainingChange = change;
  changeArr = [];
  exactPossible = true;

  // console.log(`Change: ${change}`);
  // console.log(`Remaining Change: ${remainingChange}`);

  for (let i = cid.length - 1; i >= 0; i--) {
    let coinValue = getCoinValue(cid[i][0]);
    let coinAvailable = Number(cid[i][1].toFixed(2));
    let coinCount = 0;

    // console.log(`Coin Value: ${coinValue}`);
    // // console.log(`Coin Available: ${coinAvailable}`);

    // Calculate how many of this coin can be used
    let maxCoins = Math.floor(remainingChange / coinValue);
    let coinsToUse = Math.min(maxCoins, Math.floor(coinAvailable / coinValue));

    if (coinsToUse > 0) {
      let amountUsed = Number((coinsToUse * coinValue).toFixed(2));
      coinCount = amountUsed;
      remainingChange = Number((remainingChange - amountUsed).toFixed(2));
      cid[i][1] = Number((coinAvailable - amountUsed).toFixed(2));
      changeArr.push([cid[i][0], coinCount]);
    }
  }

  if (remainingChange >= 0.01) {
    exactPossible = false;
  }

  // console.log(changeArr);
};

const getCoinValue = (coin) => {
  switch(coin) {
    case 'PENNY':         return 0.01;
    case 'NICKEL':        return 0.05;
    case 'DIME':          return 0.1;
    case 'QUARTER':       return 0.25;
    case 'ONE':           return 1;
    case 'FIVE':          return 5;
    case 'TEN':           return 10;
    case 'TWENTY':        return 20;
    case 'ONE HUNDRED':   return 100;      
  }
}

const updateCashDrawerUI = () => {
  drawerElements.innerHTML = '';
  cid.forEach(entry => {
    drawerElements.innerHTML += `
    <li>
      <span class="left">
        ${entry[0]}:
      </span>
      <span class="right">
        $${entry[1]}
      </span>
    </li>
    `;
  })
}

// Original idea for the updateRegisterStatusUI function that outputs the change amounts as a list
// const updateRegisterStatusUI = () => {
//   registerStatus.innerHTML = '';
//   let status = getStatusText();
//   registerStatus.innerHTML += status;
//   changeArr.forEach(entry => {
//     registerStatus.innerHTML += `
//     <ul>
//       <li>
//         <span class="left">
//           ${entry[0]}:
//         </span>
//         <span class="right">
//           $${entry[1]}
//         </span>
//       </li>
//     </ul>
//     `;
//   })
// }

// This is for the tests to pass but doenst look as good as a list
// This outputs the change amounts as a single string

const updateRegisterStatusUI = () => {
  registerStatus.textContent = '';
  let status = getStatusText();
  if (status === 'No change due - customer paid with exact cash' || status === 'Status: INSUFFICIENT_FUNDS') {
    registerStatus.textContent = status;
  } else {
    let changeText = changeArr.map(entry => `${entry[0]}: $${entry[1].toFixed(2)}`).join(' ');
    registerStatus.textContent = `${status} ${changeText}`;
  }
};

const getStatusText = () => {
  if (Number(customerCash.value) === price) {
    return "No change due - customer paid with exact cash";
  } else if (Number(cidTotal) < Number(change) || !exactPossible) {
    return 'Status: INSUFFICIENT_FUNDS';
  } else if (Number(cidTotal) === Number(change) && exactPossible) {
    return 'Status: CLOSED';
  } else {
    return 'Status: OPEN';
  }
};
window.onload = () => updateCashDrawerUI();

const calculateCidTotal = () => {
  cidTotal = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2); 
}

purchaseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(customerCash.value < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  calculateCidTotal();
  calculateChange();
  updateRegisterStatusUI();
  updateCashDrawerUI();
})



