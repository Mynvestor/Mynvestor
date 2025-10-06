
const sections = document.querySelectorAll('.content-section');
const navItems = document.querySelectorAll('.nav-item');
const companyCards = document.querySelectorAll('.company-card');
const companyTitles = document.querySelectorAll('.card-title');
const stockModal = new bootstrap.Modal(document.getElementById('stockQuoteModal'));
const companyDetailsModal = new bootstrap.Modal(document.getElementById('companyDetailsModal'));

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
    const sectionId = window.location.hash.substring(1) || localStorage.getItem("lastSectionIndex2") || "dashboard";
    showSection(sectionId);
});

window.addEventListener("hashchange", () => {
    showSection(window.location.hash.substring(1) || "dashboard");
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

function initializeMarketCharts() {
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
    new Chart(document.getElementById("masiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [10500, 10550, 10600, 10620, 10700, 10750, 10800], borderColor: "#28a745", fill: false }] },
        options
    });
    new Chart(document.getElementById("dsiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [8200, 8250, 8300, 8280, 8350, 8400, 8450], borderColor: "#28a745", fill: false }] },
        options
    });
    new Chart(document.getElementById("fsiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [4500, 4550, 4530, 4600, 4650, 4630, 4700], borderColor: "#28a745", fill: false }] },
        options
    });
}

// Broker Data
const brokerData = {
    CL001: {
        name: "Cedar Capital Ltd",
        status: "active",
        brokerId: "CL001",
        lastActive: "2025-04-12 14:30",
        portfolio: { cash: "MK 50,000", value: "MK 250,000", positions: [{ stock: "NBM", shares: 200, value: "MK 100,000" }, { stock: "AIRTEL", shares: 1000, value: "MK 50,000" }] },
        transactions: [{ id: "TR001", type: "Buy", amount: "MK 100,000", date: "2025-04-12", status: "Completed" }],
        orders: [{ id: "OR001", type: "Buy", stock: "NBM", quantity: 200, price: "MK 500", status: "Completed", date: "2025-04-12" }],
        kyc: {
            personal: { dob: "1985-06-15", address: "123 Main St, Lilongwe", phone: "+265 999 123 456" },
            id: { type: "National ID", number: "00CMVJH9", file: "id.pdf" },
            financial: { bank: "NBM", account: "1234567890", income: "MK 1,200,000" },
            employment: { employer: "Tech Corp", position: "Manager", years: 5 },
            risk: { level: "Medium", experience: "2 years" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Verified", csd: "CSD001" }
        }
    },
    CL002: {
        name: "Grace Banda",
        status: "pending",
        brokerId: "CL002",
        lastActive: "2025-04-11 09:15",
        kyc: {
            personal: { dob: "1990-03-22", address: "456 High St, Blantyre", phone: "+265 888 987 654" },
            id: { type: "Passport", number: "A123456", file: "passport.pdf" },
            financial: { bank: "FDH", account: "0987654321", income: "MK 800,000" },
            employment: { employer: "Finance Ltd", position: "Analyst", years: 3 },
            risk: { level: "Low", experience: "1 year" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Pending", csd: "" }
        }
    },
    CL003: {
        name: "Peter Kumwenda",
        status: "new",
        brokerId: "CL003",
        lastActive: "2025-04-10 16:45",
        kyc: {
            personal: { dob: "1988-11-10", address: "789 Low St, Mzuzu", phone: "+265 777 456 123" },
            id: { type: "Driver's License", number: "DL789123", file: "../Dist/images/id.jpg" },
            financial: { bank: "Standard", account: "1122334455", income: "MK 600,000" },
            employment: { employer: "Retail Co", position: "Supervisor", years: 4 },
            risk: { level: "High", experience: "None" },
            compliance: { pep: "Yes", sanctions: "None" }
        }
    },
    CL004: {
        name: "James Phiri",
        status: "pending",
        brokerId: "CL004",
        lastActive: "2025-04-09 12:00",
        kyc: {
            personal: { dob: "1987-07-19", address: "321 River Rd, Blantyre", phone: "+265 999 654 321" },
            id: { type: "Passport", number: "B987654", file: "passport2.pdf" },
            financial: { bank: "NBS", account: "6677889900", income: "MK 900,000" },
            employment: { employer: "Consulting Ltd", position: "Consultant", years: 6 },
            risk: { level: "Medium", experience: "3 years" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Pending", csd: "" }
        }
    },
    CL005: {
        name: "Peter Kumwenda",
        status: "active",
        brokerId: "CL005",
        lastActive: "2025-04-08 10:30",
        portfolio: { cash: "MK 30,000", value: "MK 180,000", positions: [{ stock: "AIRTEL", shares: 1500, value: "MK 75,000" }, { stock: "TNM", shares: 2000, value: "MK 40,000" }] },
        transactions: [{ id: "TR002", type: "Deposit", amount: "MK 30,000", date: "2025-04-08", status: "Completed" }],
        orders: [{ id: "OR002", type: "Buy", stock: "AIRTEL", quantity: 1500, price: "MK 50", status: "Completed", date: "2025-04-08" }],
        kyc: {
            personal: { dob: "1992-02-14", address: "654 Hill St, Lilongwe", phone: "+265 888 123 789" },
            id: { type: "National ID", number: "MW789123", file: "id2.pdf" },
            financial: { bank: "NBM", account: "5544332211", income: "MK 700,000" },
            employment: { employer: "Agri Corp", position: "Officer", years: 2 },
            risk: { level: "Low", experience: "1 year" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Verified", csd: "CSD002" }
        }
    }
};

// Broker Search
const brokerSearch = document.querySelector('.broker-search input');
brokerSearch.addEventListener('input', () => {
    const query = brokerSearch.value.toLowerCase();
    const rows = document.querySelectorAll('#brokerTableBody tr');
    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const id = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        row.style.display = name.includes(query) || id.includes(query) ? '' : 'none';
    });
});

// Broker Details Modal Population
function populateBrokerDetails(brokerId) {
    const broker = brokerData[brokerId];
    if (!broker) return;
    const modalBody = document.getElementById('brokerDetailsContent');
    const verificationSection = document.getElementById('pendingVerificationSection');
    verificationSection.classList.toggle('d-none', broker.status !== 'pending');

    modalBody.innerHTML = `
        <ul class="nav nav-tabs mb-3">
            ${broker.status === 'active' ? `
                <li class="nav-item"><a class="nav-link active" href="#" data-tab="portfolio">Performance</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-tab="clients">Clients</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-tab="transactions">Transactions</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-tab="orders">Orders</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-tab="orders">Activity Log</a></li>
            ` : ''}
            <li class="nav-item"><a class="nav-link ${broker.status !== 'active' ? 'active' : ''}" href="#" data-tab="kyc">KYC Details</a></li>
        </ul>
        <div class="tab-content">
            ${broker.status === 'active' ? `
                <div class="tab-pane active" id="portfolio-tab">
                    <div class="broker-info-section">
                        <canvas id="portfolioChart" class="mb-3"></canvas>
                        <div class="row">
                            <div class="col-md-6"><p><strong>Cash Balance:</strong> ${broker.portfolio.cash}</p></div>
                            <div class="col-md-6"><p><strong>Portfolio Value:</strong> ${broker.portfolio.value}</p></div>
                        </div>
                        <h6>Positions</h6>
                        <div class="table-responsive">
                            <table class="table table-dark">
                                <thead><tr><th>Stock</th><th>Shares</th><th>Value</th></tr></thead>
                                <tbody>
                                    ${broker.portfolio.positions.map(pos => `
                                        <tr><td>${pos.stock}</td><td>${pos.shares}</td><td>${pos.value}</td></tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="transactions-tab">
                    <div class="table-responsive">
                        <table class="table table-dark">
                            <thead><tr><th>ID</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                            <tbody>
                                ${broker.transactions.map(trans => `
                                    <tr class="transaction-row" data-trans-id="${trans.id}">
                                        <td>${trans.id}</td><td>${trans.type}</td><td>${trans.amount}</td><td>${trans.date}</td><td>${trans.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane" id="orders-tab">
                    <div class="table-responsive">
                        <table class="table table-dark">
                            <thead><tr><th>ID</th><th>Type</th><th>Stock</th><th>Quantity</th><th>Price</th><th>Status</th></tr></thead>
                            <tbody>
                                ${broker.orders.map(order => `
                                    <tr class="order-row" data-order-id="${order.id}">
                                        <td>${order.id}</td><td>${order.type}</td><td>${order.stock}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
            <div class="tab-pane ${broker.status !== 'active' ? 'active' : ''}" id="kyc-tab">
                <div class="broker-info-section">
                    <h6>Personal Details</h6>
                    <p><strong>Date of Birth:</strong> ${broker.kyc.personal.dob}</p>
                    <p><strong>Address:</strong> ${broker.kyc.personal.address}</p>
                    <p><strong>Phone:</strong> ${broker.kyc.personal.phone}</p>
                </div>
                <div class="broker-info-section">
                    <h6>Identification</h6>
                    <p><strong>Type:</strong> ${broker.kyc.id.type}</p>
                    <p><strong>Number:</strong> ${broker.kyc.id.number}</p>
                    <p><strong>Documents:</strong> <a href="${broker.kyc.id.file}" class="text-success" target="_blank">ID, </a><a href="${broker.kyc.id.file}" class="text-success" target="_blank">Bank Statement, </a><a href="${broker.kyc.id.file}" class="text-success" target="_blank">Utility Bill</a></p>
                </div>
                <div class="broker-info-section">
                    <h6>Financial Information</h6>
                    <p><strong>Bank:</strong> ${broker.kyc.financial.bank}</p>
                    <p><strong>Account:</strong> ${broker.kyc.financial.account}</p>
                    <p><strong>Annual Income:</strong> ${broker.kyc.financial.income}</p>
                </div>
                <div class="broker-info-section">
                    <h6>Employment Details</h6>
                    <p><strong>Employer:</strong> ${broker.kyc.employment.employer}</p>
                    <p><strong>Position:</strong> ${broker.kyc.employment.position}</p>
                    <p><strong>Years Employed:</strong> ${broker.kyc.employment.years}</p>
                </div>
                <div class="broker-info-section">
                    <h6>Risk Profile</h6>
                    <p><strong>Risk Level:</strong> ${broker.kyc.risk.level}</p>
                    <p><strong>Investment Experience:</strong> ${broker.kyc.risk.experience}</p>
                </div>
                <div class="broker-info-section">
                    <h6>Compliance</h6>
                    <p><strong>PEP Status:</strong> ${broker.kyc.compliance.pep}</p>
                    <p><strong>Sanctions:</strong> ${broker.kyc.compliance.sanctions}</p>
                </div>
                ${broker.status === 'active' || broker.status === 'pending' ? `
                    <div class="broker-info-section">
                        <h6>Verification</h6>
                        <p><strong>Status:</strong> <span class="status-badge status-${broker.kyc.verification.status.toLowerCase()}">${broker.kyc.verification.status}</span></p>
                        <p><strong>CSD Number:</strong> ${broker.kyc.verification.csd || 'Not Assigned'}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    // Tab Switching
    modalBody.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            modalBody.querySelectorAll('.nav-link').forEach(t => t.classList.remove('active'));
            modalBody.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });

    // Portfolio Chart
    if (broker.status === 'active') {
        new Chart(document.getElementById('portfolioChart'), {
            type: 'pie',
            data: {
                labels: broker.portfolio.positions.map(p => p.stock),
                datasets: [{ data: broker.portfolio.positions.map(p => parseFloat(p.value.replace('MK ', '').replace(',', ''))), backgroundColor: ['#28a745', '#007bff', '#dc3545'] }]
            },
            options: { responsive: true, plugins: { legend: { labels: { color: '#d0d4d6' } } } }
        });
    }

    // Transaction Row Clicks
    modalBody.querySelectorAll('.transaction-row').forEach(row => {
        row.addEventListener('click', () => {
            const transId = row.dataset.transId;
            const trans = broker.transactions.find(t => t.id === transId);
            document.getElementById('transId').textContent = trans.id;
            document.getElementById('transBroker').textContent = broker.name;
            document.getElementById('transType').textContent = trans.type;
            document.getElementById('transAmount').textContent = trans.amount;
            document.getElementById('transDate').textContent = trans.date;
            document.getElementById('transStatus').textContent = trans.status;
            new bootstrap.Modal(document.getElementById('transactionDetailsModal')).show();
        });
    });

    // Order Row Clicks
    modalBody.querySelectorAll('.order-row').forEach(row => {
        row.addEventListener('click', () => {
            const orderId = row.dataset.orderId;
            const order = broker.orders.find(o => o.id === orderId);
            document.getElementById('orderId').textContent = order.id;
            document.getElementById('orderBroker').textContent = broker.name;
            document.getElementById('orderType').textContent = order.type;
            document.getElementById('orderStock').textContent = order.stock;
            document.getElementById('orderQuantity').textContent = order.quantity;
            document.getElementById('orderPrice').textContent = order.price;
            document.getElementById('orderStatus').textContent = order.status;
            document.getElementById('orderDate').textContent = order.date;
            new bootstrap.Modal(document.getElementById('orderDetailsModal')).show();
        });
    });
}

// View Broker Buttons
document.querySelectorAll('.view-broker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const brokerId = row.dataset.brokerId;
        populateBrokerDetails(brokerId);
    });
});


// Message Form Submission
document.getElementById('messageBrokerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const brokerName = document.getElementById('messageBrokerName').value;
    const messageType = document.getElementById('messageType').value;
    const messageContent = document.getElementById('messageContent').value;
    alert(`Message sent to ${brokerName} via ${messageType}:\n${messageContent}`);
    messageModal.hide();
    document.getElementById('messageBrokerForm').reset();
});


// Investor Data
const investorData = {
    CL001: {
        name: "John Mwale",
        status: "active",
        investorId: "CL001",
        lastActive: "2025-04-12 14:30",
        portfolio: { cash: "MK 50,000", value: "MK 250,000", positions: [{ stock: "NBM", shares: 200, value: "MK 100,000" }, { stock: "AIRTEL", shares: 1000, value: "MK 50,000" }] },
        transactions: [{ id: "TR001", type: "Buy", amount: "MK 100,000", date: "2025-04-12", status: "Completed" }],
        orders: [{ id: "OR001", type: "Buy", stock: "NBM", quantity: 200, price: "MK 500", status: "Completed", date: "2025-04-12" }],
        kyc: {
            personal: { dob: "1985-06-15", address: "123 Main St, Lilongwe", phone: "+265 999 123 456" },
            id: { type: "National ID", number: "00CMVJH9", file: "id.pdf" },
            financial: { bank: "NBM", account: "1234567890", income: "MK 1,200,000" },
            employment: { employer: "Tech Corp", position: "Manager", years: 5 },
            risk: { level: "Medium", experience: "2 years" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Verified", csd: "CSD001" }
        }
    },
    CL002: {
        name: "Grace Banda",
        status: "pending",
        investorId: "CL002",
        lastActive: "2025-04-11 09:15",
        kyc: {
            personal: { dob: "1990-03-22", address: "456 High St, Blantyre", phone: "+265 888 987 654" },
            id: { type: "Passport", number: "A123456", file: "passport.pdf" },
            financial: { bank: "FDH", account: "0987654321", income: "MK 800,000" },
            employment: { employer: "Finance Ltd", position: "Analyst", years: 3 },
            risk: { level: "Low", experience: "1 year" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Pending", csd: "" }
        }
    },
    CL003: {
        name: "Peter Kumwenda",
        status: "new",
        investorId: "CL003",
        lastActive: "2025-04-10 16:45",
        kyc: {
            personal: { dob: "1988-11-10", address: "789 Low St, Mzuzu", phone: "+265 777 456 123" },
            id: { type: "Driver's License", number: "DL789123", file: "../Dist/images/id.jpg" },
            financial: { bank: "Standard", account: "1122334455", income: "MK 600,000" },
            employment: { employer: "Retail Co", position: "Supervisor", years: 4 },
            risk: { level: "High", experience: "None" },
            compliance: { pep: "Yes", sanctions: "None" }
        }
    },
    CL004: {
        name: "James Phiri",
        status: "pending",
        investorId: "CL004",
        lastActive: "2025-04-09 12:00",
        kyc: {
            personal: { dob: "1987-07-19", address: "321 River Rd, Blantyre", phone: "+265 999 654 321" },
            id: { type: "Passport", number: "B987654", file: "passport2.pdf" },
            financial: { bank: "NBS", account: "6677889900", income: "MK 900,000" },
            employment: { employer: "Consulting Ltd", position: "Consultant", years: 6 },
            risk: { level: "Medium", experience: "3 years" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Pending", csd: "" }
        }
    },
    CL005: {
        name: "Peter Kumwenda",
        status: "active",
        investorId: "CL005",
        lastActive: "2025-04-08 10:30",
        portfolio: { cash: "MK 30,000", value: "MK 180,000", positions: [{ stock: "AIRTEL", shares: 1500, value: "MK 75,000" }, { stock: "TNM", shares: 2000, value: "MK 40,000" }] },
        transactions: [{ id: "TR002", type: "Deposit", amount: "MK 30,000", date: "2025-04-08", status: "Completed" }],
        orders: [{ id: "OR002", type: "Buy", stock: "AIRTEL", quantity: 1500, price: "MK 50", status: "Completed", date: "2025-04-08" }],
        kyc: {
            personal: { dob: "1992-02-14", address: "654 Hill St, Lilongwe", phone: "+265 888 123 789" },
            id: { type: "National ID", number: "MW789123", file: "id2.pdf" },
            financial: { bank: "NBM", account: "5544332211", income: "MK 700,000" },
            employment: { employer: "Agri Corp", position: "Officer", years: 2 },
            risk: { level: "Low", experience: "1 year" },
            compliance: { pep: "No", sanctions: "None" },
            verification: { status: "Verified", csd: "CSD002" }
        }
    }
};

// Investor Search
const investorSearch = document.querySelector('.investor-search input');
investorSearch.addEventListener('input', () => {
    const query = investorSearch.value.toLowerCase();
    const rows = document.querySelectorAll('#investorTableBody tr');
    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const id = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        row.style.display = name.includes(query) || id.includes(query) ? '' : 'none';
    });
});

// Investor Details Modal Population
function populateInvestorDetails(investorId) {
    const investor = investorData[investorId];
    if (!investor) return;
    const modalBody = document.getElementById('investorDetailsContent');
    const verificationSection = document.getElementById('pendingVerificationSection');
    verificationSection.classList.toggle('d-none', investor.status !== 'pending');

    modalBody.innerHTML = `
        <ul class="nav nav-tabs mb-3">
            ${investor.status === 'active' ? `
                <li class="nav-item"><a class="nav-link active" href="#" data-tab="portfolio">Portfolio</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-tab="transactions">Transactions</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-tab="orders">Orders</a></li>
            ` : ''}
            <li class="nav-item"><a class="nav-link ${investor.status !== 'active' ? 'active' : ''}" href="#" data-tab="kyc">KYC Details</a></li>
        </ul>
        <div class="tab-content">
            ${investor.status === 'active' ? `
                <div class="tab-pane active" id="portfolio-tab">
                    <div class="investor-info-section">
                        <canvas id="portfolioChart" class="mb-3"></canvas>
                        <div class="row">
                            <div class="col-md-6"><p><strong>Cash Balance:</strong> ${investor.portfolio.cash}</p></div>
                            <div class="col-md-6"><p><strong>Portfolio Value:</strong> ${investor.portfolio.value}</p></div>
                        </div>
                        <h6>Positions</h6>
                        <div class="table-responsive">
                            <table class="table table-dark">
                                <thead><tr><th>Stock</th><th>Shares</th><th>Value</th></tr></thead>
                                <tbody>
                                    ${investor.portfolio.positions.map(pos => `
                                        <tr><td>${pos.stock}</td><td>${pos.shares}</td><td>${pos.value}</td></tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="transactions-tab">
                    <div class="table-responsive">
                        <table class="table table-dark">
                            <thead><tr><th>ID</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                            <tbody>
                                ${investor.transactions.map(trans => `
                                    <tr class="transaction-row" data-trans-id="${trans.id}">
                                        <td>${trans.id}</td><td>${trans.type}</td><td>${trans.amount}</td><td>${trans.date}</td><td>${trans.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane" id="orders-tab">
                    <div class="table-responsive">
                        <table class="table table-dark">
                            <thead><tr><th>ID</th><th>Type</th><th>Stock</th><th>Quantity</th><th>Price</th><th>Status</th></tr></thead>
                            <tbody>
                                ${investor.orders.map(order => `
                                    <tr class="order-row" data-order-id="${order.id}">
                                        <td>${order.id}</td><td>${order.type}</td><td>${order.stock}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
            <div class="tab-pane ${investor.status !== 'active' ? 'active' : ''}" id="kyc-tab">
                <div class="investor-info-section">
                    <h6>Personal Details</h6>
                    <p><strong>Date of Birth:</strong> ${investor.kyc.personal.dob}</p>
                    <p><strong>Address:</strong> ${investor.kyc.personal.address}</p>
                    <p><strong>Phone:</strong> ${investor.kyc.personal.phone}</p>
                </div>
                <div class="investor-info-section">
                    <h6>Identification</h6>
                    <p><strong>Type:</strong> ${investor.kyc.id.type}</p>
                    <p><strong>Number:</strong> ${investor.kyc.id.number}</p>
                    <p><strong>Documents:</strong> <a href="${investor.kyc.id.file}" class="text-success" target="_blank">ID, </a><a href="${investor.kyc.id.file}" class="text-success" target="_blank">Bank Statement, </a><a href="${investor.kyc.id.file}" class="text-success" target="_blank">Utility Bill</a></p>
                </div>
                <div class="investor-info-section">
                    <h6>Financial Information</h6>
                    <p><strong>Bank:</strong> ${investor.kyc.financial.bank}</p>
                    <p><strong>Account:</strong> ${investor.kyc.financial.account}</p>
                    <p><strong>Annual Income:</strong> ${investor.kyc.financial.income}</p>
                </div>
                <div class="investor-info-section">
                    <h6>Employment Details</h6>
                    <p><strong>Employer:</strong> ${investor.kyc.employment.employer}</p>
                    <p><strong>Position:</strong> ${investor.kyc.employment.position}</p>
                    <p><strong>Years Employed:</strong> ${investor.kyc.employment.years}</p>
                </div>
                <div class="investor-info-section">
                    <h6>Risk Profile</h6>
                    <p><strong>Risk Level:</strong> ${investor.kyc.risk.level}</p>
                    <p><strong>Investment Experience:</strong> ${investor.kyc.risk.experience}</p>
                </div>
                <div class="investor-info-section">
                    <h6>Compliance</h6>
                    <p><strong>PEP Status:</strong> ${investor.kyc.compliance.pep}</p>
                    <p><strong>Sanctions:</strong> ${investor.kyc.compliance.sanctions}</p>
                </div>
                ${investor.status === 'active' || investor.status === 'pending' ? `
                    <div class="investor-info-section">
                        <h6>Verification</h6>
                        <p><strong>Status:</strong> <span class="status-badge status-${investor.kyc.verification.status.toLowerCase()}">${investor.kyc.verification.status}</span></p>
                        <p><strong>CSD Number:</strong> ${investor.kyc.verification.csd || 'Not Assigned'}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    // Tab Switching
    modalBody.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            modalBody.querySelectorAll('.nav-link').forEach(t => t.classList.remove('active'));
            modalBody.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });

    // Portfolio Chart
    if (investor.status === 'active') {
        new Chart(document.getElementById('portfolioChart'), {
            type: 'pie',
            data: {
                labels: investor.portfolio.positions.map(p => p.stock),
                datasets: [{ data: investor.portfolio.positions.map(p => parseFloat(p.value.replace('MK ', '').replace(',', ''))), backgroundColor: ['#28a745', '#007bff', '#dc3545'] }]
            },
            options: { responsive: true, plugins: { legend: { labels: { color: '#d0d4d6' } } } }
        });
    }

    // Transaction Row Clicks
    modalBody.querySelectorAll('.transaction-row').forEach(row => {
        row.addEventListener('click', () => {
            const transId = row.dataset.transId;
            const trans = investor.transactions.find(t => t.id === transId);
            document.getElementById('transId').textContent = trans.id;
            document.getElementById('transInvestor').textContent = investor.name;
            document.getElementById('transType').textContent = trans.type;
            document.getElementById('transAmount').textContent = trans.amount;
            document.getElementById('transDate').textContent = trans.date;
            document.getElementById('transStatus').textContent = trans.status;
            new bootstrap.Modal(document.getElementById('transactionDetailsModal')).show();
        });
    });

    // Order Row Clicks
    modalBody.querySelectorAll('.order-row').forEach(row => {
        row.addEventListener('click', () => {
            const orderId = row.dataset.orderId;
            const order = investor.orders.find(o => o.id === orderId);
            document.getElementById('orderId').textContent = order.id;
            document.getElementById('orderInvestor').textContent = investor.name;
            document.getElementById('orderType').textContent = order.type;
            document.getElementById('orderStock').textContent = order.stock;
            document.getElementById('orderQuantity').textContent = order.quantity;
            document.getElementById('orderPrice').textContent = order.price;
            document.getElementById('orderStatus').textContent = order.status;
            document.getElementById('orderDate').textContent = order.date;
            new bootstrap.Modal(document.getElementById('orderDetailsModal')).show();
        });
    });
}

// View Investor Buttons
document.querySelectorAll('.view-investor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const investorId = row.dataset.investorId;
        populateInvestorDetails(investorId);
    });
});

// Message Investor Buttons
const messageModal = new bootstrap.Modal(document.getElementById('messageInvestorModal'));
document.querySelectorAll('#investorTable .btn-primary:not(.view-investor-btn)').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const investorName = row.querySelector('td:nth-child(1)').textContent;
        document.getElementById('messageInvestorName').value = investorName;
        messageModal.show();
    });
});

