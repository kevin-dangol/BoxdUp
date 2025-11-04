const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./config/db');
const path = require('path');

const app = express();

app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../')));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// creating tables
(async () => {
  try {
    const conn = await db.getConnection();

    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN NULL,
            c_id INT NULL,
            s_id INT NULL
        );
    `);

    conn.release();
    console.log('Users table created or already exists');
  } catch (err) {
    console.error('Failed to create table:', err);
  }
})();

(async () => {
  try {
    const conn = await db.getConnection();

    await conn.query(`
      CREATE TABLE IF NOT EXISTS cards (
            c_id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL,
            card_numb VARCHAR(20) NOT NULL,
            card_expiry VARCHAR(10) NOT NULL,
            card_cvv VARCHAR(5) NOT NULL,
            card_holder VARCHAR(100) NOT NULL
        );
    `);

    conn.release();
    console.log('Cards table created or already exists');
  } catch (err) {
    console.error('Failed to create table:', err);
  }
})();

//start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));