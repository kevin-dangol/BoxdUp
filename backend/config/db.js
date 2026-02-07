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

const { createClient } = require('@supabase/supabase-js');

//Supabase client for client-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Supabase client for server-side
const supabaseAdmin = createClient(
  process.env.BoxdUpDB_SUPABASE_URL,
  process.env.BoxdUpDB_SUPABASE_SERVICE_ROLE_KEY
);

module.exports = { supabase, supabaseAdmin };