// Message Form Submission
document.getElementById('messageInvestorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const investorName = document.getElementById('messageInvestorName').value;
    const messageType = document.getElementById('messageType').value;
    const messageContent = document.getElementById('messageContent').value;
    alert(`Message sent to ${investorName} via ${messageType}:\n${messageContent}`);
    messageModal.hide();
    document.getElementById('messageInvestorForm').reset();
});

// CSD Verification
document.getElementById('verifyInvestorBtn').addEventListener('click', () => {
    const csdInput = document.getElementById('csdNumberInput');
    const csdNumber = csdInput.value.trim();
    if (!csdNumber) {
        csdInput.classList.add('is-invalid');
        csdInput.nextElementSibling.textContent = 'CSD Number is required.';
        return;
    }
    csdInput.classList.remove('is-invalid');
    alert(`Investor verified with CSD Number: ${csdNumber}`);
    csdInput.value = '';
});


// Order Data
const orderData = {
    OR001: {
        id: "OR001",
        investor: "John Mwale",
        type: "Buy",
        stock: "NBM",
        quantity: 200,
        price: "MK 500",
        status: "new",
        date: "2025-04-12 14:30",
        action: "buy",
        orderType: "market"
    },
    OR002: {
        id: "OR002",
        investor: "Grace Banda",
        type: "Sell",
        stock: "AIRTEL",
        quantity: 1000,
        price: "MK 50",
        status: "pending",
        date: "2025-04-12 10:15",
        action: "sell",
        orderType: "limit"
    },
    OR003: {
        id: "OR003",
        investor: "Peter Kumwenda",
        type: "Buy",
        stock: "ILLOVO",
        quantity: 300,
        price: "MK 300",
        status: "executed",
        date: "2025-04-11 16:45",
        action: "buy",
        orderType: "market"
    },
    OR004: {
        id: "OR004",
        investor: "James Phiri",
        type: "Sell",
        stock: "SUNBIRD",
        quantity: 500,
        price: "MK 200",
        status: "cancelled",
        date: "2025-04-11 09:00",
        action: "sell",
        orderType: "limit"
    }
};

