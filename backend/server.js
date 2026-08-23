require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { verifyAdmin } = require('./routes/auth');
const { db } = require('./config/firebase');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://boxd-up.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'boxdup-backend' });
});

// API routes
app.use('/api/auth', authRoutes);

app.get('/api/users', verifyAdmin, async (req, res) => {
  try {
    const snap = await db.collection('users').get();
    const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/users/:id', verifyAdmin, async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.status(200).json({ message: `User ${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
