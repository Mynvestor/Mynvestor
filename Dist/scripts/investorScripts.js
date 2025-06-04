const user = { name: "Joe Fuego", profilePic: null, cashBalance: 1000000.26, portfolioValue: 500000.56 };
const profilePicContainer = document.getElementById("profile-pic-container");
const modalProfilePicContainer = document.getElementById("modal-profile-pic-container");
const userAccountModal = new bootstrap.Modal(document.getElementById("userAccountModal"));

if (user.profilePic) {
    profilePicContainer.innerHTML = `<img src="${user.profilePic}" alt="User Profile">`;
    if (modalProfilePicContainer) modalProfilePicContainer.innerHTML = `<img src="${user.profilePic}" alt="User Profile">`;
} else {
    document.getElementById("user-initials").textContent = user.name.split(" ").map(e => e[0]).join("").toUpperCase();
    if (document.getElementById("modal-user-initials")) {
        document.getElementById("modal-user-initials").textContent = user.name.split(" ").map(e => e[0]).join("").toUpperCase();
    }
}

profilePicContainer.addEventListener("click", () => {
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("cash-balance").textContent = `MK${user.cashBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("portfolio-value").textContent = `MK${user.portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    userAccountModal.show();
});

document.getElementById("email-settings")?.addEventListener("change", (e) => {
    alert(`Email notifications for account activity ${e.target.checked ? "enabled" : "disabled"}.`);
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
    window.location.href = "login.html";
});

const sections = document.querySelectorAll(".content-section");
const navItems = document.querySelectorAll(".nav-item");
const companyCards = document.querySelectorAll(".company-card");
const companyTitles = document.querySelectorAll(".card-title");
const stockModal = new bootstrap.Modal(document.getElementById("stockQuoteModal"));

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove("active");
        section.querySelector(".loading").style.display = "none";
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.querySelector(".loading").style.display = "block";
        setTimeout(() => {
            targetSection.querySelector(".loading").style.display = "none";
            targetSection.classList.add("active");
            if (sectionId === "market") initializeMarketCharts();
            if (sectionId === "portfolio") initializePortfolioCharts();
            if (sectionId === "trade") initializeTradeSection();
            if (sectionId === "transfers") initializeTransfersSection();
        }, 300);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    navItems.forEach(item => item.classList.remove("active"));
    document.querySelectorAll(`.nav-item[href="#${sectionId}"]`).forEach(item => item.classList.add("active"));
    localStorage.setItem("lastSectionIndex2", sectionId);
}

function handleNavClick(e) {
    e.preventDefault();
    const sectionId = e.target.closest("a").getAttribute("href").substring(1);
    showSection(sectionId);
    window.location.hash = sectionId;
}

navItems.forEach(item => item.addEventListener("click", handleNavClick));

window.addEventListener("load", () => {
    const sectionId = window.location.hash.substring(1) || localStorage.getItem("lastSectionIndex2") || "portfolio";
    showSection(sectionId);
});

window.addEventListener("hashchange", () => {
    showSection(window.location.hash.substring(1) || "portfolio");
});

companyTitles.forEach(title => {
    if (title.textContent.length > 15) title.classList.add("long-name");
});