// Export Table to CSV
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    let csv = [];
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = Array.from(cols).map(col => {
            let text = col.textContent.replace(/"/g, '""');
            if (col.querySelector('.badge')) {
                text = col.querySelector('.badge').textContent;
            } else if (col.querySelector('button')) {
                text = '';
            }
            return `"${text}"`;
        }).filter(text => text !== '""');
        csv.push(rowData.join(','));
    });
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Export Order Details to CSV
function exportOrderDetails() {
    const details = [
        ['Order ID', document.getElementById('orderId').textContent],
        ['Investor', document.getElementById('orderInvestor').textContent],
        ['Type', document.getElementById('orderType').textContent],
        ['Stock', document.getElementById('orderStock').textContent],
        ['Quantity', document.getElementById('orderQuantity').textContent],
        ['Price', document.getElementById('orderPrice').textContent],
        ['Status', document.getElementById('orderStatus').textContent],
        ['Date', document.getElementById('orderDate').textContent]
    ];
    const csv = details.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `order_${document.getElementById('orderId').textContent}.csv`;
    link.click();
}

// Table Sorting
function sortTable(tableId, column, type) {
    const tbody = document.getElementById(tableId + 'Body');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAsc = !tbody.dataset[column] || tbody.dataset[column] === 'desc';
    tbody.dataset[column] = isAsc ? 'asc' : 'desc';

    rows.sort((a, b) => {
        let aVal = a.dataset[type] || a.querySelector(`td:nth-child(${type === 'orderId' ? 1 : type === 'investor' ? 2 : type === 'order' ? 3 : type === 'status' ? 4 : type === 'action' ? 5 : 6})`).textContent;
        let bVal = b.dataset[type] || b.querySelector(`td:nth-child(${type === 'orderId' ? 1 : type === 'investor' ? 2 : type === 'order' ? 3 : type === 'status' ? 4 : type === 'action' ? 5 : 6})`).textContent;
        if (type === 'status') {
            const statusOrder = ['new', 'pending', 'executed', 'cancelled', 'expired'];
            aVal = statusOrder.indexOf(aVal.toLowerCase());
            bVal = statusOrder.indexOf(bVal.toLowerCase());
        } else if (type === 'orderId') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        return isAsc ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));

    document.querySelectorAll(`#${tableId} .sortable`).forEach(th => {
        th.classList.remove('asc', 'desc');
        if (th.dataset.sort === column) {
            th.classList.add(isAsc ? 'asc' : 'desc');
        }
    });
}

