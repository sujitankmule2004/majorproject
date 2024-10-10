let items = [];
let subtotal = 0;

// Function to add items to the invoice
function addItem() {
    const description = document.getElementById('item-description').value;
    const quantity = parseInt(document.getElementById('item-quantity').value);
    const unitPrice = parseFloat(document.getElementById('item-price').value);

    if (description && quantity > 0 && unitPrice > 0) {
        const total = quantity * unitPrice;
        items.push({ description, quantity, unitPrice, total });
        
        updateItemList();
        updateTotals();
    } else {
        alert("Please enter valid item details.");
    }
}

// Function to update the displayed list of items
function updateItemList() {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';  // Clear existing rows

    items.forEach(item => {
        const row = `<tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.unitPrice.toFixed(2)}</td>
                        <td>$${item.total.toFixed(2)}</td>
                     </tr>`;
        itemsList.insertAdjacentHTML('beforeend', row);
    });
}

// Function to update subtotal, tax, and total
function updateTotals() {
    subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to generate the final invoice
function generateInvoice() {
    // Populate customer info
    document.getElementById('invoice-customer-name').textContent = document.getElementById('customer-name').value;
    document.getElementById('invoice-customer-address').textContent = document.getElementById('customer-address').value;
    document.getElementById('invoice-customer-email').textContent = document.getElementById('customer-email').value;

    // Populate date and due date
    const currentDate = new Date();
    document.getElementById('invoice-date').textContent = currentDate.toLocaleDateString();
    const dueDate = new Date();
    dueDate.setDate(currentDate.getDate() + 7);
    document.getElementById('due-date').textContent = dueDate.toLocaleDateString();

    // Populate items on the invoice
    const invoiceItemsList = document.getElementById('invoice-items-list');
    invoiceItemsList.innerHTML = '';  // Clear existing rows

    items.forEach(item => {
        const row = `<tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.unitPrice.toFixed(2)}</td>
                        <td>$${item.total.toFixed(2)}</td>
                     </tr>`;
        invoiceItemsList.insertAdjacentHTML('beforeend', row);
    });

    // Update totals on the invoice
    document.getElementById('invoice-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('invoice-tax').textContent = (subtotal * 0.1).toFixed(2);
    document.getElementById('invoice-total').textContent = (subtotal + (subtotal * 0.1)).toFixed(2);

    // Show the invoice box (hidden until generation)
    document.getElementById('invoice').style.display = 'block';
}