const companyData = {
    "AIRTEL": { name: "Airtel Malawi Ltd", logo: "../Dist/images/airtel.jpg", link: "https://www.airtel.mw" },
    "BHL": { name: "BHL Ltd", logo: "../Dist/images/bhl.png", link: "https://example.com/bhl" },
    "FDH": { name: "FDH Bank Ltd", logo: "../Dist/images/fdhlogo.webp", link: "https://www.fdh.co.mw" },
    "FMBCH": { name: "FMB Capital Holdings", logo: "../Dist/images/fmbch.jpg", link: "https://www.fmbcapitalgroup.com" },
    "ICON": { name: "ICON Properties Ltd", logo: "../Dist/images/icon.png", link: "https://example.com/icon" },
    "ILLOVO": { name: "Illovo Sugar Ltd", logo: "../Dist/images/illovo.png", link: "https://www.illovosugar.co.mw" },
    "MPICO": { name: "MPICO Ltd", logo: "../Dist/images/mpico.png", link: "https://www.mpico.mw" },
    "NBM": { name: "National Bank Ltd", logo: "../Dist/images/nb.png", link: "https://www.natbank.co.mw" },
    "NBS": { name: "NBS Bank Ltd", logo: "../Dist/images/nbs.png", link: "https://www.nbs.mw" },
    "NICO": { name: "NICO Holdings Ltd", logo: "../Dist/images/nico.png", link: "https://www.nico-holdings.com" },
    "NITL": { name: "NITL Ltd", logo: "../Dist/images/nitl.jpg", link: "https://example.com/nitl" },
    "OMU": { name: "Old Mutual Ltd", logo: "../Dist/images/omu.jpg", link: "https://www.oldmutual.com" },
    "PCL": { name: "Press Corp Ltd", logo: "../Dist/images/pcl.png", link: "https://www.presscorp.com" },
    "STANDARD": { name: "Standard Bank Ltd", logo: "../Dist/images/std.jpg", link: "https://www.standardbank.co.mw" },
    "SUNBIRD": { name: "Sunbird Tourism Ltd", logo: "../Dist/images/sunbird.svg", link: "https://www.sunbirdmalawi.com" },
    "TNM": { name: "Telekom Networks Ltd", logo: "../Dist/images/tnm.png", link: "https://www.tnm.co.mw" },
};