// Order Overview Search
const orderOverviewSearch = document.getElementById('orderOverviewSearch');
orderOverviewSearch.addEventListener('input', () => {
    const query = orderOverviewSearch.value.toLowerCase();
    const rows = document.querySelectorAll('#orderOverviewTableBody tr');
    rows.forEach(row => {
        const orderId = row.dataset.orderId.toLowerCase();
        const investor = row.dataset.investor.toLowerCase();
        const order = row.dataset.order.toLowerCase();
        row.style.display = orderId.includes(query) || investor.includes(query) || order.includes(query) ? '' : 'none';
    });
});

// Order Management Search and Filters
const orderManagementSearch = document.getElementById('orderManagementSearch');
const orderStatusFilter = document.getElementById('orderStatusFilter');
const orderActionFilter = document.getElementById('orderActionFilter');
const orderTypeFilter = document.getElementById('orderTypeFilter');

function filterOrderManagementTable() {
    const query = orderManagementSearch.value.toLowerCase();
    const status = orderStatusFilter.value.toLowerCase();
    const action = orderActionFilter.value.toLowerCase();
    const type = orderTypeFilter.value.toLowerCase();
    const rows = document.querySelectorAll('#orderManagementTableBody tr');
    rows.forEach(row => {
        const orderId = row.dataset.orderId.toLowerCase();
        const investor = row.dataset.investor.toLowerCase();
        const order = row.dataset.order.toLowerCase();
        const rowStatus = row.dataset.status.toLowerCase();
        const rowAction = row.dataset.action.toLowerCase();
        const rowType = row.dataset.type.toLowerCase();
        const matchesSearch = orderId.includes(query) || investor.includes(query) || order.includes(query);
        const matchesStatus = !status || rowStatus === status;
        const matchesAction = !action || rowAction === action;
        const matchesType = !type || rowType === type;
        row.style.display = matchesSearch && matchesStatus && matchesAction && matchesType ? '' : 'none';
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Transaction Settings
    const transactionForm = document.querySelector('#transaction-settings-form');
    const transactionAutoApproveCheckbox = document.querySelector('#transaction-auto-approve');
    const transactionThresholdInput = document.querySelector('#transaction-threshold');

    // Orders Settings
    const ordersForm = document.querySelector('#orders-settings-form');
    const ordersAutoApproveCheckbox = document.querySelector('#orders-auto-approve');
    const ordersThresholdInput = document.querySelector('#orders-threshold');

    // Toggle threshold input based on checkbox state
    function toggleThresholdInput(checkbox, input) {
        input.disabled = !checkbox.checked;
    }

    // Initial state
    if (transactionAutoApproveCheckbox && transactionThresholdInput) {
        toggleThresholdInput(transactionAutoApproveCheckbox, transactionThresholdInput);
        transactionAutoApproveCheckbox.addEventListener('change', () => {
            toggleThresholdInput(transactionAutoApproveCheckbox, transactionThresholdInput);
        });
    }

    if (ordersAutoApproveCheckbox && ordersThresholdInput) {
        toggleThresholdInput(ordersAutoApproveCheckbox, ordersThresholdInput);
        ordersAutoApproveCheckbox.addEventListener('change', () => {
            toggleThresholdInput(ordersAutoApproveCheckbox, ordersThresholdInput);
        });
    }

    // Validation function
    function validateNumberInput(input, min, max, fieldName) {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < min || (max !== undefined && value > max)) {
            return `${fieldName} must be between ${min} and ${max !== undefined ? max : 'infinity'}.`;
        }
        return null;
    }

    // Transaction Settings submission
    if (transactionForm) {
        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const errors = [];

            const flatFee = document.querySelector('#transaction-flat-fee');
            const percentFee = document.querySelector('#transaction-percent-fee');
            const minFee = document.querySelector('#transaction-min-fee');
            const maxFee = document.querySelector('#transaction-max-fee');
            const threshold = document.querySelector('#transaction-threshold');

            errors.push(validateNumberInput(flatFee, 0, undefined, 'Flat Transaction Fee'));
            errors.push(validateNumberInput(percentFee, 0, 100, 'Percentage-Based Fee'));
            errors.push(validateNumberInput(minFee, 0, undefined, 'Minimum Transaction Fee'));
            errors.push(validateNumberInput(maxFee, 0, undefined, 'Maximum Transaction Fee'));
            if (transactionAutoApproveCheckbox.checked) {
                errors.push(validateNumberInput(threshold, 0, undefined, 'Auto-Approval Threshold'));
            }

            const filteredErrors = errors.filter(error => error !== null);
            if (filteredErrors.length > 0) {
                alert('Validation Errors:\n' + filteredErrors.join('\n'));
                return;
            }

            // Simulate saving (replace with API call)
            alert('Transaction Settings saved successfully!');
            // Example API call:
            // fetch('/api/save-transaction-settings', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         flatFee: flatFee.value,
            //         percentFee: percentFee.value,
            //         minFee: minFee.value,
            //         maxFee: maxFee.value,
            //         autoApprove: transactionAutoApproveCheckbox.checked,
            //         threshold: threshold.value
            //     }),
            //     headers: { 'Content-Type': 'application/json' }
            // }).then(response => response.json()).then(data => alert('Settings saved!'));
        });
    }

    // Orders Settings submission
    if (ordersForm) {
        ordersForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const errors = [];

            const minQuantity = document.querySelector('#orders-min-quantity');
            const maxQuantity = document.querySelector('#orders-max-quantity');
            const flatCommission = document.querySelector('#orders-flat-commission');
            const percentCommission = document.querySelector('#orders-percent-commission');
            const flatFee = document.querySelector('#orders-flat-fee');
            const percentFee = document.querySelector('#orders-percent-fee');
            const expiration = document.querySelector('#orders-expiration');
            const threshold = document.querySelector('#orders-threshold');

            errors.push(validateNumberInput(minQuantity, 1, undefined, 'Minimum Order Quantity'));
            errors.push(validateNumberInput(maxQuantity, 1, undefined, 'Maximum Order Quantity'));
            errors.push(validateNumberInput(flatCommission, 0, undefined, 'Flat Order Commission'));
            errors.push(validateNumberInput(percentCommission, 0, 100, 'Percentage-Based Commission'));
            errors.push(validateNumberInput(flatFee, 0, undefined, 'Flat Order Transaction Fee'));
            errors.push(validateNumberInput(percentFee, 0, 100, 'Percentage-Based Transaction Fee'));
            errors.push(validateNumberInput(expiration, 1, undefined, 'Order Expiration Period'));
            if (ordersAutoApproveCheckbox.checked) {
                errors.push(validateNumberInput(threshold, 0, undefined, 'Auto-Approval Threshold'));
            }

            if (parseFloat(maxQuantity.value) < parseFloat(minQuantity.value)) {
                errors.push('Maximum Order Quantity must be greater than or equal to Minimum Order Quantity.');
            }

            const filteredErrors = errors.filter(error => error !== null);
            if (filteredErrors.length > 0) {
                alert('Validation Errors:\n' + filteredErrors.join('\n'));
                return;
            }

            // Simulate saving (replace with API call)
            alert('Orders Settings saved successfully!');
            // Example API call:
            // fetch('/api/save-orders-settings', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         orderType: document.querySelector('#orders-type').value,
            //         minQuantity: minQuantity.value,
            //         maxQuantity: maxQuantity.value,
            //         flatCommission: flatCommission.value,
            //         percentCommission: percentCommission.value,
            //         flatFee: flatFee.value,
            //         percentFee: percentFee.value,
            //         expiration: expiration.value,
            //         autoApprove: ordersAutoApproveCheckbox.checked,
            //         threshold: threshold.value,
            //         restrictMarketHours: document.querySelector('#orders-market-hours').checked
            //     }),
            //     headers: { 'Content-Type': 'application/json' }
            // }).then(response => response.json()).then(data => alert('Settings saved!'));
        });
    }
});
orderManagementSearch.addEventListener('input', filterOrderManagementTable);
orderStatusFilter.addEventListener('change', filterOrderManagementTable);
orderActionFilter.addEventListener('change', filterOrderManagementTable);
orderTypeFilter.addEventListener('change', filterOrderManagementTable);

