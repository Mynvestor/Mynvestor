import { indexItem, companyData } from "./marketData.js";

// Function to parse daily change percentage from string (e.g., "+0.01 (+0.01%)" -> 0.01)
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

// Generate Index Cards
let indexCard = '';
indexItem.forEach((item) => {
    indexCard += `
        <div class="col-md-4 col-xl-4 mb-1">
            <div class="portfolio-summary">
                <h2><i class="bi bi-pie-chart me-2"></i>${item.indexName}</h2>
                <div class="row">
                    <div class="col-md-4">
                        <small class="text-muted d-block"><i class="bi bi-wallet me-1"></i>Value</small>
                        <span class="fw-bold">${item.indexValue}</span>
                    </div>
                    <div class="col-md-4">
                        <small class="text-muted d-block"><i class="bi bi-cash-stack me-1"></i>Volume</small>
                        <span class="fw-bold text-success">${item.indexVolume}</span>
                    </div>
                    <div class="col-md-4">
                        <small class="text-muted d-block"><i class="bi bi-graph-up me-1"></i>Unique Trades</small>
                        <span class="fw-bold price-change-up">${item.uniqueTrades}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
});

// Generate Top Gainers (sort by daily change percentage, top 3)
const topGainers = companyData
    .sort((a, b) => parseDailyChangePercent(b.dailyChange) - parseDailyChangePercent(a.dailyChange))
    .slice(0, 3)
    .map(card => generateCompanyCard(card))
    .join('');

// Generate Top Losers (sort by daily change percentage, bottom 3)
const topLosers = companyData
    .sort((a, b) => parseDailyChangePercent(a.dailyChange) - parseDailyChangePercent(b.dailyChange))
    .filter(card => parseDailyChangePercent(card.dailyChange) < 0)
    .slice(0, 3)
    .map(card => generateCompanyCard(card))
    .join('');

// Generate Volume Gainers (sort by volume, top 3)
const volumeGainers = companyData
    .sort((a, b) => parseInt(b.volume.replace(/,/g, '')) - parseInt(a.volume.replace(/,/g, '')))
    .slice(0, 3)
    .map(card => generateCompanyCard(card, true))
    .join('');

// Generate Main Board Company Cards
const companyCardHTML = companyData
    .map(card => `
        <div class="col-md-4">
            <div class="company-card" data-company="${card.ticker}">
                <div class="company-info">
                    <img src="${card.logo}" alt="${card.companyName} Logo" class="company-logo me-3">
                    <div>
                        <h5 class="card-title">${card.companyName}</h5>
                        <p class="card-text">${card.ticker}</p>
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
    `)
    .join('');

// Render cards to the DOM
document.querySelector("#indexCards").innerHTML = indexCard;
document.querySelector("#companyCards").innerHTML = companyCardHTML;
document.querySelector("#market-loading").style.display = 'none'; // Hide loading
document.querySelector(".row.mb-2 .col-md-4:nth-child(1) .row.mb-2").innerHTML = topGainers;
document.querySelector(".row.mb-2 .col-md-4:nth-child(2) .row.mb-2").innerHTML = topLosers;
document.querySelector(".row.mb-2 .col-md-4:nth-child(3) .row.mb-2").innerHTML = volumeGainers;

// Modal handling
const companyDetailsModal = new bootstrap.Modal(document.getElementById('companyDetailsModal'));
const stockQuoteModal = new bootstrap.Modal(document.getElementById('stockQuoteModal'));

// Function to populate stock quote modal
const populateStockQuoteModal = (company) => {
    document.getElementById('modalCompanyName').textContent = company.companyName;
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

// Function to populate company details modal
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

    // Fields not in marketData.js (placeholders or omitted)
    document.getElementById('companyDetailsLastUpdate').textContent = `Last Updated: ${new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'GMT' })} GMT`;
    document.getElementById('companyDetailsOverview').textContent = 'No overview available.';
    document.getElementById('companyDetailsDayRange').textContent = `${company.low} - ${company.high}`;
    document.getElementById('companyDetails52WRange').textContent = `MK ${(parseFloat(company.currentPrice) * 0.9).toFixed(2)} - MK ${(parseFloat(company.currentPrice) * 1.1).toFixed(2)}`;
    document.getElementById('companyDetailsPE').textContent = 'N/A';
    document.getElementById('companyDetailsDivYield').textContent = 'N/A';
    document.getElementById('companyDetailsRSI').innerHTML = 'N/A';
    document.getElementById('companyDetailsMACD').innerHTML = 'N/A';
    document.getElementById('companyDetails50DMA').textContent = `MK ${(parseFloat(company.currentPrice) * 0.95).toFixed(2)}`;
    document.getElementById('companyDetails200DMA').textContent = `MK ${(parseFloat(company.currentPrice) * 0.9).toFixed(2)}`;
    document.getElementById('companyDetailsTechSummary').textContent = 'N/A';
    document.getElementById('companyDetailsEPS').textContent = `MK ${(parseFloat(company.currentPrice) * 0.035).toFixed(2)}`;
    document.getElementById('companyDetailsROE').textContent = 'N/A';
    document.getElementById('companyDetailsDebtEquity').textContent = 'N/A';
    document.getElementById('companyDetailsPB').textContent = 'N/A';
    document.getElementById('companyDetailsFundSummary').textContent = 'N/A';
    document.getElementById('companyDetailsNews').innerHTML = `<li class="mb-2"><small>${new Date().toISOString().split('T')[0]}</small><br><a href="#" class="text-white">${company.companyName} announces new partnership</a></li>`;
    document.getElementById('companyDetailsPEG').textContent = 'N/A';
    document.getElementById('companyDetailsCurrentRatio').textContent = 'N/A';
    document.getElementById('companyDetailsROIC').textContent = 'N/A';
    document.getElementById('companyDetailsEBITDA').textContent = 'N/A';
    document.getElementById('companyDetailsInst').style.width = '45%';
    document.getElementById('companyDetailsInst').textContent = 'Institutions 45%';
    document.getElementById('companyDetailsInsiders').style.width = '30%';
    document.getElementById('companyDetailsInsiders').textContent = 'Insiders 30%';
    document.getElementById('companyDetailsPublic').style.width = '25%';
    document.getElementById('companyDetailsPublic').textContent = 'Public 25%';
};

// Event listener for company cards
document.querySelectorAll('.company-card').forEach(card => {
    card.addEventListener('click', () => {
        const ticker = card.getAttribute('data-company');
        const company = companyData.find(c => c.ticker === ticker);
        if (company) {
            populateStockQuoteModal(company);
            stockQuoteModal.show();
        }
    });
});

// Event listener for "Full Details" button in stock quote modal
document.getElementById('modalDetailsBtn').addEventListener('click', () => {
    const ticker = document.getElementById('modalCompanyTicker').textContent;
    const company = companyData.find(c => c.ticker === ticker);
    if (company) {
        populateCompanyDetailsModal(company);
        stockQuoteModal.hide();
        companyDetailsModal.show();
    }
});