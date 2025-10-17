const investorData = {
    CL001: {
        name: "Cedar Capital Ltd",
        status: "active",
        investorId: "CL001",
        lastActive: "2025-04-12 14:30",
        portfolio: { 
            cash: "MK 50,000", 
            value: "MK 250,000", 
            positions: [
                { stock: "NBM", shares: 200, value: "MK 100,000" }, 
                { stock: "AIRTEL", shares: 1000, value: "MK 50,000" }
            ]
        },
        transactions: [
            { id: "TR001", type: "Buy", amount: "MK 100,000", date: "2025-04-12", status: "Completed" }
        ],
        orders: [
            { id: "OR001", type: "Buy", stock: "NBM", quantity: 200, price: "MK 500", status: "Completed", date: "2025-04-12" }
        ],
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
            employment: { employer: "Finance Inc", position: "Analyst", years: 3 },
            risk: { level: "Low", experience: "1 year" },
            compliance: { pep: "Yes", sanctions: "None" },
            verification: { status: "Pending", csd: "" }
        }
    }
};

export default investorData;