// Populate Order Details Modal
function populateOrderDetails(orderId) {
    const order = orderData[orderId];
    if (!order) return;
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('orderInvestor').textContent = order.investor;
    document.getElementById('orderType').textContent = order.type;
    document.getElementById('orderStock').textContent = order.stock;
    document.getElementById('orderQuantity').textContent = order.quantity;
    document.getElementById('orderPrice').textContent = order.price;
    document.getElementById('orderStatus').textContent = order.status;
    document.getElementById('orderDate').textContent = order.date;

    const actionsDiv = document.getElementById('orderActions');
    actionsDiv.innerHTML = '';
    if (order.status.toLowerCase() === 'new') {
        actionsDiv.innerHTML = `
            <button class="btn btn-success btn-sm me-1" onclick="handleOrderAction('${orderId}', 'approve')"><i class="bi bi-check"></i> Approve</button>
            <button class="btn btn-danger btn-sm" onclick="handleOrderAction('${orderId}', 'cancel')"><i class="bi bi-x"></i> Cancel</button>
        `;
    } else if (order.status.toLowerCase() === 'pending') {
        actionsDiv.innerHTML = `
            <button class="btn btn-success btn-sm me-1" onclick="handleOrderAction('${orderId}', 'execute')"><i class="bi bi-check-circle"></i> Execute</button>
            <button class="btn btn-danger btn-sm" onclick="handleOrderAction('${orderId}', 'cancel')"><i class="bi bi-x"></i> Cancel</button>
        `;
    }
}

// Order Action Handling
function handleOrderAction(orderId, action) {
    const order = orderData[orderId];
    if (action === 'approve') {
        order.status = 'pending';
        alert(`Order ${orderId} approved.`);
    } else if (action === 'execute') {
        order.status = 'executed';
        alert(`Order ${orderId} executed.`);
    } else if (action === 'cancel') {
        order.status = 'cancelled';
        alert(`Order ${orderId} cancelled.`);
    }
    updateOrderTables(orderId);
    bootstrap.Modal.getInstance(document.getElementById('orderDetailsModal')).hide();
}

// Update Order Tables
function updateOrderTables(orderId) {
    const order = orderData[orderId];
    const badgeClass = {
        new: 'bg-info',
        pending: 'bg-warning',
        executed: 'bg-success',
        cancelled: 'bg-danger',
        expired: 'bg-secondary'
    };
    const rows = document.querySelectorAll(`tr[data-order-id="${orderId}"]`);
    rows.forEach(row => {
        row.dataset.status = order.status.toLowerCase();
        const statusCell = row.querySelector('td:nth-child(4)');
        statusCell.innerHTML = `<span class="badge ${badgeClass[order.status.toLowerCase()]}">${order.status}</span>`;
    });
}

// View Order Buttons
document.querySelectorAll('.view-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const orderId = row.dataset.orderId;
        populateOrderDetails(orderId);
    });
});

// Sorting Event Listeners
document.querySelectorAll('#orderOverviewTable .sortable').forEach(th => {
    th.addEventListener('click', () => {
        sortTable('orderOverviewTable', th.dataset.sort, th.dataset.sort);
    });
});
document.querySelectorAll('#orderManagementTable .sortable').forEach(th => {
    th.addEventListener('click', () => {
        sortTable('orderManagementTable', th.dataset.sort, th.dataset.sort);
    });
});

// Export Buttons
document.getElementById('exportOverviewBtn').addEventListener('click', () => {
    exportTableToCSV('orderOverviewTable', 'order_overview.csv');
});
document.getElementById('exportManagementBtn').addEventListener('click', () => {
    exportTableToCSV('orderManagementTable', 'order_management.csv');
});
document.getElementById('exportOrderDetailsBtn').addEventListener('click', () => {
    exportOrderDetails();
});
// Transaction Data
const transactionData = {
    TR001: {
        id: "TR001",
        investor: "John Mwale",
        type: "Deposit",
        amount: "MK 50,000",
        status: "new",
        date: "2025-04-12 14:30",
        method: "deposit"
    },
    TR002: {
        id: "TR002",
        investor: "Grace Banda",
        type: "Withdrawal",
        amount: "MK 20,000",
        status: "new",
        date: "2025-04-12 10:15",
        method: "withdrawal"
    },
    TR003: {
        id: "TR003",
        investor: "Peter Kumwenda",
        type: "Deposit",
        amount: "MK 30,000",
        status: "verified",
        date: "2025-04-11 16:45",
        method: "deposit"
    },
    TR004: {
        id: "TR004",
        investor: "James Phiri",
        type: "Withdrawal",
        amount: "MK 15,000",
        status: "verified",
        date: "2025-04-11 09:00",
        method: "withdrawal"
    },
    TR005: {
        id: "TR005",
        investor: "Mary Chirwa",
        type: "Deposit",
        amount: "MK 40,000",
        status: "new",
        date: "2025-04-10 12:30",
        method: "deposit"
    }
};

// Transaction Overview Search
const transactionOverviewSearch = document.getElementById('transactionOverviewSearch');
transactionOverviewSearch.addEventListener('input', () => {
    const query = transactionOverviewSearch.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionOverviewTableBody tr');
    rows.forEach(row => {
        const investor = row.dataset.investor.toLowerCase();
        const status = row.dataset.status.toLowerCase();
        row.style.display = investor.includes(query) || status.includes(query) ? '' : 'none';
    });
});

// Transaction Verification Search and Filters
const transactionVerificationSearch = document.getElementById('transactionVerificationSearch');
const transactionStatusFilter = document.getElementById('transactionStatusFilter');
const transactionIdFilter = document.getElementById('transactionIdFilter');
const transactionMethodFilter = document.getElementById('transactionMethodFilter');

function filterTransactionVerificationTable() {
    const query = transactionVerificationSearch.value.toLowerCase();
    const status = transactionStatusFilter.value.toLowerCase();
    const transId = transactionIdFilter.value.toLowerCase();
    const method = transactionMethodFilter.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionVerificationTableBody tr');
    rows.forEach(row => {
        const investor = row.dataset.investor.toLowerCase();
        const rowTransId = row.dataset.transId.toLowerCase();
        const rowStatus = row.dataset.status.toLowerCase();
        const rowMethod = row.dataset.type.toLowerCase();
        const matchesSearch = investor.includes(query) || rowTransId.includes(query);
        const matchesStatus = !status || rowStatus === status;
        const matchesTransId = !transId || rowTransId.includes(transId);
        const matchesMethod = !method || rowMethod === method;
        row.style.display = matchesSearch && matchesStatus && matchesTransId && matchesMethod ? '' : 'none';
    });
}

transactionVerificationSearch.addEventListener('input', filterTransactionVerificationTable);
transactionStatusFilter.addEventListener('change', filterTransactionVerificationTable);
transactionIdFilter.addEventListener('input', filterTransactionVerificationTable);
transactionMethodFilter.addEventListener('change', filterTransactionVerificationTable);

