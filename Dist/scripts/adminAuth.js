import { showToast } from './toast.js';

// Data model for signup
const signupData = {

    fullName: "",
    employeeId: "",
    department: "",

    email: "",
    phone: "",
  
    username: ""
};

// Step 1: Personal Information
if (window.location.pathname.endsWith('signup_step1.html')) {
    document.getElementById('signupStep1Form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName')?.value.trim();
        const employeeId = document.getElementById('employeeId')?.value.trim();
        const department = document.getElementById('department')?.value.trim();
        

        let isValid = true;
        // Validation
        if (!/^[A-Za-z\s]{1,50}$/.test(fullName)) isValid = false;
        if (!/^[A-Za-z\s]{2,50}$/.test(employeeId)) isValid = false;
        if (!/^[A-Za-z\s]{2,50}$/.test(department)) isValid = false;

       

        if (isValid) {
            signupData.fullName = fullName;
            signupData.employeeId = employeeId;
            signupData.department = department;

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
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();

        let isValid = true;
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) isValid = false;
         if (!/^(\+?\d{10,15}|0\d{9,10})$/.test(phone.replace(/\s+/g, ''))) isValid = false;


        if (isValid) {
            const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
            signupData.email = email;
            signupData.phone = phone;

            sessionStorage.setItem('signupData', JSON.stringify(signupData));
            window.location.href = "signup_step3.html";
        } else {
            showToast('Please fill all fields correctly.', 'error');
        }
    });
}

// Step 3: Username & Password
if (window.location.pathname.endsWith('signup_step3.html')) {
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