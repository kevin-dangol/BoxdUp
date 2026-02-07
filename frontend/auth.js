// //check if the user is logged in or not
// async function checkSession() {
//     const token = localStorage.getItem('token');
//     const loginLink = document.getElementById('login-link');
//     const signupLink = document.getElementById('signup-link');
//     const profileMenu = document.getElementById('profile-menu');
//     const signupButton = document.getElementById('signup-button');
//     const adminLink = document.getElementById('admin-link');
//     const homeLink = document.querySelector('.home-link');

//     if (!token) {

//         if (loginLink) loginLink.style.display = 'inline-block';
//         if (signupLink) signupLink.style.display = 'inline-block';
//         if (profileMenu) profileMenu.style.display = 'none';
//         if (signupButton) signupButton.style.display = 'inline-block';
//         if (adminLink) adminLink.style.display = 'none';
//         if (homeLink) homeLink.href = 'pages/home.html';
//         return;
//     }

//     try {
//         const response = await fetch('https://boxdup.onrender.com/api/auth/check-session', {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const result = await response.json();

//         if (result.logged_in) {

//             if (loginLink) loginLink.style.display = 'none';
//             if (signupLink) signupLink.style.display = 'none';
//             if (profileMenu) profileMenu.style.display = 'inline-block';
//             if (signupButton) signupButton.style.display = 'none';
//             if (adminLink) adminLink.style.display = result.is_admin ? 'block' : 'none';
//             if (homeLink) homeLink.href = '/pages/home.html';


//             if (adminLink && window.location.pathname.includes('admin.html')) {
//                 adminLink.classList.add('active');
//             }
//         } else {

//             localStorage.removeItem('token');
//             localStorage.removeItem('is_admin');
//             if (loginLink) loginLink.style.display = 'inline-block';
//             if (signupLink) signupLink.style.display = 'inline-block';
//             if (profileMenu) profileMenu.style.display = 'none';
//             if (signupButton) signupButton.style.display = 'inline-block';
//             if (adminLink) adminLink.style.display = 'none';
//             if (homeLink) homeLink.href = '/pages/home.html';
//         }
//     } catch (error) {
//         console.error('Session check error:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('is_admin');
//         if (loginLink) loginLink.style.display = 'inline-block';
//         if (signupLink) signupLink.style.display = 'inline-block';
//         if (profileMenu) profileMenu.style.display = 'none';
//         if (signupButton) signupButton.style.display = 'inline-block';
//         if (adminLink) adminLink.style.display = 'none';
//         if (homeLink) homeLink.href = '/pages/home.html';
//     }
// }

// //logout
// async function logout() {
//     try {
//         const response = await fetch('https://boxdup.onrender.com/api/auth/logout', {
//             method: 'POST',
//             // credentials: 'include'
//         });
//         const result = await response.json();
//         alert(result.message);
//         if (result.success) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('is_admin');
//             window.location.href = '../../index.html';
//         }
//     } catch (error) {
//         console.error('Logout error:', error);
//         alert('Failed to log out. Please try again later.');
//     }
// }

// //run the check on the page
// document.addEventListener('DOMContentLoaded', checkSession);

// Initialize Supabase Client
const { supabase, supabaseAdmin } = require('../backend/config/db');

const supabase = createClient(
    'https://lfpohlqfxxbtzpzmiqny.supabase.co', // Your Supabase URL
    'public-anon-key' // Your Supabase anon key (can be environment variable or hardcoded for testing)
);

// Check if the user is logged in or not
async function checkSession() {
    const token = localStorage.getItem('token');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const profileMenu = document.getElementById('profile-menu');
    const signupButton = document.getElementById('signup-button');
    const adminLink = document.getElementById('admin-link');
    const homeLink = document.querySelector('.home-link');

    if (!token) {
        // User is not logged in
        if (loginLink) loginLink.style.display = 'inline-block';
        if (signupLink) signupLink.style.display = 'inline-block';
        if (profileMenu) profileMenu.style.display = 'none';
        if (signupButton) signupButton.style.display = 'inline-block';
        if (adminLink) adminLink.style.display = 'none';
        if (homeLink) homeLink.href = 'pages/home.html';
        return;
    }

    // Check session via Supabase
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error getting user:', error);
            localStorage.removeItem('token');
            return;
        }

        if (user) {
            // User is logged in
            localStorage.setItem('token', user.id); // Store user ID or token

            if (loginLink) loginLink.style.display = 'none';
            if (signupLink) signupLink.style.display = 'none';
            if (profileMenu) profileMenu.style.display = 'inline-block';
            if (signupButton) signupButton.style.display = 'none';
            if (adminLink) adminLink.style.display = user.role === 'admin' ? 'block' : 'none';
            if (homeLink) homeLink.href = '/pages/home.html';

            if (adminLink && window.location.pathname.includes('admin.html')) {
                adminLink.classList.add('active');
            }
        } else {
            // User is not logged in
            localStorage.removeItem('token');
            if (loginLink) loginLink.style.display = 'inline-block';
            if (signupLink) signupLink.style.display = 'inline-block';
            if (profileMenu) profileMenu.style.display = 'none';
            if (signupButton) signupButton.style.display = 'inline-block';
            if (adminLink) adminLink.style.display = 'none';
            if (homeLink) homeLink.href = '/pages/home.html';
        }
    } catch (error) {
        console.error('Session check error:', error);
        localStorage.removeItem('token');
        if (loginLink) loginLink.style.display = 'inline-block';
        if (signupLink) signupLink.style.display = 'inline-block';
        if (profileMenu) profileMenu.style.display = 'none';
        if (signupButton) signupButton.style.display = 'inline-block';
        if (adminLink) adminLink.style.display = 'none';
        if (homeLink) homeLink.href = '/pages/home.html';
    }
}

// Logout
async function logout() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }

        alert('Logged out successfully!');
        localStorage.removeItem('token');
        window.location.href = '/index.html'; // Redirect to home page or login page
    } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to log out. Please try again later.');
    }
}

// Run the check on page load
document.addEventListener('DOMContentLoaded', checkSession);