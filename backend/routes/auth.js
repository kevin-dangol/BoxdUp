const express = require('express');
const { auth } = require('../config/firebase');
const User = require('../models/user');
const router = express.Router();

// Firebase Auth (signup/login/logout) happens entirely client-side with the
// Firebase JS SDK. This backend only verifies the ID token the client sends
// and manages the Firestore profile doc (username, is_admin, etc).

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    req.decodedToken = await auth.verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const verifyAdmin = [
  verifyToken,
  async (req, res, next) => {
    try {
      const user = await User.findByUid(req.decodedToken.uid);
      if (!user || !user.is_admin) {
        return res.status(403).json({ success: false, message: 'Admin access required' });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
];

// Public: resolve a username to the email Firebase Auth needs to sign in.
// Firebase's email/password provider only signs in by email, so the login
// form's "Username" field has to be translated first. This intentionally
// returns 404 (not the email itself is never leaked beyond that) rather
// than a generic "invalid credentials" — acceptable for this app's threat
// model, but note it does allow username enumeration if that ever matters.
router.get('/resolve-email', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ success: false, message: 'username is required' });
    }
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found for that username' });
    }
    res.json({ success: true, email: user.email });
  } catch (error) {
    console.error('resolve-email error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Called once, right after the client finishes Firebase createUserWithEmailAndPassword
router.post('/sync-profile', verifyToken, async (req, res) => {
  try {
    const { username } = req.body;
    const { uid, email } = req.decodedToken;
    const profile = await User.createProfile(uid, email, username || email.split('@')[0]);
    res.json({ success: true, message: 'Profile created', profile });
  } catch (error) {
    console.error('sync-profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Checked by the frontend on page load to decide what nav links to show
router.get('/check-session', verifyToken, async (req, res) => {
  try {
    const user = await User.findByUid(req.decodedToken.uid);
    res.json({ logged_in: true, is_admin: !!(user && user.is_admin) });
  } catch (error) {
    res.json({ logged_in: false, is_admin: false });
  }
});

module.exports = router;
module.exports.verifyToken = verifyToken;
module.exports.verifyAdmin = verifyAdmin;
