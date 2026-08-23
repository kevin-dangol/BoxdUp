// Session/nav handling, now driven by Firebase Auth instead of Supabase.
import { auth, API_BASE } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

function setNav({ loggedIn, isAdmin }) {
  const loginLink = document.getElementById('login-link');
  const signupLink = document.getElementById('signup-link');
  const profileMenu = document.getElementById('profile-menu');
  const signupButton = document.getElementById('signup-button');
  const adminLink = document.getElementById('admin-link');
  const homeLink = document.querySelector('.home-link');

  if (loginLink) loginLink.style.display = loggedIn ? 'none' : 'inline-block';
  if (signupLink) signupLink.style.display = loggedIn ? 'none' : 'inline-block';
  if (profileMenu) profileMenu.style.display = loggedIn ? 'inline-block' : 'none';
  if (signupButton) signupButton.style.display = loggedIn ? 'none' : 'inline-block';
  if (adminLink) adminLink.style.display = loggedIn && isAdmin ? 'block' : 'none';
  if (homeLink) homeLink.href = '/pages/home.html';

  if (adminLink && loggedIn && window.location.pathname.includes('admin.html')) {
    adminLink.classList.add('active');
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    localStorage.removeItem('token');
    setNav({ loggedIn: false, isAdmin: false });
    return;
  }

  try {
    const token = await user.getIdToken();
    localStorage.setItem('token', token);

    const response = await fetch(`${API_BASE}/api/auth/check-session`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    setNav({ loggedIn: result.logged_in, isAdmin: result.is_admin });
  } catch (error) {
    console.error('Session check error:', error);
    // Still logged into Firebase even if our API call failed
    setNav({ loggedIn: true, isAdmin: false });
  }
});

window.logout = async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem('token');
    window.location.href = '/index.html';
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to log out. Please try again later.');
  }
};
