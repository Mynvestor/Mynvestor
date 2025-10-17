import { indexItem, companyData } from "./marketData.js";
import investorData from "./investorData.js";

// Function to parse daily change percentage
const parseDailyChangePercent = (dailyChange) => {
    const match = dailyChange.match(/([-+]\d+\.\d+%)/);
    return match ? parseFloat(match[1]) : 0;
};

// Function to generate company card HTML
const generateCompanyCard = (card, showVolume = false) => {
    return `
        <div class="col-md-12">
            <div class="company-card" data-company="${card.ticker}">
                <div class="company-info">
                    <img src="${card.logo}" alt="${card.companyName} Logo" class="company-logo me-3">
                    <div>
                        <h5 class="card-title">${card.companyName}</h5>
                        <p class="card-text">${showVolume ? `${card.ticker} - ${card.volume} shares` : card.ticker}</p>
                    </div>
                </div>
                <div class="price-info">
                    <div class="share-price">MK ${card.currentPrice}</div>
                    <div class="daily-change ${parseDailyChangePercent(card.dailyChange) >= 0 ? 'price-change-up' : 'price-change-down'}">
                        <i class="bi bi-arrow-${parseDailyChangePercent(card.dailyChange) >= 0 ? 'up' : 'down'} me-1"></i>${card.dailyChange}
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Initialize Market Snapshot
const initMarketSnapshot = () => {
    let indexCard = '';
    indexItem.forEach((item, idx) => {
        indexCard += `
            <div class="col-md-4 mb-1">
                <div class="index-chart">
                    <span class="index-name">${item.indexName}</span>
                    <span class="index-points" id="${item.indexName.toLowerCase()}-points">${item.indexValue}</span>
                    <canvas id="dashboard${item.indexName}Chart"></canvas>
                </div>
            </div>
        `;
    });
    document.querySelector("#marketSnapshot").innerHTML = indexCard;
};

// Initialize Top Gainers, Top Losers, and Volume Gainers
const initKeyStatistics = () => {
    // Top Gainers
    const topGainers = companyData
        .sort((a, b) => parseDailyChangePercent(b.dailyChange) - parseDailyChangePercent(a.dailyChange))
        .slice(0, 3)
        .map(card => generateCompanyCard(card))
        .join('');
    
    // Top Losers
    const topLosers = companyData
        .sort((a, b) => parseDailyChangePercent(a.dailyChange) - parseDailyChangePercent(b.dailyChange))
        .filter(card => parseDailyChangePercent(card.dailyChange) < 0)
        .slice(0, 3)
        .map(card => generateCompanyCard(card))
        .join('');
    
    // Volume Gainers
    const volumeGainers = companyData
        .sort((a, b) => parseInt(b.volume.replace(/,/g, '')) - parseInt(a.volume.replace(/,/g, '')))
        .slice(0, 3)
        .map(card => generateCompanyCard(card, true))
        .join('');

    document.querySelector("#topGainers").innerHTML = topGainers;
    document.querySelector("#topLosers").innerHTML = topLosers;
    document.querySelector("#volumeGainers").innerHTML = volumeGainers;
};

// Initialize Market Charts
const initMarketCharts = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: "#495057" }, ticks: { color: "#adb5bd" } },
            y: { grid: { color: "#495057" }, ticks: { color: "#adb5bd" } }
        }
    };
    const labels = ["6d", "5d", "4d", "3d", "2d", "1d", "Today"];
    
    // MASI Chart
    new Chart(document.getElementById("dashboardMASIChart"), {
        type: "line",
        data: { 
            labels, 
            datasets: [{ 
                data: [10500, 10550, 10600, 10620, 10700, 10750, parseFloat(indexItem.find(i => i.indexName === 'MASI').indexValue.replace(/,/g, ''))], 
                borderColor: "#28a745", 
                fill: false 
            }]
        },
        options
    });
    
    // DSI Chart
    new Chart(document.getElementById("dashboardDSIChart"), {
        type: "line",
        data: { 
            labels, 
            datasets: [{ 
                data: [8200, 8250, 8300, 8280, 8350, 8400, parseFloat(indexItem.find(i => i.indexName === 'DSI').indexValue.replace(/,/g, ''))], 
                borderColor: "#28a745", 
                fill: false 
            }]
        },
        options
    });
    
    // FSI Chart
    new Chart(document.getElementById("dashboardFSIChart"), {
        type: "line",
        data: { 
            labels, 
            datasets: [{ 
                data: [4500, 4550, 4530, 4600, 4650, 4630, parseFloat(indexItem.find(i => i.indexName === 'FSI').indexValue.replace(/,/g, ''))], 
                borderColor: "#28a745", 
                fill: false 
            }]
        },
        options
    });
};

// Initialize Investor Overview
const initInvestorOverview = () => {
    const investorTableBody = document.getElementById("dashboardInvestorTableBody");
    let investorRows = '';
    Object.values(investorData).forEach(investor => {
        investorRows += `
            <tr data-investor-id="${investor.investorId}">
                <td>${investor.name}</td>
                <td>${investor.investorId}</td>
                <td>${investor.status}</td>
                <td>${investor.lastActive}</td>
                <td>
                    <button class="btn btn-primary btn-sm view-investor-btn" data-bs-toggle="modal" data-bs-target="#investorDetailsModal"><i class="bi bi-eye"></i> View</button>
                    <button class="btn btn-primary btn-sm"><i class="bi bi-chat"></i> Message</button>
                </td>
            </tr>
        `;
    });
    investorTableBody.innerHTML = investorRows;
};

// Initialize Recent Orders
const initRecentOrders = () => {
    const orderTableBody = document.getElementById("dashboardOrderTableBody");
    let orderRows = '';
    Object.values(investorData).forEach(investor => {
        if (investor.orders) {
            investor.orders.forEach(order => {
                orderRows += `
                    <tr data-order-id="${order.id}" data-investor="${investor.name.toLowerCase()}">
                        <td>${order.id}</td>
                        <td>${investor.name}</td>
                        <td>${order.type}</td>
                        <td>${order.stock}</td>
                        <td>${order.quantity}</td>
                        <td>${order.price}</td>
                        <td>${order.status}</td>
                        <td>${order.date}</td>
                        <td>
                            <button class="btn btn-primary btn-sm view-order-btn" data-bs-toggle="modal" data-bs-target="#orderDetailsModal"><i class="bi bi-eye"></i> View</button>
                        </td>
                    </tr>
                `;
            });
        }
    });
    orderTableBody.innerHTML = orderRows;
};

// Initialize Recent Transactions
const initRecentTransactions = () => {
    const transactionTableBody = document.getElementById("dashboardTransactionTableBody");
    let transactionRows = '';
    Object.values(investorData).forEach(investor => {
        if (investor.transactions) {
            investor.transactions.forEach(transaction => {
                transactionRows += `
                    <tr data-trans-id="${transaction.id}" data-investor="${investor.name.toLowerCase()}">
                        <td>${transaction.id}</td>
                        <td>${investor.name}</td>
                        <td>${transaction.type}</td>
                        <td>${transaction.amount}</td>
                        <td>${transaction.date}</td>
                        <td>${transaction.status}</td>
                        <td>
                            <button class="btn btn-primary btn-sm view-transaction-btn" data-bs-toggle="modal" data-bs-target="#transactionDetailsModal"><i class="bi bi-eye"></i> View</button>
                        </td>
                    </tr>
                `;
            });
        }
    });
    transactionTableBody.innerHTML = transactionRows;
};

// Populate Stock Quote Modal
const populateStockQuoteModal = (company) => {
    document.getElementById('modalCompanyName').textContent = company.ticker;
    document.getElementById('modalCompanyLogo').src = company.logo;
    document.getElementById('modalCompanyFullName').textContent = company.companyName;
    document.getElementById('modalCompanyTicker').textContent = company.ticker;
    document.getElementById('modalCurrentPrice').textContent = `MK ${company.currentPrice}`;
    document.getElementById('modalDailyChange').textContent = company.dailyChange;
    document.getElementById('modalDailyChange').className = parseDailyChangePercent(company.dailyChange) >= 0 ? 'stock-info-value price-change-up' : 'stock-info-value price-change-down';
    document.getElementById('modalOpen').textContent = `MK ${company.Open}`;
    document.getElementById('modalHigh').textContent = `MK ${company.high}`;
    document.getElementById('modalLow').textContent = `MK ${company.low}`;
    document.getElementById('modalVolume').textContent = company.volume;
};

// Populate Company Details Modal
const populateCompanyDetailsModal = (company) => {
    document.getElementById('companyDetailsName').textContent = company.companyName;
    document.getElementById('companyDetailsLogo').src = company.logo;
    document.getElementById('companyDetailsFullName').textContent = `${company.companyName} (${company.ticker}.mw)`;
    document.getElementById('companyDetailsSector').textContent = company.sector;
    document.getElementById('companyDetailsPrice').innerHTML = `MK ${company.currentPrice} <span id="companyDetailsChange" class="badge ${parseDailyChangePercent(company.dailyChange) >= 0 ? 'bg-success' : 'bg-danger'}">${company.dailyChange.split(' ')[1]}</span>`;
    document.getElementById('companyDetailsTicker').textContent = company.ticker;
    document.getElementById('companyDetailsOpen').textContent = company.Open;
    document.getElementById('companyDetailsHigh').textContent = company.high;
    document.getElementById('companyDetailsLow').textContent = company.low;
    document.getElementById('companyDetailsVolume').textContent = company.volume;
    document.getElementById('companyDetailsMarketCap').textContent = company.marketCap;
    document.getElementById('companyDetailsListingDate').textContent = company.listingDate;
    document.getElementById('companyDetailsListingPrice').textContent = company.listingPrice;
    document.getElementById('companyDetailsShares').textContent = company.sharesInIssue;
    document.getElementById('companyDetailsCEO').textContent = company.CEO;
    document.getElementById('companyDetailsCFO').textContent = company.CFO;
    document.getElementById('companyDetailsSecretary').textContent = company.companySecretary;
    document.getElementById('companyDetailsTransferSecretary').textContent = company.transferSecretary;
    document.getElementById('companyDetailsAddress').textContent = company.address;
    document.getElementById('companyDetailsTel').textContent = company.Tel;
    document.getElementById('companyDetailsWebsite').href = company.website;
    document.getElementById('companyDetailsWebsite').textContent = company.website;

    // Placeholder data for fields not in marketData.js
    document.getElementById('companyDetailsLastUpdate').textContent = `Last Updated: ${new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'GMT' })} GMT`;
    document.getElementById('companyDetailsOverview').textContent = 'No overview available.';
    document.getElementById('companyDetailsDayRange').textContent = `${company.low} - ${company.high}`;
    document.getElementById('companyDetails52WRange').textContent = `MK ${(parseFloat(company.currentPrice) * 0.9).toFixed(2)} - MK ${(parseFloat(company.currentPrice) * 1.1).toFixed(2)}`;
    document.getElementById('companyDetailsPE').textContent = (Math.random() * 20 + 15).toFixed(1);
    document.getElementById('companyDetailsDivYield').textContent = (Math.random() * 2 + 0.5).toFixed(1) + '%';
    document.getElementById('companyDetailsRSI').innerHTML = `${(Math.random() * 40 + 40).toFixed(1)} <span class="text-success">(Neutral)</span>`;
    document.getElementById('companyDetailsMACD').innerHTML = `${(Math.random() * 2).toFixed(2)} <span class="text-success">(Bullish)</span>`;
    document.getElementById('companyDetails50DMA').textContent = `MK ${(parseFloat(company.currentPrice) * 0.95).toFixed(2)}`;
    document.getElementById('companyDetails200DMA').textContent = `MK ${(parseFloat(company.currentPrice) * 0.9).toFixed(2)}`;
    document.getElementById('companyDetailsTechSummary').textContent = 'Current price trading above key moving averages with moderate RSI. Short-term bullish trend.';
    document.getElementById('companyDetailsEPS').textContent = `MK ${(parseFloat(company.currentPrice) * 0.035).toFixed(2)}`;
    document.getElementById('companyDetailsROE').textContent = `${(Math.random() * 15 + 10).toFixed(1)}%`;
    document.getElementById('companyDetailsDebtEquity').textContent = (Math.random() * 0.5 + 0.3).toFixed(2);
    document.getElementById('companyDetailsPB').textContent = (Math.random() * 3 + 3).toFixed(1);
    document.getElementById('companyDetailsFundSummary').textContent = 'Strong revenue growth (15% YoY) with healthy profit margins. Moderate valuation ratios compared to sector.';
    document.getElementById('companyDetailsNews').innerHTML = `
        <li class="mb-2"><small>${new Date().toISOString().split('T')[0]}</small><br><a href="#" class="text-white">${company.companyName} announces new partnership</a></li>
        <li class="mb-2"><small>${new Date(Date.now() - 86400000).toISOString().split('T')[0]}</small><br><a href="#" class="text-white">Q4 earnings beat estimates</a></li>
    `;
    document.getElementById('companyDetailsPEG').textContent = (Math.random() * 0.8 + 0.8).toFixed(1);
    document.getElementById('companyDetailsCurrentRatio').textContent = (Math.random() * 1.5 + 1).toFixed(1);
    document.getElementById('companyDetailsROIC').textContent = `${(Math.random() * 8 + 8).toFixed(1)}%`;
    document.getElementById('companyDetailsEBITDA').textContent = `${(Math.random() * 15 + 20).toFixed(0)}%`;
    document.getElementById('companyDetailsInst').style.width = '45%';
    document.getElementById('companyDetailsInst').textContent = 'Institutions 45%';
    document.getElementById('companyDetailsInsiders').style.width = '30%';
    document.getElementById('companyDetailsInsiders').textContent = 'Insiders 30%';
    document.getElementById('companyDetailsPublic').style.width = '25%';
    document.getElementById('companyDetailsPublic').textContent = 'Public 25%';
};

// Populate Investor Details Modal
const populateInvestorDetails = (investorId) => {
    const investor = investorData[investorId];
    if (investor) {
        const content = `
            <h6>Personal Information</h6>
            <p><strong>Name:</strong> ${investor.name}</p>
            <p><strong>Investor ID:</strong> ${investor.investorId}</p>
            <p><strong>DOB:</strong> ${investor.kyc.personal.dob}</p>
            <p><strong>Address:</strong> ${investor.kyc.personal.address}</p>
            <p><strong>Phone:</strong> ${investor.kyc.personal.phone}</p>
            <h6>Identification</h6>
            <p><strong>Type:</strong> ${investor.kyc.id.type}</p>
            <p><strong>Number:</strong> ${investor.kyc.id.number}</p>
            <h6>Financial Information</h6>
            <p><strong>Bank:</strong> ${investor.kyc.financial.bank}</p>
            <p><strong>Account:</strong> ${investor.kyc.financial.account}</p>
            <p><strong>Income:</strong> ${investor.kyc.financial.income}</p>
            <h6>Employment</h6>
            <p><strong>Employer:</strong> ${investor.kyc.employment.employer}</p>
            <p><strong>Position:</strong> ${investor.kyc.employment.position}</p>
            <p><strong>Years:</strong> ${investor.kyc.employment.years}</p>
            <h6>Risk Profile</h6>
            <p><strong>Risk Level:</strong> ${investor.kyc.risk.level}</p>
            <p><strong>Experience:</strong> ${investor.kyc.risk.experience}</p>
            <h6>Compliance</h6>
            <p><strong>PEP:</strong> ${investor.kyc.compliance.pep}</p>
            <p><strong>Sanctions:</strong> ${investor.kyc.compliance.sanctions}</p>
            <p><strong>Verification Status:</strong> ${investor.kyc.verification.status}</p>
            ${investor.kyc.verification.csd ? `<p><strong>CSD Number:</strong> ${investor.kyc.verification.csd}</p>` : ''}
        `;
        document.getElementById('investorDetailsContent').innerHTML = content;
        document.getElementById('pendingVerificationSection').classList.toggle('d-none', investor.kyc.verification.status !== 'Pending');
        const investorDetailsModal = new bootstrap.Modal(document.getElementById('investorDetailsModal'));
        investorDetailsModal.show();
    }
};

// Populate Order Details Modal
const populateOrderDetails = (orderId, investorName) => {
    let order;
    Object.values(investorData).forEach(investor => {
        if (investor.orders) {
            const foundOrder = investor.orders.find(o => o.id === orderId);
            if (foundOrder) order = foundOrder;
        }
    });
    if (order) {
        document.getElementById('orderId').textContent = order.id;
        document.getElementById('orderInvestor').textContent = investorName;
        document.getElementById('orderType').textContent = order.type;
        document.getElementById('orderStock').textContent = order.stock;
        document.getElementById('orderQuantity').textContent = order.quantity;
        document.getElementById('orderPrice').textContent = order.price;
        document.getElementById('orderStatus').textContent = order.status;
        document.getElementById('orderDate').textContent = order.date;
    }
};

// Populate Transaction Details Modal
const populateTransactionDetails = (transId, investorName) => {
    let transaction;
    Object.values(investorData).forEach(investor => {
        if (investor.transactions) {
            const foundTransaction = investor.transactions.find(t => t.id === transId);
            if (foundTransaction) transaction = foundTransaction;
        }
    });
    if (transaction) {
        document.getElementById('transId').textContent = transaction.id;
        document.getElementById('transInvestor').textContent = investorName;
        document.getElementById('transType').textContent = transaction.type;
        document.getElementById('transAmount').textContent = transaction.amount;
        document.getElementById('transDate').textContent = transaction.date;
        document.getElementById('transStatus').textContent = transaction.status;
    }
};

// Table Sorting
const sortTable = (tableId, sortKey, sortAttribute) => {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = table.querySelector(`th[data-sort="${sortAttribute}"]`).dataset.order !== 'asc';
    
    rows.sort((a, b) => {
        let aValue = a.querySelector(`td:nth-child(${Array.from(table.querySelector('thead tr').children).findIndex(th => th.dataset.sort === sortKey) + 1})`).textContent;
        let bValue = b.querySelector(`td:nth-child(${Array.from(table.querySelector('thead tr').children).findIndex(th => th.dataset.sort === sortKey) + 1})`).textContent;
        
        if (sortKey.includes('quantity') || sortKey.includes('amount')) {
            aValue = parseFloat(aValue.replace(/[^\d.-]/g, '')) || 0;
            bValue = parseFloat(bValue.replace(/[^\d.-]/g, '')) || 0;
            return isAscending ? aValue - bValue : bValue - aValue;
        } else if (sortKey.includes('date')) {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
            return isAscending ? aValue - bValue : bValue - aValue;
        } else {
            return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    table.querySelectorAll('.sortable').forEach(th => th.dataset.order = '');
    table.querySelector(`th[data-sort="${sortAttribute}"]`).dataset.order = isAscending ? 'asc' : 'desc';
};

// Export Table to CSV
const exportTableToCSV = (tableId, filename) => {
    const table = document.getElementById(tableId);
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = [];
    
    rows.forEach(row => {
        const cols = Array.from(row.querySelectorAll('th, td')).slice(0, -1); // Exclude actions column
        const rowData = cols.map(col => `"${col.textContent.replace(/"/g, '""')}"`).join(',');
        csv.push(rowData);
    });
    
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Initialize Dashboard
const initDashboard = () => {
    initMarketSnapshot();
    initKeyStatistics();
    initMarketCharts();
    initInvestorOverview();
    initRecentOrders();
    initRecentTransactions();
    
    // Hide loading
    document.getElementById('dashboard-loading').style.display = 'none';

    // Company card click events
    document.querySelectorAll('.company-card').forEach(card => {
        card.addEventListener('click', () => {
            const ticker = card.getAttribute('data-company');
            const company = companyData.find(c => c.ticker === ticker);
            if (company) {
                populateStockQuoteModal(company);
                const stockQuoteModal = new bootstrap.Modal(document.getElementById('stockQuoteModal'));
                stockQuoteModal.show();
            }
        });
    });

    // Full Details button
    document.getElementById('modalDetailsBtn').addEventListener('click', () => {
        const ticker = document.getElementById('modalCompanyTicker').textContent;
        const company = companyData.find(c => c.ticker === ticker);
        if (company) {
            populateCompanyDetailsModal(company);
            const stockQuoteModal = bootstrap.Modal.getInstance(document.getElementById('stockQuoteModal'));
            const companyDetailsModal = new bootstrap.Modal(document.getElementById('companyDetailsModal'));
            stockQuoteModal.hide();
            companyDetailsModal.show();
        }
    });

    // Investor search
    document.getElementById('dashboardInvestorSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#dashboardInvestorTableBody tr');
        rows.forEach(row => {
            const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const investorId = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            row.style.display = name.includes(query) || investorId.includes(query) ? '' : 'none';
        });
    });

    // Order search
    document.getElementById('dashboardOrderSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#dashboardOrderTableBody tr');
        rows.forEach(row => {
            const orderId = row.dataset.orderId.toLowerCase();
            const investor = row.dataset.investor.toLowerCase();
            row.style.display = orderId.includes(query) || investor.includes(query) ? '' : 'none';
        });
    });

    // Transaction search
    document.getElementById('dashboardTransactionSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#dashboardTransactionTableBody tr');
        rows.forEach(row => {
            const transId = row.dataset.transId.toLowerCase();
            const investor = row.dataset.investor.toLowerCase();
            row.style.display = transId.includes(query) || investor.includes(query) ? '' : 'none';
        });
    });

    // Table sorting
    document.querySelectorAll('#dashboardInvestorTable .sortable').forEach(th => {
        th.addEventListener('click', () => {
            sortTable('dashboardInvestorTable', th.dataset.sort, th.dataset.sort);
        });
    });

    document.querySelectorAll('#dashboardOrderTable .sortable').forEach(th => {
        th.addEventListener('click', () => {
            sortTable('dashboardOrderTable', th.dataset.sort, th.dataset.sort);
        });
    });

    document.querySelectorAll('#dashboardTransactionTable .sortable').forEach(th => {
        th.addEventListener('click', () => {
            sortTable('dashboardTransactionTable', th.dataset.sort, th.dataset.sort);
        });
    });

    // View investor buttons
    document.querySelectorAll('#dashboardInvestorTable .view-investor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const investorId = row.dataset.investorId;
            populateInvestorDetails(investorId);
        });
    });

    // View order buttons
    document.querySelectorAll('#dashboardOrderTable .view-order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const orderId = row.dataset.orderId;
            const investorName = row.querySelector('td:nth-child(2)').textContent;
            populateOrderDetails(orderId, investorName);
        });
    });

    // View transaction buttons
    document.querySelectorAll('#dashboardTransactionTable .view-transaction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const transId = row.dataset.transId;
            const investorName = row.querySelector('td:nth-child(2)').textContent;
            populateTransactionDetails(transId, investorName);
        });
    });

    // Export buttons
    document.getElementById('exportDashboardTransactionsBtn').addEventListener('click', () => {
        exportTableToCSV('dashboardTransactionTable', 'dashboard_transactions.csv');
    });

    // Refresh transactions
    document.getElementById('refreshDashboardTransactionsBtn').addEventListener('click', () => {
        alert('Dashboard transactions refreshed.');
        document.getElementById('dashboardTransactionSearch').value = '';
        document.getElementById('dashboardTransactionSearch').dispatchEvent(new Event('input'));
    });
};

// Run initialization when dashboard section is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash.substring(1) === 'dashboard' || !window.location.hash) {
        initDashboard();
    }
});