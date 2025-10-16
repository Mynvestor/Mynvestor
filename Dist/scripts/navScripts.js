const sections = document.querySelectorAll(".content-section");
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => item.addEventListener("click", handleNavClick));

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
window.addEventListener("load", () => {
    const sectionId = window.location.hash.substring(1) || localStorage.getItem("lastSectionIndex2") || "portfolio";
    showSection(sectionId);
});
window.addEventListener("hashchange", () => {
    showSection(window.location.hash.substring(1) || "portfolio");
});

