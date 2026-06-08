// Data mapping (Replaces the Switch Statement)
const products = {
    101: { price: 65.00, taxRate: 0.075 },
    102: { price: 12.50, taxRate: 0.00 },
    103: { price: 24.50, taxRate: 0.00 },
    104: { price: 38.75, taxRate: 0.075 },
    105: { price: 17.80, taxRate: 0.075 },
    106: { price: 16.50, taxRate: 0.00 },
    107: { price: 42.85, taxRate: 0.075 },
    108: { price: 32.99, taxRate: 0.075 },
    109: { price: 28.75, taxRate: 0.075 },
    110: { price: 51.55, taxRate: 0.00 }
};

let currentSubtotal = 0.0;
let currentTax = 0.0;
let drawerTotal = 0.0;

function addItem() {
    const id = document.getElementById('productID').value;
    const qty = parseFloat(document.getElementById('quantity').value);

    if (products[id]) {
        const item = products[id];
        currentSubtotal += (qty * item.price);
        currentTax += (qty * item.price * item.taxRate);
        
        updateDisplay();
    } else {
        alert("Error: Product ID not found. Must be between 101-110.");
    }
}

function finishTransaction() {
    const totalSale = currentSubtotal + currentTax;
    drawerTotal += totalSale;
    
    // Reset current sale
    currentSubtotal = 0.0;
    currentTax = 0.0;
    updateDisplay();
    
    alert("Transaction Complete! Total Added: $" + totalSale.toFixed(2));
}

function updateDisplay() {
    document.getElementById('currSub').innerText = currentSubtotal.toFixed(2);
    document.getElementById('currTax').innerText = currentTax.toFixed(2);
    document.getElementById('currTotal').innerText = (currentSubtotal + currentTax).toFixed(2);
    document.getElementById('drawerTotal').innerText = drawerTotal.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    if (addBtn) {
        addBtn.addEventListener('click', addItem);
    }
    
    if (finishBtn) {
        finishBtn.addEventListener('click', finishTransaction);
    }
});