const companyDetailsModal = new bootstrap.Modal(document.getElementById('companyDetailsModal'));
companyCards.forEach(e => {
    e.addEventListener("click", () => {
        const t = e.getAttribute("data-company"),
              n = e.querySelector(".card-title").textContent,
              a = e.querySelector(".card-text").textContent,
              l = e.querySelector(".share-price").textContent,
              o = e.querySelector(".daily-change").textContent,
              i = companyData[t];
        document.getElementById("modalCompanyName").textContent = a;
        document.getElementById("modalCompanyFullName").textContent = n;
        document.getElementById("modalCompanyTicker").textContent = a;
        document.getElementById("modalCompanyLogo").src = i.logo;
        document.getElementById("modalCurrentPrice").textContent = l;
        document.getElementById("modalDailyChange").textContent = o;
        document.getElementById("modalOpen").textContent = "MK " + (parseFloat(l.replace("MK ", "")) * 0.98).toFixed(2);
        document.getElementById("modalHigh").textContent = "MK " + (parseFloat(l.replace("MK ", "")) * 1.02).toFixed(2);
        document.getElementById("modalLow").textContent = "MK " + (parseFloat(l.replace("MK ", "")) * 0.97).toFixed(2);
        document.getElementById("modalVolume").textContent = a.includes("245,670") ? "245,670" : a.includes("187,450") ? "187,450" : a.includes("156,230") ? "156,230" : (Math.floor(Math.random() * 100000) + 10000).toLocaleString();
        o.includes("+") ? document.getElementById("modalDailyChange").className = "stock-info-value price-change-up" : document.getElementById("modalDailyChange").className = "stock-info-value price-change-down";
        document.getElementById("companyDetailsName").textContent = n;
        document.getElementById("companyDetailsFullName").textContent = `${n} (${a}.mw)`;
        document.getElementById("companyDetailsLogo").src = i.logo;
        document.getElementById("companyDetailsSector").textContent = "Technology Sector | Large Cap";
        document.getElementById("companyDetailsPrice").innerHTML = `${l} <span id="companyDetailsChange" class="badge ${o.includes("+") ? "bg-success" : "bg-danger"}">${o.split(" ")[1]}</span>`;
        document.getElementById("companyDetailsLastUpdate").textContent = `Last Updated: ${new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'GMT' })} GMT`;
        document.getElementById("companyDetailsOverview").textContent = i.overview || "No overview available.";
        document.getElementById("companyDetailsDayRange").textContent = `${document.getElementById("modalLow").textContent.replace("MK ", "")} - ${document.getElementById("modalHigh").textContent.replace("MK ", "")}`;
        document.getElementById("companyDetails52WRange").textContent = `MK ${(parseFloat(l.replace("MK ", "")) * 0.9).toFixed(2)} - MK ${(parseFloat(l.replace("MK ", "")) * 1.1).toFixed(2)}`;
        document.getElementById("companyDetailsVolume").textContent = document.getElementById("modalVolume").textContent;
        document.getElementById("companyDetailsMarketCap").textContent = `MK ${(parseFloat(l.replace("MK ", "")) * 100000).toLocaleString().split(".")[0]}B`;
        document.getElementById("companyDetailsPE").textContent = (Math.random() * 20 + 15).toFixed(1);
        document.getElementById("companyDetailsDivYield").textContent = (Math.random() * 2 + 0.5).toFixed(1) + "%";
        document.getElementById("companyDetailsRSI").innerHTML = `${(Math.random() * 40 + 40).toFixed(1)} <span class="text-success">(Neutral)</span>`;
        document.getElementById("companyDetailsMACD").innerHTML = `${(Math.random() * 2).toFixed(2)} <span class="text-success">(Bullish)</span>`;
        document.getElementById("companyDetails50DMA").textContent = `MK ${(parseFloat(l.replace("MK ", "")) * 0.95).toFixed(2)}`;
        document.getElementById("companyDetails200DMA").textContent = `MK ${(parseFloat(l.replace("MK ", "")) * 0.9).toFixed(2)}`;
        document.getElementById("companyDetailsTechSummary").textContent = "Current price trading above key moving averages with moderate RSI. Short-term bullish trend.";
        document.getElementById("companyDetailsEPS").textContent = `MK ${(parseFloat(l.replace("MK ", "")) * 0.035).toFixed(2)}`;
        document.getElementById("companyDetailsROE").textContent = `${(Math.random() * 15 + 10).toFixed(1)}%`;
        document.getElementById("companyDetailsDebtEquity").textContent = (Math.random() * 0.5 + 0.3).toFixed(2);
        document.getElementById("companyDetailsPB").textContent = (Math.random() * 3 + 3).toFixed(1);
        document.getElementById("companyDetailsFundSummary").textContent = "Strong revenue growth (15% YoY) with healthy profit margins. Moderate valuation ratios compared to sector.";
        document.getElementById("companyDetailsNews").innerHTML = `<li class="mb-2"><small>${new Date().toISOString().split('T')[0]}</small><br><a href="#" class="text-white">${n} announces new partnership</a></li><li class="mb-2"><small>${new Date(Date.now() - 86400000).toISOString().split('T')[0]}</small><br><a href="#" class="text-white">Q4 earnings beat estimates</a></li>`;
        document.getElementById("companyDetailsPEG").textContent = (Math.random() * 0.8 + 0.8).toFixed(1);
        document.getElementById("companyDetailsCurrentRatio").textContent = (Math.random() * 1.5 + 1).toFixed(1);
        document.getElementById("companyDetailsROIC").textContent = `${(Math.random() * 8 + 8).toFixed(1)}%`;
        document.getElementById("companyDetailsEBITDA").textContent = `${(Math.random() * 15 + 20).toFixed(0)}%`;
        document.getElementById("companyDetailsInst").style.width = "45%";
        document.getElementById("companyDetailsInst").textContent = "Institutions 45%";
        document.getElementById("companyDetailsInsiders").style.width = "30%";
        document.getElementById("companyDetailsInsiders").textContent = "Insiders 30%";
        document.getElementById("companyDetailsPublic").style.width = "25%";
        document.getElementById("companyDetailsPublic").textContent = "Public 25%";
        document.getElementById("modalDetailsBtn").onclick = () => {
            stockModal.hide();
            companyDetailsModal.show();
        };
        stockModal.show();
    });
});

