import transactionsData from './transactions.js';
import user from './userData.js';
import { updatePortfolioSection } from './portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTransfersSection();
});

function initializeTransfersSection() {
    const mobileMoneyDepositModal = new bootstrap.Modal(document.getElementById('mobileMoneyDepositModal'));
    const mobileMoneyWithdrawModal = new bootstrap.Modal(document.getElementById('mobileMoneyWithdrawModal'));
    const transactionDetailsModal = new bootstrap.Modal(document.getElementById('transactionDetailsModal'));

    // Render transaction history table
    function updateTransactionTable() {
        const transactionTableBody = document.getElementById("transactionTable");
        transactionTableBody.innerHTML = transactionsData.transactions.map(transaction => `
            <tr>
                <td>${transaction.date}</td>
                <td>${transaction.method}</td>
                <td>${transaction.type}</td>
                <td>MK${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td><span class="badge bg-${transaction.status === 'Completed' ? 'success' : transaction.status === 'Pending' ? 'warning' : 'danger'}">${transaction.status}</span></td>
            </tr>
        `).join('');
        attachTransactionRowListeners();
    }

    // Attach click event listeners to transaction rows
    function attachTransactionRowListeners() {
        document.querySelectorAll('#transactionTable tr').forEach(row => {
            row.addEventListener('click', () => {
                const cells = row.cells;
                document.getElementById('modalTransDate').textContent = cells[0].textContent;
                document.getElementById('modalTransMethod').textContent = cells[1].textContent;
                document.getElementById('modalTransType').textContent = cells[2].textContent;
                document.getElementById('modalTransAmount').textContent = cells[3].textContent;
                document.getElementById('modalTransStatus').textContent = cells[4].querySelector('.badge').textContent;
                document.getElementById('modalTransID').textContent = 'TRN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
                const statusElement = document.getElementById('modalTransStatus');
                statusElement.className = 'stock-info-value';
                if (cells[4].querySelector('.badge').classList.contains('bg-success')) {
                    statusElement.classList.add('price-change-up');
                } else if (cells[4].querySelector('.badge').classList.contains('bg-danger')) {
                    statusElement.classList.add('price-change-down');
                } else {
                    statusElement.classList.add('text-warning');
                }
                transactionDetailsModal.show();
            });
        });
    }

    // Transaction history filters
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
    filters.forEach(filter => document.getElementById(filter)?.addEventListener("change", applyTransactionFilters));

    // Deposit form submission
    document.getElementById("mobileMoneyDepositForm").addEventListener("submit", e => {
        e.preventDefault();
        const provider = document.getElementById("depositProvider").value;
        const phoneNumber = document.getElementById("depositPhoneNumber").value;
        const amount = parseFloat(document.getElementById("depositAmount").value);

        if (!provider || !phoneNumber || !amount || amount < 100) {
            alert("Please fill all fields correctly. Minimum deposit is MK100.");
            return;
        }

        const newTransaction = {
            date: new Date().toISOString().split('T')[0],
            method: provider === 'mpamba' ? 'Mpamba' : 'Airtel Money',
            type: 'Deposit',
            amount: amount,
            status: 'Completed'
        };
        transactionsData.transactions.unshift(newTransaction);
        user.cashBalance += amount;

        updateTransactionTable();
        updatePortfolioSection();

        alert("Deposit successful!");
        mobileMoneyDepositModal.hide();
        document.getElementById("mobileMoneyDepositForm").reset();
    });

    // Withdraw form submission
    document.getElementById("mobileMoneyWithdrawForm").addEventListener("submit", e => {
        e.preventDefault();
        const provider = document.getElementById("withdrawProvider").value;
        const phoneNumber = document.getElementById("withdrawPhoneNumber").value;
        const amount = parseFloat(document.getElementById("withdrawAmount").value);

        if (!provider || !phoneNumber || !amount || amount < 100) {
            alert("Please fill all fields correctly. Minimum withdrawal is MK100.");
            return;
        }

        if (amount > user.cashBalance) {
            alert("Insufficient cash balance for this withdrawal.");
            return;
        }

        const newTransaction = {
            date: new Date().toISOString().split('T')[0],
            method: provider === 'mpamba' ? 'Mpamba' : 'Airtel Money',
            type: 'Withdrawal',
            amount: amount,
            status: 'Completed'
        };
        transactionsData.transactions.unshift(newTransaction);
        user.cashBalance -= amount;

        updateTransactionTable();
        updatePortfolioSection();

        alert("Withdrawal successful!");
        mobileMoneyWithdrawModal.hide();
        document.getElementById("mobileMoneyWithdrawForm").reset();
    });

    // Update available balance in withdrawal modal
    document.getElementById("mobileMoneyWithdrawModal").addEventListener("show.bs.modal", () => {
        document.querySelector("#mobileMoneyWithdrawModal .small").textContent = `Available balance: MK${user.cashBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById("withdrawAmount").max = user.cashBalance.toFixed(2);
    });

    // Initial render of transaction table
    updateTransactionTable();
}