require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const { verifyAdmin } = require('./routes/auth');
const { db } = require('./config/firebase');

const app = express();

// Set FRONTEND_URL on Render to your Vercel deployment URL, e.g.
// https://boxd-up.vercel.app  (no trailing slash)
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://boxd-up.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// Admin-only: list users (Firestore replaces the old `users` SQL table)
app.get('/api/users', verifyAdmin, async (req, res) => {
  try {
    const snap = await db.collection('users').get();
    const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin-only: delete a user's Firestore profile.
// Note: this does NOT delete the underlying Firebase Auth account — do that
// separately with admin.auth().deleteUser(uid) if you want a full wipe.
app.delete('/api/users/:id', verifyAdmin, async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.status(200).json({ message: `User ${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Serve the static frontend if it's deployed alongside the backend.
// (Not needed if the frontend is hosted separately on Vercel.)
app.use(express.static(path.join(__dirname, '../frontend')));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
