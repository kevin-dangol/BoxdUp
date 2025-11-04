const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./config/db');

const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(express.json());
app.use(express.static('../'));

app.use('/api/auth', authRoutes);

db.getConnection()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));

app.listen(3001, () => {
    console.log('Server running on port 3001');
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
    console.log('✅ Users table created or already exists');
  } catch (err) {
    console.error('❌ Failed to create table:', err);
  }
})();