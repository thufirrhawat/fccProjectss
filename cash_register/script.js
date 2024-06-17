let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = [
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

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");

purchaseBtn.addEventListener("click", () => {
    const cash = parseFloat(cashInput.value);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        changeDueElement.innerText = "";
        return;
    }

    const result = checkCashRegister(price, cash, cid);
    changeDueElement.innerText = result;
});

function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    if (change < 0) return "Customer does not have enough money to purchase the item";
    if (change === 0) return "No change due - customer paid with exact cash";

    const totalCid = cid.reduce((sum, [_, amount]) => sum + amount, 0);
    if (totalCid < change) return "Status: INSUFFICIENT_FUNDS";

    const changeArr = [];
    for (let i = currencyUnits.length - 1; i >= 0; i--) {
        const [unit, unitValue] = currencyUnits[i];
        let unitTotal = cid[i][1];
        let unitAmount = 0;

        while (change >= unitValue && unitTotal > 0) {
            change -= unitValue;
            change = Math.round(change * 100) / 100;
            unitTotal -= unitValue;
            unitAmount += unitValue;
        }

        if (unitAmount > 0) {
            changeArr.push(`${unit}: $${unitAmount.toFixed(2)}`);
        }
    }

    if (change > 0) return "Status: INSUFFICIENT_FUNDS";
    if (totalCid === cash - price) return `Status: CLOSED ${changeArr.join(" ")}`;
    return `Status: OPEN ${changeArr.join(" ")}`;
}