// Populate Transaction Details Modal
function populateTransactionDetails(transId) {
    const trans = transactionData[transId];
    if (!trans) return;
    document.getElementById('transId').textContent = trans.id;
    document.getElementById('transInvestor').textContent = trans.investor;
    document.getElementById('transType').textContent = trans.type;
    document.getElementById('transAmount').textContent = trans.amount;
    document.getElementById('transDate').textContent = trans.date;
    document.getElementById('transStatus').textContent = trans.status;

    const actionsDiv = document.getElementById('transactionActions');
    actionsDiv.innerHTML = '';
    if (trans.status.toLowerCase() === 'new') {
        actionsDiv.innerHTML = `
            <button class="btn btn-success btn-sm me-1 verify-trans-btn" data-trans-id="${transId}"><i class="bi bi-check"></i> Verify</button>
        `;
    }
    new bootstrap.Modal(document.getElementById('transactionDetailsModal')).show();
}

// Handle Transaction Verification
function handleTransactionVerification(transId) {
    const trans = transactionData[transId];
    trans.status = 'verified';
    alert(`Transaction ${transId} verified.`);
    updateTransactionTables(transId);
    bootstrap.Modal.getInstance(document.getElementById('transactionDetailsModal')).hide();
}

// Update Transaction Tables
function updateTransactionTables(transId) {
    const trans = transactionData[transId];
    const badgeClass = {
        new: 'bg-info',
        verified: 'bg-success'
    };
    const rows = document.querySelectorAll(`tr[data-trans-id="${transId}"]`);
    rows.forEach(row => {
        row.dataset.status = trans.status.toLowerCase();
        const statusCell = row.querySelector('td:nth-child(4)');
        statusCell.innerHTML = `<span class="badge ${badgeClass[trans.status.toLowerCase()]}">${trans.status}</span>`;
        const actionCell = row.querySelector('td:last-child');
        if (trans.status.toLowerCase() === 'verified') {
            actionCell.innerHTML = `<button class="btn btn-primary btn-sm view-trans-btn" data-trans-id="${transId}"><i class="bi bi-eye"></i> View</button>`;
        }
    });
    filterTransactionVerificationTable(); // Reapply filters
}

// View and Verify Transaction Buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.view-trans-btn')) {
        const transId = e.target.closest('.view-trans-btn').dataset.transId;
        populateTransactionDetails(transId);
    } else if (e.target.closest('.verify-trans-btn')) {
        const transId = e.target.closest('.verify-trans-btn').dataset.transId;
        handleTransactionVerification(transId);
    }
});

// Sort Transactions Table
function sortTransactionTable(tableId, column) {
    const tbody = document.getElementById(tableId + 'Body');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAsc = !tbody.dataset[column] || tbody.dataset[column] === 'desc';
    tbody.dataset[column] = isAsc ? 'asc' : 'desc';

    rows.sort((a, b) => {
        let aVal = a.dataset[column];
        let bVal = b.dataset[column];
        if (column === 'amount' || column === 'date') {
            aVal = column === 'amount' ? parseFloat(aVal) : new Date(aVal);
            bVal = column === 'amount' ? parseFloat(bVal) : new Date(bVal);
        } else if (column === 'status') {
            const statusOrder = ['new', 'verified'];
            aVal = statusOrder.indexOf(aVal.toLowerCase());
            bVal = statusOrder.indexOf(bVal.toLowerCase());
        }
        return isAsc ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));

    document.querySelectorAll(`#${tableId} .sortable`).forEach(th => {
        th.classList.remove('asc', 'desc');
        if (th.dataset.sort === column) {
            th.classList.add(isAsc ? 'asc' : 'desc');
        }
    });
}

// Sorting Event Listeners
document.querySelectorAll('#transactionOverviewTable .sortable').forEach(th => {
    th.addEventListener('click', () => {
        sortTransactionTable('transactionOverviewTable', th.dataset.sort);
    });
});

