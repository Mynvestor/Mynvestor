import user from './userData.js';
import { companyData } from './marketData.js';

document.addEventListener('DOMContentLoaded', () => {
    updatePortfolioSection();
});

function updatePortfolioSection() {
    const profilePicContainer = document.getElementById("profile-pic-container");
    const modalProfilePicContainer = document.getElementById("modal-profile-pic-container");
    const userAccountModal = new bootstrap.Modal(document.getElementById("userAccountModal"));

    // Calculate portfolio value dynamically
    const portfolioValue = user.portfolio.reduce((total, position) => 
        total + (position.shares * position.price), 0) + user.cashBalance;

    // Profile picture handling
    if (user.profilePic) {
        profilePicContainer.innerHTML = `<img src="${user.profilePic}" alt="User Profile">`;
        if (modalProfilePicContainer) modalProfilePicContainer.innerHTML = `<img src="${user.profilePic}" alt="User Profile">`;
    } else {
        document.getElementById("user-initials").textContent = user.name.split(" ").map(e => e[0]).join("").toUpperCase();
        if (document.getElementById("modal-user-initials")) {
            document.getElementById("modal-user-initials").textContent = user.name.split(" ").map(e => e[0]).join("").toUpperCase();
        }
    }

    // Modal population
    profilePicContainer.addEventListener("click", () => {
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("cash-balance").textContent = `MK${user.cashBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById("portfolio-value").textContent = `MK${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        userAccountModal.show();

        // Logout button event listener
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                // Clear user session data (example: clear localStorage or sessionStorage)
                localStorage.removeItem("userSession");
                sessionStorage.removeItem("userSession");
                
                // Hide the modal
                userAccountModal.hide();
                
                // Redirect to login page
                window.location.href = "../Authentication/investor/login.html";
            });
        }
    });

    // Portfolio overview
    const portfolioSummary = document.querySelector('.portfolio-summary .here');
    portfolioSummary.innerHTML = `
        <div class="col-md-4"><small class="d-block"><i class="bi bi-wallet me-1"></i>Total Value</small><span class="fw-bold">MK${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        <div class="col-md-4"><small class="d-block"><i class="bi bi-cash-stack me-1"></i>Cash Balance</small><span class="fw-bold text-success">MK${user.cashBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        <div class="col-md-4"><small class="d-block"><i class="bi bi-graph-up me-1"></i>Daily Change</small><span class="fw-bold price-change-up">+MK576.87 (+2.51%)</span></div>
    `;

    // Clear existing portfolio cards
    const positionsContainer = document.querySelector('#portfolio');
    const existingCards = positionsContainer.querySelectorAll('.portfolio-card');
    existingCards.forEach(card => card.remove());

    // Portfolio cards
    user.portfolio.forEach(position => {
        const companyInfo = companyData.find(c => c.companyName === position.company);
        const portfolioCard = document.createElement('div');
        portfolioCard.className = 'portfolio-card';
        portfolioCard.innerHTML = `
            <div class="portfolio-info">
                <img src="${position.logo}" alt="${position.company} Logo" class="company-logo me-3">
                <div class="portfolio-details">
                    <h5 class="card-title">${position.company}</h5>
                    <p class="card-text"><i class="bi bi-stack me-1"></i>${position.shares} Shares | <i class="bi bi-currency-exchange me-1"></i>MK${position.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div class="price-info">
                <div class="share-price"><i class="bi bi-wallet me-1"></i>MK${(position.shares * position.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div class="daily-change ${position.dailyChange >= 0 ? 'price-change-up' : 'price-change-down'}">
                    <i class="bi bi-arrow-${position.dailyChange >= 0 ? 'up' : 'down'} me-1"></i>
                    ${position.dailyChange >= 0 ? '+' : ''}${position.dailyChange.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${position.dailyChangePercent.toFixed(2)}%)
                </div>
            </div>
            <div class="portfolio-actions">
                <button class="btn btn-buy text-white"><i class="bi bi-plus-circle me-1"></i>Buy</button>
                <button class="btn btn-sell text-white"><i class="bi bi-dash-circle me-1"></i>Sell</button>
            </div>
        `;
        positionsContainer.appendChild(portfolioCard);
    });

    // Buy/Sell button event listeners
    document.querySelectorAll('.portfolio-card .btn-buy, .portfolio-card .btn-sell').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const company = e.target.closest('.portfolio-card').querySelector('.card-title').textContent.trim();
            const companyInfo = companyData.find(c => c.companyName === company);
            const action = e.target.classList.contains('btn-buy') ? 'Buy' : 'Sell';

            // Navigate to trade section
            showSection('trade');

            // Preselect the company and action in the trade section
            setTimeout(() => {
                document.getElementById('selectedCompany').textContent = companyInfo.ticker;
                document.getElementById('btnBuy').classList.toggle('active', action === 'Buy');
                document.getElementById('btnSell').classList.toggle('active', action === 'Sell');
                updateTradeDetails(companyInfo.ticker, 0);
            }, 300);
        });
    });

    // Initialize portfolio charts
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
    const performanceChart = document.getElementById("performanceChart");
    if (performanceChart) {
        new Chart(performanceChart, {
            type: "line",
            data: { 
                labels, 
                datasets: [{ 
                    data: [25500, 25650, 25400, 25700, 25850, 25500, portfolioValue], 
                    borderColor: "#27a844", 
                    fill: false 
                }] 
            },
            options: lineOptions
        });
    }
    const allocationChart = document.getElementById("allocationChart");
    if (allocationChart) {
        new Chart(allocationChart, {
            type: "doughnut",
            data: {
                labels: user.portfolio.map(p => p.company).concat(["Cash"]),
                datasets: [{ 
                    data: user.portfolio.map(p => p.shares * p.price).concat([user.cashBalance]),
                    backgroundColor: ["#27a844", "#0284c7", "#f59e0b", "#ef4444", "#8b5cf6", "#9ca3af"] 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: "right", 
                        labels: { color: "#333", font: { size: 12 } } 
                    } 
                }
            }
        });
    }
}


export { updatePortfolioSection };

