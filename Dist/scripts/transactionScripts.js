
const transactionModal = new bootstrap.Modal(document.getElementById('transactionDetailsModal'));


function initializeTransfersSection() {
    const filters = ["methodFilter", "typeFilter", "statusFilter", "dateFilter"];
    function applyTransactionFilters() {
        const method = document.getElementById("methodFilter").value;
        const type = document.getElementById("typeFilter").value;
        const status = document.getElementById("statusFilter").value;
        const date = document.getElementById("dateFilter").value;
        const rows = document.querySelectorAll("#transactionTable tr");
        rows.forEach(row => {
            const rowDate = row.cells[0].textContent;
            const rowMethod = row.cells[1].textContent;
            const rowType = row.cells[2].textContent;
            const rowStatus = row.cells[4].querySelector(".badge").textContent;
            const matchMethod = !method || rowMethod === method;
            const matchType = !type || rowType === type;
            const matchStatus = !status || rowStatus === status;
            const matchDate = !date || rowDate === date;
            row.style.display = matchMethod && matchType && matchStatus && matchDate ? "" : "none";
        });
    }
    filters.forEach(filter => document.getElementById(filter).addEventListener("change", applyTransactionFilters));
    applyTransactionFilters();

    document.getElementById("mobileMoneyDepositForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const provider = document.getElementById("depositProvider").value;
        const phoneNumber = document.getElementById("depositPhoneNumber").value;
        const amount = document.getElementById("depositAmount").value;
        if (provider && phoneNumber && amount) {
            alert(`Deposit of MK${amount} to ${provider} via ${phoneNumber} initiated. Please confirm on your mobile device.`);
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById("mobileMoneyDepositModal")).hide();
        } else {
            alert("Please fill in all fields.");
        }
    });

    document.getElementById("mobileMoneyWithdrawForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const provider = document.getElementById("withdrawProvider").value;
        const phoneNumber = document.getElementById("withdrawPhoneNumber").value;
        const amount = document.getElementById("withdrawAmount").value;
        if (provider && phoneNumber && amount) {
            alert(`Withdrawal of MK${amount} to ${provider} via ${phoneNumber} initiated. Please confirm on your mobile device.`);
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById("mobileMoneyWithdrawModal")).hide();
        } else {
            alert("Please fill in all fields.");
        }
    });
}

document.querySelectorAll('#transactionTable tr').forEach(row => {
    row.addEventListener('click', () => {
        const cells = row.cells;
        document.getElementById('modalTransDate').textContent = cells[0].textContent;
        document.getElementById('modalTransMethod').textContent = cells[1].textContent;
        document.getElementById('modalTransType').textContent = cells[2].textContent;
        document.getElementById('modalTransAmount').textContent = cells[3].textContent;
        document.getElementById('modalTransStatus').textContent = cells[4].querySelector('.badge').textContent;
        document.getElementById('modalTransID').textContent = 'TRX-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const statusElement = document.getElementById('modalTransStatus');
        statusElement.className = 'stock-info-value';
        if (cells[4].querySelector('.badge').classList.contains('bg-success')) {
            statusElement.classList.add('price-change-up');
        } else if (cells[4].querySelector('.badge').classList.contains('bg-danger')) {
            statusElement.classList.add('price-change-down');
        } else {
            statusElement.classList.add('text-warning');
        }
        transactionModal.show();
    });
});
