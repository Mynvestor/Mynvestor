import { userData } from "./userData.js";

// Function to parse daily change percentage from string (e.g., "+0.01 (+0.01%)" -> 0.01)
const parseDailyChangePercent = (dailyChange) => {
    const match = dailyChange.match(/([-+]\d+\.\d+%)/);
    return match ? parseFloat(match[1]) : 0;
};

// Function to calculate total portfolio value
const calculatePortfolioValue = () => {
    return userData.positions.reduce((total, position) => total + position.shares * position.currentPrice, 0);
};

// Function to calculate daily portfolio change
const calculateDailyChange = () => {
    const totalChange = userData.positions.reduce((total, position) => {
        const changePercent = parseDailyChangePercent(position.dailyChange);
        const positionValue = position.shares * position.currentPrice;
        return total + (positionValue * (changePercent / 100));
    }, 0);
    const portfolioValue = calculatePortfolioValue();
    const changePercent = portfolioValue > 0 ? (totalChange / portfolioValue) * 100 : 0;
    return { value: totalChange.toFixed(2), percent: changePercent.toFixed(2) };
};

// Function to generate position card HTML
const generatePositionCard = (position) => {
    const positionValue = (position.shares * position.currentPrice).toFixed(2);
    const gainLoss = ((position.currentPrice - position.purchasePrice) * position.shares).toFixed(2);
    const gainLossPercent = ((position.currentPrice - position.purchasePrice) / position.purchasePrice * 100).toFixed(2);
    return `
        <div class="col-md-4">
            <div class="company-card" data-ticker="${position.ticker}">
                <div class="company-info">
                    <img src="${position.logo}" alt="${position.companyName} Logo" class="company-logo me-3">
                    <div>
                        <h5 class="card-title">${position.companyName}</h5>
                        <p class="card-text">${position.ticker} - ${position.shares} shares</p>
                    </div>
                </div>
                <div class="price-info">
                    <div class="share-price">MK ${positionValue}</div>
                    <div class="daily-change ${parseDailyChangePercent(position.dailyChange) >= 0 ? 'price-change-up' : 'price-change-down'}">
                        <i class="bi bi-arrow-${parseDailyChangePercent(position.dailyChange) >= 0 ? 'up' : 'down'} me-1"></i>${position.dailyChange}
                    </div>
                    <div class="gain-loss ${gainLoss >= 0 ? 'price-change-up' : 'price-change-down'}">
                        ${gainLoss >= 0 ? '+' : ''}MK ${gainLoss} (${gainLossPercent}%)
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Generate portfolio summary
const portfolioValue = calculatePortfolioValue();
const dailyChange = calculateDailyChange();
const portfolioSummary = `
    <div class="portfolio-summary">
        <h2><i class="bi bi-pie-chart me-2"></i>Portfolio Overview</h2>
        <div class="row">
            <div class="col-md-4">
                <small class="text-muted d-block"><i class="bi bi-wallet me-1"></i>Total Value</small>
                <span class="fw-bold">MK ${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div class="col-md-4">
                <small class="text-muted d-block"><i class="bi bi-cash-stack me-1"></i>Cash Balance</small>
                <span class="fw-bold text-success">MK ${userData.cashBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div class="col-md-4">
                <small class="text-muted d-block"><i class="bi bi-graph-up me-1"></i>Daily Change</small>
                <span class="fw-bold ${dailyChange.value >= 0 ? 'price-change-up' : 'price-change-down'}">
                    ${dailyChange.value >= 0 ? '+' : ''}MK ${dailyChange.value} (${dailyChange.percent}%)
                </span>
            </div>
        </div>
    </div>
`;

// Generate position cards
const positionCards = userData.positions.map(position => generatePositionCard(position)).join('');

// Render to DOM
document.querySelector("#portfolio-summary").innerHTML = portfolioSummary;
document.querySelector("#positions-container").innerHTML = positionCards;
document.querySelector("#portfolio-loading").style.display = 'none';

// Chart.js setup for Portfolio Performance
const performanceChart = new Chart(document.getElementById('performanceChart'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Portfolio Value',
            data: [450000, 460000, 470000, 480000, 490000, 500000],
            borderColor: '#28a745',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: false, title: { display: true, text: 'Value (MK)' } },
            x: { title: { display: true, text: 'Month' } }
        }
    }
});

// Chart.js setup for Asset Allocation
const allocationChart = new Chart(document.getElementById('allocationChart'), {
    type: 'pie',
    data: {
        labels: userData.positions.map(p => p.ticker).concat(['Cash']),
        datasets: [{
            data: userData.positions.map(p => p.shares * p.currentPrice).concat([userData.cashBalance]),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#28a745']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'top' } }
    }
});