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
    window.location.href = "/Authentication/investor/login.html";
});

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
