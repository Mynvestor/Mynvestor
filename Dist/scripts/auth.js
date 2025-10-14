import { showToast } from './toast.js';

// Data model for signup
const signupData = {

    fullName: "",
    nationality: "",
    email: "",
    phone: "",
    dob: "",
    idType: "",
    idNumber: "",
    issuingCountry: "",
    expirationDate: "",
    annualIncome: "",
    sourceOfFunds: "",
    tradingExperience: "",
    investmentKnowledge: "",
    employmentStatus: "",
    occupation: "",
    employerName: "",
    industry: "",
    investmentGoals: "",
    riskTolerance: "",
    taxId: "",
    pep: "",
    idDocument: "",
    utilityBill: "",
    bankStatement: ""
};

// Step 1: Personal Information
if (window.location.pathname.endsWith('signup_step1.html')) {
    document.getElementById('signupStep1Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName')?.value.trim();
        const nationality = document.getElementById('Nationality')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const dob = document.getElementById('dob')?.value;

        let isValid = true;
        // Validation
        if (!/^[A-Za-z\s]{1,50}$/.test(fullName)) isValid = false;
        if (!/^[A-Za-z\s]{2,50}$/.test(nationality)) isValid = false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) isValid = false;
        if (!/^(\+?\d{10,15}|0\d{9,10})$/.test(phone.replace(/\s+/g, ''))) isValid = false;

        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
        if (age < 18 || isNaN(birthDate)) isValid = false;
        if (isValid) {
            signupData.dob = dob;
        } else {
            showToast('Please make sure you are 18 years of age or above.', 'error');
        }

        if (isValid) {
            signupData.fullName = fullName;
            signupData.nationality = nationality;
            signupData.email = email;
            signupData.phone = phone;
            signupData.dob = dob;
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step2.html";

            showToast('All data is correct lets go to next step', 'success');
        
        }
    });
}

// Step 2: Identification Details
if (window.location.pathname.endsWith('signup_step2.html')) {
    document.getElementById('signupStep2Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const idType = document.getElementById('idType')?.value;
        const idNumber = document.getElementById('idNumber')?.value.trim();
        const issuingCountry = document.getElementById('issuingCountry')?.value.trim();
        const expirationDate = document.getElementById('expirationDate')?.value;

        let isValid = true;
        if (!idType) isValid = false;
        if (!idNumber || idNumber.length < 4) isValid = false;
        if (!issuingCountry || issuingCountry.length < 2) isValid = false;
        if (new Date(expirationDate) <= new Date()) isValid = false;

        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.idType = idType;
            signupData.idNumber = idNumber;
            signupData.issuingCountry = issuingCountry;
            signupData.expirationDate = expirationDate;
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step3.html";
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}

// Step 3: Financial and Trading Experience
if (window.location.pathname.endsWith('signup_step3.html')) {
    document.getElementById('signupStep3Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const annualIncome = document.getElementById('annualIncome')?.value;
        const sourceOfFunds = document.getElementById('sourceOfFunds')?.value;
        const tradingExperience = document.getElementById('tradingExperience')?.value;
        const investmentKnowledge = document.getElementById('investmentKnowledge')?.value;

        let isValid = true;
        if (!/^\d+(\.\d{1,2})?$/.test(annualIncome) || annualIncome <= 0) isValid = false;
        if (!sourceOfFunds) isValid = false;
        if (!tradingExperience) isValid = false;
        if (!investmentKnowledge) isValid = false;

        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.annualIncome = annualIncome;
            signupData.sourceOfFunds = sourceOfFunds;
            signupData.tradingExperience = tradingExperience;
            signupData.investmentKnowledge = investmentKnowledge;
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step4.html";
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}

// Step 4: Employment and Occupation
if (window.location.pathname.endsWith('signup_step4.html')) {
    document.getElementById('signupStep3Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const employmentStatus = document.getElementById('employmentStatus')?.value;
        const occupation = document.getElementById('occupation')?.value;
        const employerName = document.getElementById('employerName')?.value;
        const industry = document.getElementById('industry')?.value;

        let isValid = true;
        if (!employmentStatus) isValid = false;
        if (!occupation) isValid = false;
        if (!employerName) isValid = false;
        if (!industry) isValid = false;

        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.employmentStatus = employmentStatus;
            signupData.occupation = occupation;
            signupData.employerName = employerName;
            signupData.industry = industry;
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step5.html";
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}

// Step 5: Risk Tolerance and Objectives
if (window.location.pathname.endsWith('signup_step5.html')) {
    document.getElementById('signupStep3Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const investmentGoals = document.getElementById('investmentGoals')?.value;
        const riskTolerance = document.getElementById('riskTolerance')?.value;

        let isValid = true;
        if (!investmentGoals) isValid = false;
        if (!riskTolerance) isValid = false;

        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.investmentGoals = investmentGoals;
            signupData.riskTolerance = riskTolerance;
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step6.html";
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}

// Step 6: Regulatory Compliance
if (window.location.pathname.endsWith('signup_step6.html')) {
    document.getElementById('signupStep3Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const taxId = document.getElementById('taxId')?.value;
        const pep = document.getElementById('pep')?.value;

        let isValid = true;
        if (!taxId) isValid = false;
        if (!pep) isValid = false;

        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.taxId = taxId;
            signupData.pep = pep;
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step7.html";
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}

// Step 7: Upload files
if (window.location.pathname.endsWith('signup_step7.html')) {
    document.getElementById('signupStep3Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const idDocument = document.getElementById('idDocument')?.files[0];
        const utilityBill = document.getElementById('utilityBill')?.files[0];
        const bankStatement = document.getElementById('bankStatement')?.files[0];

        let isValid = true;
        if (!idDocument) isValid = false;
        if (!utilityBill) isValid = false;
        if (!bankStatement) isValid = false;

        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.idDocument = idDocument?.name || '';
            signupData.utilityBill = utilityBill?.name || '';
            signupData.bankStatement = bankStatement?.name || '';
            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step8.html";
        } else {
            showToast('Please upload all required documents.', 'error');
        }
    });
}

// Step 8: Username & Password
if (window.location.pathname.endsWith('signup_step8.html')) {
    document.getElementById('signupStep3Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username')?.value.trim();
        const password = document.getElementById('password')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;

        let isValid = true;
        if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) isValid = false;
        if (!password || password.length < 6) isValid = false;
        if (password !== confirmPassword) isValid = false;

        if (isValid) {
            sessionStorage.removeItem('signupData');
            showToast('Sign-up Successful', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1200);
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}