document.getElementById("bankDepositForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const bankAccount = document.getElementById("bankAccount").value;
    const amount = document.getElementById("bankDepositAmount").value;
    if (bankAccount && amount) {
        alert(`Deposit of MK${amount} from ${bankAccount} initiated. Processing may take 1-3 business days.`);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById("bankDepositModal")).hide();
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById("bankWithdrawForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const bankAccount = document.getElementById("withdrawBankAccount").value;
    const amount = document.getElementById("bankWithdrawAmount").value;
    if (bankAccount && amount) {
        alert(`Withdrawal of MK${amount} to ${bankAccount} initiated. Processing may take 1-3 business days.`);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById("bankWithdrawModal")).hide();
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById("creditCardDepositForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    const amount = document.getElementById("cardDepositAmount").value;
    if (cardNumber && expiryDate && cvv && amount) {
        alert(`Deposit of MK${amount} via card ending in ${cardNumber.slice(-4)} initiated. Funds will be available instantly.`);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById("creditCardDepositModal")).hide();
    } else {
        alert("Please fill in all fields.");
    }
});
function initializeMarketCharts() {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: "#d1d5db" }, ticks: { color: "#666" } },
            y: { grid: { color: "#d1d5db" }, ticks: { color: "#666" } }
        }
    };
    const labels = ["6d", "5d", "4d", "3d", "2d", "1d", "Today"];
    new Chart(document.getElementById("masiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [10500, 10550, 10600, 10620, 10700, 10750, 10800], borderColor: "#27a844", fill: false }] },
        options
    });
    new Chart(document.getElementById("dsiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [8200, 8250, 8300, 8280, 8350, 8400, 8450], borderColor: "#27a844", fill: false }] },
        options
    });
    new Chart(document.getElementById("fsiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [4500, 4550, 4530, 4600, 4650, 4630, 4700], borderColor: "#27a844", fill: false }] },
        options
    });
}

function initializePortfolioCharts() {
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: "#d1d5db" }, ticks: { color: "#666" } },
            y: { grid: { color: "#d1d5db" }, ticks: { color: "#666" } }
        }
    };
    const labels = ["6d", "5d", "4d", "3d", "2d", "1d", "Today"];
    new Chart(document.getElementById("performanceChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [25500, 25650, 25400, 25700, 25850, 25500, 26185.56], borderColor: "#27a844", fill: false }] },
        options: lineOptions
    });
    new Chart(document.getElementById("allocationChart"), {
        type: "doughnut",
        data: {
            labels: ["AIRTEL", "NBM", "TNM", "ILLOVO", "PCL", "Cash"],
            datasets: [{ data: [6405.5, 12400.22, 2500, 1791.69, 2500.03, 4364.26], backgroundColor: ["#27a844", "#0284c7", "#f59e0b", "#ef4444", "#8b5cf6", "#9ca3af"] }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "right", labels: { color: "#333", font: { size: 12 } } } }
        }
    });
}
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
// Handle Buy/Sell button clicks in portfolio cards to redirect to trade section
document.querySelectorAll('.portfolio-card .btn-buy, .portfolio-card .btn-sell').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const company = e.target.closest('.portfolio-card').querySelector('.card-title').textContent.trim();
        const action = e.target.classList.contains('btn-buy') ? 'Buy' : 'Sell';

        // Navigate to trade section
        showSection('trade');

        // Preselect the company and action in the trade section
        setTimeout(() => {
            document.getElementById('selectedCompany').textContent = company;
            document.getElementById('btnBuy').classList.toggle('active', action === 'Buy');
            document.getElementById('btnSell').classList.toggle('active', action === 'Sell');
            updateTradeDetails(company, 0); // Update trade details for the selected company
        }, 300); // Delay to ensure trade section is loaded
    });
});
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

const transactionModal = new bootstrap.Modal(document.getElementById('transactionDetailsModal'));
const orderModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));

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
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const type = document.getElementById("feedbackType").value;
    const message = document.getElementById("feedbackMessage").value;
    if (type && message) {
        alert(`Thank you for your ${type}!`);
        this.reset();
    } else {
        alert("Please select a type and enter feedback.");
    }
});
