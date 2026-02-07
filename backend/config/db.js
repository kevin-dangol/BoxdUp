// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false
//   },
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// (async () => {
//   try {
//     const conn = await pool.getConnection();
//     console.log('Connected to MySQL');
//     conn.release();
//   } catch (err) {
//     console.error('Database connection failed:', err);
//   }
// })();


// module.exports = pool;

// const { createClient } = require('@supabase/supabase-js');

// require('dotenv').config();

// console.log("Supabase URL:", process.env.BoxdUpDB_SUPABASE_URL);
// console.log("Supabase Service Role Key:", process.env.BoxdUpDB_SUPABASE_SERVICE_ROLE_KEY);

// //Supabase client for client-side
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// // Supabase client for server-side
// const supabaseAdmin = createClient(
//   process.env.BoxdUpDB_SUPABASE_URL,
//   process.env.BoxdUpDB_SUPABASE_SERVICE_ROLE_KEY
// );

// module.exports = { supabase, supabaseAdmin };

const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');  // Make sure you're using the pg package
require('dotenv').config();

// If you're using the Supabase Client directly:
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Supabase client for server-side
const supabaseAdmin = createClient(
  process.env.BoxdUpDB_SUPABASE_URL,
  process.env.BoxdUpDB_SUPABASE_SERVICE_ROLE_KEY
);

// For direct Postgres connection using pg package
const dbClient = new Client({
  connectionString: process.env.BoxdUpDB_POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'verify-full',
  },
});

dbClient.connect()
  .then(() => {
    console.log('Connected to Supabase Postgres');
  })
  .catch((error) => {
    console.error('Error connecting to Supabase Postgres:', error);
  });