import ordersData from './orders.js';
import user from './userData.js';
import { companyData } from './marketData.js';
import { updatePortfolioSection } from './portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTradeSection();
});

function initializeTradeSection() {
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));

    const prices = companyData.reduce((acc, company) => {
        acc[company.ticker] = parseFloat(company.currentPrice);
        return acc;
    }, {});

    const miniChart = new Chart(document.getElementById("miniChart"), {
        type: "line",
        data: { 
            labels: ["", "", "", "", ""], 
            datasets: [{ 
                data: [2, 4, 3, 5, 4], 
                borderColor: "#28a745", 
                tension: 0.4, 
                borderWidth: 1, 
                pointRadius: 0 
            }] 
        },
        options: { 
            responsive: true, 
            plugins: { legend: { display: false } }, 
            scales: { x: { display: false }, y: { display: false } } 
        }
    });

    function updateTradeDetails(company, quantity = 0) {
        const price = prices[company] || 128.11;
        document.getElementById("stockPrice").textContent = `MK${price.toFixed(2)}`;
        const companyInfo = companyData.find(c => c.ticker === company);
        document.getElementById("priceChange").textContent = companyInfo ? companyInfo.dailyChange : '+2.56%';

        const sharesValue = quantity * price;
        let commissionRate;
        if (sharesValue <= 50000) {
            commissionRate = 0.02;
        } else if (sharesValue <= 100000) {
            commissionRate = 0.015;
        } else {
            commissionRate = 0.01;
        }

        const commission = sharesValue * commissionRate;
        const vat = commission * 0.165;
        const transactionFee = 550;
        const totalCost = sharesValue + commission + vat + transactionFee;

        document.getElementById("sharesValue").textContent = `MK${sharesValue.toFixed(2)}`;
        document.getElementById("commission").textContent = `MK${(commission + vat).toFixed(2)}`;
        document.getElementById("totalCost").textContent = `MK${totalCost.toFixed(2)}`;
        return totalCost;
    }

    // Render company search results
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = companyData.map(company => 
        `<a href="#" class="list-group-item list-group-item-action company-item">${company.ticker}</a>`
    ).join('');

    document.getElementById("companySearch").addEventListener("input", e => {
        const query = e.target.value.toLowerCase();
        searchResults.style.display = query ? "block" : "none";
        const companyItems = document.querySelectorAll(".company-item");
        companyItems.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(query) ? "block" : "none";
        });
    });

    document.querySelectorAll(".company-item").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            const company = item.textContent;
            document.getElementById("selectedCompany").textContent = company;
            document.getElementById("companySearch").value = "";
            searchResults.style.display = "none";
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

    function attachOrderRowListeners() {
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
                orderDetailsModal.show();
            });
        });
    }

    document.getElementById("confirmOrder").addEventListener("click", () => {
        const action = document.getElementById("btnBuy").classList.contains("active") ? "Buy" : "Sell";
        const company = document.getElementById("selectedCompany").textContent;
        const orderType = document.getElementById("orderType").value;
        const quantity = parseInt(document.getElementById("quantity").value) || 0;
        const totalCost = parseFloat(document.getElementById("totalCost").textContent.replace('MK', '')) || 0;
        const price = prices[company] || 128.11;
        const companyInfo = companyData.find(c => c.ticker === company);

        if (quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        if (action === "Buy" && totalCost > user.cashBalance) {
            alert("Insufficient cash balance for this purchase.");
            return;
        }

        const position = user.portfolio.find(p => p.company === companyInfo.companyName);
        if (action === "Sell" && (!position || position.shares < quantity)) {
            alert("Insufficient shares to sell.");
            return;
        }

        // Update orders
        const newOrder = {
            date: new Date().toISOString().split('T')[0],
            company,
            action,
            orderType,
            quantity,
            totalCost,
            status: "Completed"
        };
        ordersData.orders.unshift(newOrder);

        // Update portfolio
        if (action === "Buy") {
            if (position) {
                const totalShares = position.shares + quantity;
                position.shares = totalShares;
                position.price = price;
                position.dailyChange = parseFloat(companyInfo.dailyChange.split(' ')[0]);
                position.dailyChangePercent = parseFloat(companyInfo.dailyChange.match(/([-+]?[\d.]+)%/)[1]);
            } else {
                user.portfolio.push({
                    company: companyInfo.companyName,
                    logo: companyInfo.logo,
                    shares: quantity,
                    price: price,
                    dailyChange: parseFloat(companyInfo.dailyChange.split(' ')[0]),
                    dailyChangePercent: parseFloat(companyInfo.dailyChange.match(/([-+]?[\d.]+)%/)[1])
                });
            }
            user.cashBalance -= totalCost;
        } else {
            position.shares -= quantity;
            if (position.shares === 0) {
                user.portfolio = user.portfolio.filter(p => p.company !== companyInfo.companyName);
            }
            user.cashBalance += totalCost;
        }

        // Update orders table
        const ordersTableBody = document.getElementById("ordersTable");
        ordersTableBody.innerHTML = ordersData.orders.map(order => `
            <tr>
                <td>${order.date}</td>
                <td>${order.company}</td>
                <td>${order.action}</td>
                <td>${order.orderType}</td>
                <td>${order.quantity}</td>
                <td>MK${order.totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td><span class="badge bg-${order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'danger'}">${order.status}</span></td>
            </tr>
        `).join('');

        // Re-attach event listeners to order rows
        attachOrderRowListeners();

        // Update portfolio section
        updatePortfolioSection();

        alert("Order placed successfully!");
        orderModal.hide();
        document.getElementById("quantity").value = '';
        updateTradeDetails(company, 0);
    });

    // Order history filters
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
    filters.forEach(filter => document.getElementById(filter)?.addEventListener("change", applyOrderFilters));

    // Initial attachment of order row listeners
    attachOrderRowListeners();

    updateTradeDetails("AIRTEL", 0);
}