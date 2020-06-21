// https://codepen.io/claradeal/pen/rNVYvgJ?editors=1100

function checkCashRegister(price, cash, cid) {
  //  cid stands for cash in drawer
  let currency = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  let cidSum = 0;
  let myArr = []; // toDisb may have been a better variable name choice (i.e., toDisburse)
  let changeDue = 0;
  let answer = 0; // diff may be a better variable name choice
  let leftover = 0; // remainder may have been a better variable name choice
  let largestValue = 0;
  let smallArr = []; //  smallToDisb may have been a better variable name choice
  let lessCurr = [];
  let lessCidSum = 0;
  let j = 0;
  let l = 0;
  const myObj = {};

  // calculate change due
  function calcChangeDue() {
    changeDue = cash - price;
    return changeDue;
  }
  calcChangeDue();

  // function that does the same thing as calcChangeDue - not sure if/how this will be used (instead) or not
  function subtract(num1, num2) {
    answer = num1 - num2;
    return answer;
  }
  subtract(cash, price);

  // calculate sum of cash in drawer
  function calcCidSum() {
    for (let i = 0; i < cid.length; i++) {
      cidSum = (cidSum * 100 + cid[i][1] * 100) / 100;
    }
  }
  calcCidSum();

  //  build array lessCurr that contains each currency (i.e., element, value) whose value is less than the change due
  function buildLessCurr() {
    while (currency[j][1] < changeDue) {
      lessCurr.push(currency[j]);
      j++;
    }
  }
  buildLessCurr();

  // find largest value of all currency values in lessCurr - maybe can use Math.max instead
  function findLargestValue() {
    largestValue = currency[lessCurr.length - 1][1];
    return largestValue;
  }
  findLargestValue();

  // sum cid for all currencies in lessCurr
  function calcLessCidSum() {
    for (let l = 0; l < lessCurr.length; l++) {
      lessCidSum = (lessCidSum * 100 + cid[l][1] * 100) / 100;
    }
  }
  calcLessCidSum();

  //  calcuate the leftover (i.e. remainder) after largest currency is disbursed
  function calcLeftover() {
     leftover = ((changeDue * 100) % (largestValue * 100)) / 100;
    return leftover;
  }
  calcLeftover();

  // if sum cid = changeDue, return CLOSED cid
  if (cidSum == changeDue) {
    myObj.status = "CLOSED";
    myObj.change = cid;
    console.log("myObj for cid==changeDue is " + JSON.stringify(myObj));
    return myObj;
  }
  // else if sum cid < changeDue, return INSUFF []
  else if (cidSum < changeDue) {
    myObj.status = "INSUFFICIENT_FUNDS";
    myObj.change = myArr;
    console.log("myObj for cidSum < changeDue is " + JSON.stringify(myObj));
    return myObj;
  }

  // if not enough cid left after some change is disbursed, return INSUFF []
  if (lessCidSum < changeDue) {
    myObj.status = "INSUFFICIENT_FUNDS";
    myObj.change = [];
    console.log("myObj for lessCidSum < changeDue is " + JSON.stringify(myObj));
    return myObj;
  }

  if (leftover == 0) {
    let amount = changeDue / largestValue - leftover;
    lessCurr[lessCurr.length - 1][1] =
      amount * lessCurr[lessCurr.length - 1][1];
    smallArr.push(lessCurr[lessCurr.length - 1]);
    myObj.status = "OPEN";
    myObj.change = myArr.concat(smallArr);
    console.log("myObj is " + JSON.stringify(myObj));
    return myObj;
  }

  for (l = lessCurr.length - 1; l >= 0; l--) {
    // calculate largestValue for lessCurr[l][1]
    largestValue = currency[l][1]; 
    // calculate leftover for changeDue and largestValue for lessCurr[l][1];
    leftover = ((changeDue % largestValue) * 100) / 100;
    // calculate factor for changeDue, leftover, and largestValue for lessCurr[l][1]
    let factor = ((changeDue - leftover) * 100) / (largestValue * 100);
    let totAmount = factor * lessCurr[l][1]; 
    let totLargestCid = cid[l][1]; 
    
    if ((totAmount > totLargestCid) && (totAmount > 0)) {
      let adjAmount = Math.min(totAmount, totLargestCid);
      lessCurr[l][1] = adjAmount; 
       changeDue = (((Math.max(totAmount*100, totLargestCid*100)) - (Math.min(totAmount*100, totLargestCid*100))) + (leftover * 100)) / 100;
      changeDue = Math.round(changeDue * 100) / 100;  
    } else {
      lessCurr[l][1] = totAmount; 
      changeDue = (leftover * 100) / 100;
      changeDue = Math.round(changeDue * 100) / 100;
    }
    
    if (totAmount > 0) {
      smallArr.push(lessCurr[l]); 
      myObj.status = "OPEN";
      myObj.change = myArr.concat(smallArr);
    }
  }
  console.log("myObj for case 3 is " + JSON.stringify(myObj));  
  return myObj;
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);

checkCashRegister(19.5, 20, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);

checkCashRegister(19.5, 20, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);

checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
