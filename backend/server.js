// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const db = require('./config/db');
// const path = require('path');

// const app = express();

// const corsOptions = {
//   origin: 'https://boxdup.onrender.com',
//   credentials: true
// };

// app.use(cors());
// app.use(express.json());

// // API routes
// app.use('/api/auth', authRoutes);

// app.use(express.static(path.join(__dirname, '../')));

// app.use((req, res, next) => {
//   if (req.path.startsWith('/api/')) return next();
//   res.sendFile(path.join(__dirname, '../', 'index.html'));
// });

// // creating tables
// (async () => {
//   try {
//     const conn = await db.getConnection();

//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             email VARCHAR(100) UNIQUE NOT NULL,
//             username VARCHAR(50) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             is_admin BOOLEAN NULL,
//             c_id INT NULL,
//             s_id INT NULL
//         );
//     `);

//     conn.release();
//     console.log('Users table created or already exists');
//   } catch (err) {
//     console.error('Failed to create table:', err);
//   }
// })();

// (async () => {
//   try {
//     const conn = await db.getConnection();

//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS cards (
//             c_id INT AUTO_INCREMENT PRIMARY KEY,
//             email VARCHAR(100) NOT NULL,
//             card_numb VARCHAR(20) NOT NULL,
//             card_expiry VARCHAR(10) NOT NULL,
//             card_cvv VARCHAR(5) NOT NULL,
//             card_holder VARCHAR(100) NOT NULL
//         );
//     `);

//     conn.release();
//     console.log('Cards table created or already exists');
//   } catch (err) {
//     console.error('Failed to create table:', err);
//   }
// })();

// (async () => {
//   try {
//     const conn = await db.getConnection();

//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS subscriptions (
//             s_id INT AUTO_INCREMENT PRIMARY KEY,
//             email VARCHAR(100) NOT NULL,
//             name VARCHAR(100) NOT NULL,
//             address VARCHAR(255) NULL,
//             number VARCHAR(20) NULL
//         );
//     `);

//     conn.release();
//     console.log('Subscriptions table created or already exists');
//   } catch (err) {
//     console.error('Failed to create table:', err);
//   }
// })();

// //start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { supabase, supabaseAdmin } = require('./config/db');
const { Client } = require('pg');
const path = require('path');

const app = express();

//PostgreSQL client
const pgClient = new Client({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const corsOptions = {
  origin: 'https://boxd-up.vercel.app/',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// Static file serving
app.use(express.static(path.join(__dirname, '../')));

// Default route for non-API requests
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});

const createTables = async () => {
  try {
    await pgClient.connect();

    // users table
    const usersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        c_id INT,
        s_id INT
      );
    `;
    await pgClient.query(usersTableQuery);
    console.log('Users table created or already exists');

    // cards table
    const cardsTableQuery = `
      CREATE TABLE IF NOT EXISTS cards (
        c_id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        card_numb VARCHAR(20) NOT NULL,
        card_expiry VARCHAR(10) NOT NULL,
        card_cvv VARCHAR(5) NOT NULL,
        card_holder VARCHAR(100) NOT NULL
      );
    `;
    await pgClient.query(cardsTableQuery);
    console.log('Cards table created or already exists');

    // subscriptions table
    const subscriptionsTableQuery = `
      CREATE TABLE IF NOT EXISTS subscriptions (
        s_id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        number VARCHAR(20)
      );
    `;
    await pgClient.query(subscriptionsTableQuery);
    console.log('Subscriptions table created or already exists');

    await pgClient.end();
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

// Create tables on server start
createTables();

// Example route to fetch users from Supabase (GET /api/users)
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ users: data });
});

// Example route to create a user (POST /api/users)
app.post('/api/users', async (req, res) => {
  const { email, username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, username, password }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'User created successfully', data });
});

// Example admin route to delete a user by ID (DELETE /api/users/:id)
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: `User with ID ${id} deleted`, data });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

