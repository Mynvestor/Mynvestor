function initializeTradeSection() {
    const prices = {
        AIRTEL: 128.11, BHL: 14.54, FDH: 315.19, FMBCH: 1412.24, ICON: 17.94, ILLOVO: 1791.69,
        MPICO: 19, NBM: 6200.11, NBS: 348.99, NICO: 779, NITL: 634.09, OMU: 1950.03,
        PCL: 2500.03, STANDARD: 7935.07, SUNBIRD: 300.03, TNM: 25
    };
    const miniChart = new Chart(document.getElementById("miniChart"), {
        type: "line",
        data: { labels: ["", "", "", "", ""], datasets: [{ data: [2, 4, 3, 5, 4], borderColor: "#28a745", tension: 0.4, borderWidth: 1, pointRadius: 0 }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
    });
    function updateTradeDetails(company, quantity = 0) {
        const price = prices[company] || 128.11;
        document.getElementById("stockPrice").textContent = `MK${price.toFixed(2)}`;
        document.getElementById("priceChange").textContent = `+${(price / prices[company] * 2.56).toFixed(2)}%`;

        const sharesValue = quantity * price;

        // Calculate commission based on trade value
        let commissionRate;
        if (sharesValue <= 50000) {
            commissionRate = 0.02; // 2.0% for trade value <= K50,000
        } else if (sharesValue <= 100000) {
            commissionRate = 0.015; // 1.5% for trade value K50,001-K100,000
        } else {
            commissionRate = 0.01; // 1.0% for trade value > K100,000
        }

        const commission = sharesValue * commissionRate;
        const vat = commission * 0.165; // 16.5% VAT on commission
        const transactionFee = 550; // Fixed transaction fee
        const totalCost = sharesValue + commission + vat + transactionFee;

        document.getElementById("sharesValue").textContent = `MK${sharesValue.toFixed(2)}`;
        document.getElementById("commission").textContent = `MK${(commission + vat).toFixed(2)}`;
        document.getElementById("totalCost").textContent = `MK${totalCost.toFixed(2)}`;
    }

    document.getElementById("companySearch").addEventListener("input", e => {
        const query = e.target.value.toLowerCase();
        const searchResults = document.getElementById("searchResults");
        const companyItems = document.querySelectorAll(".company-item");
        searchResults.style.display = query ? "block" : "none";
        companyItems.forEach(item => item.style.display = item.textContent.toLowerCase().includes(query) ? "block" : "none");
    });

    document.querySelectorAll(".company-item").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            const company = item.textContent;
            document.getElementById("selectedCompany").textContent = company;
            document.getElementById("companySearch").value = "";
            document.getElementById("searchResults").style.display = "none";
            const quantity = document.getElementById("quantity").value || 0;
            updateTradeDetails(company, quantity);
        });
    });

    document.getElementById("btnSell").addEventListener("click", function () {
        this.classList.add("active");
        document.getElementById("btnBuy").classList.remove("active");
    });

    document.getElementById("btnBuy").addEventListener("click", function () {
        this.classList.add("active");
        document.getElementById("btnSell").classList.remove("active");
    });

    document.getElementById("quantity").addEventListener("input", function () {
        const company = document.getElementById("selectedCompany").textContent;
        const quantity = this.value || 0;
        updateTradeDetails(company, quantity);
    });

    document.getElementById("orderModal").addEventListener("show.bs.modal", () => {
        document.getElementById("modalAction").textContent = document.getElementById("btnBuy").classList.contains("active") ? "Buy" : "Sell";
        document.getElementById("modalCompany").textContent = document.getElementById("selectedCompany").textContent;
        document.getElementById("modalType").textContent = document.getElementById("orderType").value;
        document.getElementById("modalQty").textContent = document.getElementById("quantity").value || 0;
        document.getElementById("modalPrice").textContent = document.getElementById("stockPrice").textContent;
        document.getElementById("modalTotal").textContent = document.getElementById("totalCost").textContent;
    });

    const filters = ["orderTypeFilter", "actionFilter", "statusFilter", "dateFilter"];
    function applyOrderFilters() {
        const orderType = document.getElementById("orderTypeFilter").value;
        const action = document.getElementById("actionFilter").value;
        const status = document.getElementById("statusFilter").value;
        const date = document.getElementById("dateFilter").value;
        const rows = document.querySelectorAll("#ordersTable tr");
        rows.forEach(row => {
            const rowDate = row.cells[0].textContent;
            const rowAction = row.cells[2].textContent;
            const rowType = row.cells[3].textContent;
            const rowStatus = row.cells[6].querySelector(".badge").textContent;
            const matchType = !orderType || rowType === orderType;
            const matchAction = !action || rowAction === action;
            const matchStatus = !status || rowStatus === status;
            const matchDate = !date || rowDate === date;
            row.style.display = matchType && matchAction && matchStatus && matchDate ? "" : "none";
        });
    }
    filters.forEach(filter => document.getElementById(filter).addEventListener("change", applyOrderFilters));

    document.getElementById("confirmOrder").addEventListener("click", () => {
        alert("Order placed successfully!");
        bootstrap.Modal.getInstance(document.getElementById("orderModal")).hide();
    });

    updateTradeDetails("AIRTEL", 0);
}
const orderModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
document.querySelectorAll('#ordersTable tr').forEach(row => {
    row.addEventListener('click', () => {
        const cells = row.cells;
        document.getElementById('modalOrderDate').textContent = cells[0].textContent;
        document.getElementById('modalOrderCompany').textContent = cells[1].textContent;
        document.getElementById('modalOrderAction').textContent = cells[2].textContent;
        document.getElementById('modalOrderType').textContent = cells[3].textContent;
        document.getElementById('modalOrderQuantity').textContent = cells[4].textContent;
        document.getElementById('modalOrderCost').textContent = cells[5].textContent;
        document.getElementById('modalOrderStatus').textContent = cells[6].querySelector('.badge').textContent;
        document.getElementById('modalOrderID').textContent = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const statusElement = document.getElementById('modalOrderStatus');
        statusElement.className = 'stock-info-value';
        if (cells[6].querySelector('.badge').classList.contains('bg-success')) {
            statusElement.classList.add('price-change-up');
        } else if (cells[6].querySelector('.badge').classList.contains('bg-danger')) {
            statusElement.classList.add('price-change-down');
        } else {
            statusElement.classList.add('text-warning');
        }
        orderModal.show();
    });
});