// Export Transaction Details to CSV
function exportTransactionDetails() {
    const details = [
        ['Transaction ID', document.getElementById('transId').textContent],
        ['Investor', document.getElementById('transInvestor').textContent],
        ['Type', document.getElementById('transType').textContent],
        ['Amount', document.getElementById('transAmount').textContent],
        ['Date', document.getElementById('transDate').textContent],
        ['Status', document.getElementById('transStatus').textContent]
    ];
    const csv = details.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transaction_${document.getElementById('transId').textContent}.csv`;
    link.click();
}

// Export Buttons
document.getElementById('exportTransactionOverviewBtn').addEventListener('click', () => {
    exportTableToCSV('transactionOverviewTable', 'transaction_overview.csv');
});
document.getElementById('exportTransactionVerificationBtn').addEventListener('click', () => {
    exportTableToCSV('transactionVerificationTable', 'transaction_verification.csv');
});
document.getElementById('exportTransactionDetailsBtn').addEventListener('click', () => {
    exportTransactionDetails();
});
document.getElementById('exportTransactionDataBtn').addEventListener('click', () => {
    exportTableToCSV('transactionOverviewTable', 'all_transactions.csv');
});
document.getElementById('refreshTransactionsBtn').addEventListener('click', () => {
    alert('Transactions refreshed.');
    // Simulate refresh by resetting filters and search
    transactionOverviewSearch.value = '';
    transactionVerificationSearch.value = '';
    transactionStatusFilter.value = '';
    transactionIdFilter.value = '';
    transactionMethodFilter.value = '';
    filterTransactionVerificationTable();
    transactionOverviewSearch.dispatchEvent(new Event('input'));
});
// Settings Section Initialization
function initializeSettings() {
    // Load saved preferences (simulated with localStorage)
    const savedPreferences = {
        notifyInvestorActivity: localStorage.getItem('notifyInvestorActivity') === 'true',
        notifyTransactionVerification: localStorage.getItem('notifyTransactionVerification') === 'true',
        notifyMarketUpdates: localStorage.getItem('notifyMarketUpdates') === 'true',
        notifySystemAlerts: localStorage.getItem('notifySystemAlerts') === 'true',
        twoFactorAuth: localStorage.getItem('twoFactorAuth') || 'disabled',
        sessionTimeout: localStorage.getItem('sessionTimeout') === 'true',
        defaultSection: localStorage.getItem('defaultSection') || 'dashboard',
        theme: localStorage.getItem('theme') || 'dark',
        currency: localStorage.getItem('currency') || 'MWK',
        autoKYCFlagging: localStorage.getItem('autoKYCFlagging') === 'true',
        pepScreening: localStorage.getItem('pepScreening') === 'true',
        transactionMonitoring: localStorage.getItem('transactionMonitoring') === 'true',
        kycReminder: localStorage.getItem('kycReminder') || '30'
    };

    // Set form values
    document.getElementById('notifyInvestorActivity').checked = savedPreferences.notifyInvestorActivity;
    document.getElementById('notifyTransactionVerification').checked = savedPreferences.notifyTransactionVerification;
    document.getElementById('notifyMarketUpdates').checked = savedPreferences.notifyMarketUpdates;
    document.getElementById('notifySystemAlerts').checked = savedPreferences.notifySystemAlerts;
    document.getElementById('twoFactorAuth').value = savedPreferences.twoFactorAuth;
    document.getElementById('sessionTimeout').checked = savedPreferences.sessionTimeout;
    document.getElementById('defaultSection').value = savedPreferences.defaultSection;
    document.getElementById('theme').value = savedPreferences.theme;
    document.getElementById('currency').value = savedPreferences.currency;
    document.getElementById('autoKYCFlagging').checked = savedPreferences.autoKYCFlagging;
    document.getElementById('pepScreening').checked = savedPreferences.pepScreening;
    document.getElementById('transactionMonitoring').checked = savedPreferences.transactionMonitoring;
    document.getElementById('kycReminder').value = savedPreferences.kycReminder;

    // Apply theme
    if (savedPreferences.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Save Notification Settings
document.getElementById('saveNotificationSettings').addEventListener('click', () => {
    localStorage.setItem('notifyInvestorActivity', document.getElementById('notifyInvestorActivity').checked);
    localStorage.setItem('notifyTransactionVerification', document.getElementById('notifyTransactionVerification').checked);
    localStorage.setItem('notifyMarketUpdates', document.getElementById('notifyMarketUpdates').checked);
    localStorage.setItem('notifySystemAlerts', document.getElementById('notifySystemAlerts').checked);
    alert('Notification settings saved.');
});

// Save Security Settings
document.getElementById('saveSecuritySettings').addEventListener('click', () => {
    const twoFactorAuth = document.getElementById('twoFactorAuth').value;
    localStorage.setItem('twoFactorAuth', twoFactorAuth);
    localStorage.setItem('sessionTimeout', document.getElementById('sessionTimeout').checked);
    alert('Security settings saved.');
    if (twoFactorAuth !== 'disabled') {
        alert(`2FA enabled via ${twoFactorAuth}. Please configure your ${twoFactorAuth} settings.`);
    }
});

// Save Platform Preferences
document.getElementById('savePlatformPreferences').addEventListener('click', () => {
    const defaultSection = document.getElementById('defaultSection').value;
    const theme = document.getElementById('theme').value;
    const currency = document.getElementById('currency').value;
    localStorage.setItem('defaultSection', defaultSection);
    localStorage.setItem('theme', theme);
    localStorage.setItem('currency', currency);
    alert('Platform preferences saved.');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    // Update currency display (placeholder for future implementation)
    document.querySelectorAll('.share-price').forEach(el => {
        if (currency === 'USD') {
            el.textContent = `$ ${(parseFloat(el.textContent.replace('MK ', '')) / 1700).toFixed(2)}`;
        } else {
            // Revert to MWK (simplified, assumes data is stored in MWK)
            location.reload();
        }
    });
});

// Save Compliance Settings
document.getElementById('saveComplianceSettings').addEventListener('click', () => {
    localStorage.setItem('autoKYCFlagging', document.getElementById('autoKYCFlagging').checked);
    localStorage.setItem('pepScreening', document.getElementById('pepScreening').checked);
    localStorage.setItem('transactionMonitoring', document.getElementById('transactionMonitoring').checked);
    localStorage.setItem('kycReminder', document.getElementById('kycReminder').value);
    alert('Compliance settings saved.');
});

// Edit Profile
document.getElementById('saveProfileBtn').addEventListener('click', () => {
    const name = document.getElementById('editBrokerName').value;
    const email = document.getElementById('editBrokerEmail').value;
    const phone = document.getElementById('editBrokerPhone').value;
    const profilePic = document.getElementById('editProfilePic').files[0];

    if (!name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Update profile fields
    document.getElementById('brokerName').value = name;
    document.getElementById('brokerEmail').value = email;
    document.getElementById('brokerPhone').value = phone;

    // Update profile picture
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const userInitials = document.getElementById('user-initials');
            userInitials.style.backgroundImage = `url(${e.target.result})`;
            userInitials.textContent = '';
            userInitials.classList.add('profile-pic-img');
        };
        reader.readAsDataURL(profilePic);
    }

    alert('Profile updated successfully.');
    bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
});

// Change Password
document.getElementById('savePasswordBtn').addEventListener('click', () => {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New password and confirmation do not match.');
        return;
    }

    // Simulate password change (in a real app, this would involve server-side validation)
    alert('Password changed successfully.');
    document.getElementById('changePasswordForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
});

// Update showSection to initialize settings
const originalShowSection = showSection;
showSection = function (sectionId) {
    originalShowSection(sectionId);
    if (sectionId === 'settings') {
        initializeSettings();
    }
};

// Apply saved default section on load
window.addEventListener('load', () => {
    const defaultSection = localStorage.getItem('defaultSection') || 'dashboard';
    const sectionId = window.location.hash.substring(1) || localStorage.getItem('lastSectionIndex2') || defaultSection;
    showSection(sectionId);
});
function initializeDashboard() {
    // Market Charts
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
    new Chart(document.getElementById("dashboardMasiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [10500, 10550, 10600, 10620, 10700, 10750, 10800], borderColor: "#28a745", fill: false }] },
        options
    });
    new Chart(document.getElementById("dashboardDsiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [8200, 8250, 8300, 8280, 8350, 8400, 8450], borderColor: "#28a745", fill: false }] },
        options
    });
    new Chart(document.getElementById("dashboardFsiChart"), {
        type: "line",
        data: { labels, datasets: [{ data: [4500, 4550, 4530, 4600, 4650, 4630, 4700], borderColor: "#28a745", fill: false }] },
        options
    });

    // Key Statistics
    const totalPortfolioValue = Object.values(investorData).reduce((sum, investor) => {
        if (investor.portfolio?.value) {
            return sum + parseFloat(investor.portfolio.value.replace('MK ', '').replace(',', ''));
        }
        return sum;
    }, 0);
    document.getElementById('totalPortfolioValue').textContent = `MK ${totalPortfolioValue.toLocaleString()}`;

    const activeInvestors = Object.values(investorData).filter(investor => investor.status === 'active').length;
    document.getElementById('activeInvestors').textContent = activeInvestors;

    const pendingVerifications = Object.values(investorData).filter(investor => investor.status === 'pending').length;
    document.getElementById('pendingVerifications').textContent = pendingVerifications;

    // Populate Investor Table
    const investorTableBody = document.getElementById('dashboardInvestorTableBody');
    Object.values(investorData).slice(0, 5).forEach(investor => {
        const badgeClass = {
            active: 'bg-success',
            pending: 'bg-warning',
            new: 'bg-secondary'
        };
        investorTableBody.innerHTML += `
            <tr data-investor-id="${investor.investorId}" data-status="${investor.status}">
                <td>${investor.name}</td>
                <td>${investor.investorId}</td>
                <td><span class="badge ${badgeClass[investor.status]}">${investor.status}</span></td>
                <td>${investor.lastActive}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-1 view-investor-btn" data-bs-toggle="modal" data-bs-target="#investorDetailsModal"><i class="bi bi-eye"></i> View</button>
                    <button class="btn btn-primary btn-sm"><i class="bi bi-chat"></i> Message</button>
                </td>
            </tr>
        `;
    });

    // Populate Order Table
    const orderTableBody = document.getElementById('dashboardOrderTableBody');
    Object.values(orderData).slice(0, 5).forEach(order => {
        const badgeClass = {
            new: 'bg-info',
            pending: 'bg-warning',
            executed: 'bg-success',
            cancelled: 'bg-danger',
            expired: 'bg-secondary'
        };
        orderTableBody.innerHTML += `
            <tr data-order-id="${order.id}" data-investor="${order.investor}" data-order="${order.stock}" data-status="${order.status.toLowerCase()}">
                <td>${order.id}</td>
                <td>${order.investor}</td>
                <td>${order.type} ${order.stock}</td>
                <td><span class="badge ${badgeClass[order.status.toLowerCase()]}">${order.status}</span></td>
                <td>
                    <button class="btn btn-primary btn-sm view-order-btn" data-bs-toggle="modal" data-bs-target="#orderDetailsModal"><i class="bi bi-eye"></i> View</button>
                </td>
            </tr>
        `;
    });

    // Populate Transaction Table
    const transactionTableBody = document.getElementById('dashboardTransactionTableBody');
    Object.values(transactionData).slice(0, 5).forEach(trans => {
        const badgeClass = {
            new: 'bg-info',
            verified: 'bg-success'
        };
        transactionTableBody.innerHTML += `
            <tr data-trans-id="${trans.id}" data-investor="${trans.investor}" data-amount="${parseFloat(trans.amount.replace('MK ', '').replace(',', ''))}" data-status="${trans.status.toLowerCase()}">
                <td>${trans.investor}</td>
                <td>${trans.id}</td>
                <td>${trans.amount}</td>
                <td><span class="badge ${badgeClass[trans.status.toLowerCase()]}">${trans.status}</td>
                <td>
                    <button class="btn btn-primary btn-sm view-trans-btn" data-trans-id="${trans.id}"><i class="bi bi-eye"></i> View</button>
                    ${trans.status.toLowerCase() === 'new' ? `<button class="btn btn-success btn-sm verify-trans-btn" data-trans-id="${trans.id}"><i class="bi bi-check"></i> Verify</button>` : ''}
                </td>
            </tr>
        `;
    });

    // Investor Search
    const investorSearch = document.getElementById('dashboardInvestorSearch');
    investorSearch.addEventListener('input', () => {
        const query = investorSearch.value.toLowerCase();
        const rows = document.querySelectorAll('#dashboardInvestorTableBody tr');
        rows.forEach(row => {
            const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const id = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            row.style.display = name.includes(query) || id.includes(query) ? '' : 'none';
        });
    });

    // Order Search
    const orderSearch = document.getElementById('dashboardOrderSearch');
    orderSearch.addEventListener('input', () => {
        const query = orderSearch.value.toLowerCase();
        const rows = document.querySelectorAll('#dashboardOrderTableBody tr');
        rows.forEach(row => {
            const orderId = row.dataset.orderId.toLowerCase();
            const investor = row.dataset.investor.toLowerCase();
            const order = row.dataset.order.toLowerCase();
            row.style.display = orderId.includes(query) || investor.includes(query) || order.includes(query) ? '' : 'none';
        });
    });

    // Transaction Search
    const transactionSearch = document.getElementById('dashboardTransactionSearch');
    transactionSearch.addEventListener('input', () => {
        const query = transactionSearch.value.toLowerCase();
        const rows = document.querySelectorAll('#dashboardTransactionTableBody tr');
        rows.forEach(row => {
            const investor = row.dataset.investor.toLowerCase();
            const transId = row.dataset.transId.toLowerCase();
            row.style.display = investor.includes(query) || transId.includes(query) ? '' : 'none';
        });
    });

    // Sorting for Investor Table
    document.querySelectorAll('#dashboardInvestorTable .sortable').forEach(th => {
        th.addEventListener('click', () => {
            sortTable('dashboardInvestorTable', th.dataset.sort, th.dataset.sort);
        });
    });

    // Sorting for Order Table
    document.querySelectorAll('#dashboardOrderTable .sortable').forEach(th => {
        th.addEventListener('click', () => {
            sortTable('dashboardOrderTable', th.dataset.sort, th.dataset.sort);
        });
    });

    // Sorting for Transaction Table
    document.querySelectorAll('#dashboardTransactionTable .sortable').forEach(th => {
        th.addEventListener('click', () => {
            sortTable('dashboardTransactionTable', th.dataset.sort, th.dataset.sort);
        });
    });

    // Export Buttons
    document.getElementById('exportDashboardOrdersBtn').addEventListener('click', () => {
        exportTableToCSV('dashboardOrderTable', 'dashboard_orders.csv');
    });
    document.getElementById('exportDashboardTransactionsBtn').addEventListener('click', () => {
        exportTableToCSV('dashboardTransactionTable', 'dashboard_transactions.csv');
    });

    // Refresh Transactions
    document.getElementById('refreshDashboardTransactionsBtn').addEventListener('click', () => {
        alert('Dashboard transactions refreshed.');
        transactionSearch.value = '';
        transactionSearch.dispatchEvent(new Event('input'));
    });

    // View Investor Buttons
    document.querySelectorAll('#dashboardInvestorTable .view-investor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const investorId = row.dataset.investorId;
            populateInvestorDetails(investorId);
        });
    });

    // View Broker Buttons
    document.querySelectorAll('#dashboardBrokerTable .view-broker-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const brokerId = row.dataset.brokerId;
            populateBrokerDetails(brokerId);
        });
    });

    // Message Investor Buttons
    document.querySelectorAll('#dashboardInvestorTable .btn-primary:not(.view-investor-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const investorName = row.querySelector('td:nth-child(1)').textContent;
            document.getElementById('messageInvestorName').value = investorName;
            messageModal.show();
        });
    });

    // Message Broker Buttons
    document.querySelectorAll('#dashboardBrokerTable .btn-primary:not(.view-broker-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const brokerName = row.querySelector('td:nth-child(1)').textContent;
            document.getElementById('messageBrokerName').value = brokerName;
            messageModal.show();
        });
    });
}

// Override showSection function
const showSectionOriginal = showSection;
showSection = function (sectionId) {
    if (typeof showSectionOriginal === 'function') {
        showSectionOriginal(sectionId);
    }
    if (sectionId === 'dashboard') {
        initializeDashboard();
    }
};
document.getElementById('profile-pic-container').addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('userAccountModal')).show();
});

// Help articles (placeholder)
const helpArticles = [
    { id: "H001", title: "How to Verify KYC", category: "Account Setup", audience: "Investor", content: "Steps to verify KYC...", updated: "2025-04-10" },
    { id: "H002", title: "Managing Investor Orders", category: "Trading", audience: "Broker", content: "Guide to orders...", updated: "2025-04-09" }
];

// Learn content (placeholder)
const learnContent = [
    { id: "L001", title: "Introduction to Investing", category: "Beginner", content: "Basics of investing...", updated: "2025-04-08" },
    { id: "L002", title: "Understanding Stocks", category: "Intermediate", content: "Stock market guide...", updated: "2025-04-07" }
];

// Help Article CRUD
document.getElementById("addHelpArticleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newArticle = {
        id: `H${(helpArticles.length + 1).toString().padStart(3, "0")}`,
        title: document.getElementById("helpTitle").value,
        category: document.getElementById("helpCategory").value,
        audience: document.getElementById("helpAudience").value,
        content: document.getElementById("helpContent").value,
        updated: new Date().toISOString().slice(0, 10)
    };
    helpArticles.push(newArticle);
    const helpTableBody = document.getElementById("helpTableBody");
    helpTableBody.innerHTML += `
                <tr data-article-id="${newArticle.id}">
                    <td>${newArticle.title}</td>
                    <td>${newArticle.category}</td>
                    <td>${newArticle.audience}</td>
                    <td>${newArticle.updated}</td>
                    <td>
                        <button class="btn btn-primary btn-sm me-1 edit-help-btn" data-bs-toggle="modal" data-bs-target="#editHelpArticleModal"><i class="bi bi-pencil"></i> Edit</button>
                        <button class="btn btn-danger btn-sm delete-help-btn"><i class="bi bi-trash"></i> Delete</button>
                    </td>
                </tr>
            `;
    bootstrap.Modal.getInstance(document.getElementById("addHelpArticleModal")).hide();
    document.getElementById("addHelpArticleForm").reset();
});

document.getElementById("helpTableBody").addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const articleId = row.dataset.articleId;
    if (e.target.closest(".edit-help-btn")) {
        const article = helpArticles.find(a => a.id === articleId);
        document.getElementById("editHelpArticleId").value = article.id;
        document.getElementById("editHelpTitle").value = article.title;
        document.getElementById("editHelpCategory").value = article.category;
        document.getElementById("editHelpAudience").value = article.audience;
        document.getElementById("editHelpContent").value = article.content;
    } else if (e.target.closest(".delete-help-btn")) {
        if (confirm("Are you sure you want to delete this article?")) {
            helpArticles.splice(helpArticles.findIndex(a => a.id === articleId), 1);
            row.remove();
        }
    }
});

document.getElementById("editHelpArticleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const articleId = document.getElementById("editHelpArticleId").value;
    const article = helpArticles.find(a => a.id === articleId);
    article.title = document.getElementById("editHelpTitle").value;
    article.category = document.getElementById("editHelpCategory").value;
    article.audience = document.getElementById("editHelpAudience").value;
    article.content = document.getElementById("editHelpContent").value;
    article.updated = new Date().toISOString().slice(0, 10);
    const row = document.querySelector(`tr[data-article-id="${articleId}"]`);
    row.innerHTML = `
                <td>${article.title}</td>
                <td>${article.category}</td>
                <td>${article.audience}</td>
                <td>${article.updated}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-1 edit-help-btn" data-bs-toggle="modal" data-bs-target="#editHelpArticleModal"><i class="bi bi-pencil"></i> Edit</button>
                    <button class="btn btn-danger btn-sm delete-help-btn"><i class="bi bi-trash"></i> Delete</button>
                </td>
            `;
    bootstrap.Modal.getInstance(document.getElementById("editHelpArticleModal")).hide();
});

// Learn Content CRUD
document.getElementById("addLearnArticleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newContent = {
        id: `L${(learnContent.length + 1).toString().padStart(3, "0")}`,
        title: document.getElementById("learnTitle").value,
        category: document.getElementById("learnCategory").value,
        content: document.getElementById("learnContent").value,
        updated: new Date().toISOString().slice(0, 10)
    };
    learnContent.push(newContent);
    const learnTableBody = document.getElementById("learnTableBody");
    learnTableBody.innerHTML += `
                <tr data-content-id="${newContent.id}">
                    <td>${newContent.title}</td>
                    <td>${newContent.category}</td>
                    <td>${newContent.updated}</td>
                    <td>
                        <button class="btn btn-primary btn-sm me-1 edit-learn-btn" data-bs-toggle="modal" data-bs-target="#editLearnArticleModal"><i class="bi bi-pencil"></i> Edit</button>
                        <button class="btn btn-danger btn-sm delete-learn-btn"><i class="bi bi-trash"></i> Delete</button>
                    </td>
                </tr>
            `;
    bootstrap.Modal.getInstance(document.getElementById("addLearnArticleModal")).hide();
    document.getElementById("addLearnArticleForm").reset();
});

document.getElementById("learnTableBody").addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const contentId = row.dataset.contentId;
    if (e.target.closest(".edit-learn-btn")) {
        const content = learnContent.find(c => c.id === contentId);
        document.getElementById("editLearnArticleId").value = content.id;
        document.getElementById("editLearnTitle").value = content.title;
        document.getElementById("editLearnCategory").value = content.category;
        document.getElementById("editLearnContent").value = content.content;
    } else if (e.target.closest(".delete-learn-btn")) {
        if (confirm("Are you sure you want to delete this content?")) {
            learnContent.splice(learnContent.findIndex(c => c.id === contentId), 1);
            row.remove();
        }
    }
});

document.getElementById("editLearnArticleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const contentId = document.getElementById("editLearnArticleId").value;
    const content = learnContent.find(c => c.id === contentId);
    content.title = document.getElementById("editLearnTitle").value;
    content.category = document.getElementById("editLearnCategory").value;
    content.content = document.getElementById("editLearnContent").value;
    content.updated = new Date().toISOString().slice(0, 10);
    const row = document.querySelector(`tr[data-content-id="${contentId}"]`);
    row.innerHTML = `
                <td>${content.title}</td>
                <td>${content.category}</td>
                <td>${content.updated}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-1 edit-learn-btn" data-bs-toggle="modal" data-bs-target="#editLearnArticleModal"><i class="bi bi-pencil"></i> Edit</button>
                    <button class="btn btn-danger btn-sm delete-learn-btn"><i class="bi bi-trash"></i> Delete</button>
                </td>
            `;
    bootstrap.Modal.getInstance(document.getElementById("editLearnArticleModal")).hide();
});

(function () { function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'9387634599d0b05d',t:'MTc0NjAxOTc2NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } } if (document.body) { var a = document.createElement('iframe'); a.height = 1; a.width = 1; a.style.position = 'absolute'; a.style.top = 0; a.style.left = 0; a.style.border = 'none'; a.style.visibility = 'hidden'; document.body.appendChild(a); if ('loading' !== document.readyState) c(); else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c); else { var e = document.onreadystatechange || function () { }; document.onreadystatechange = function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) } } } })();
