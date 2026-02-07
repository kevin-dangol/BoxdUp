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

// Create the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // Your Supabase URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Your public anonymous key (this can be used for public operations)
);

// For server-side/admin actions, use the service role key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL, // URL
  process.env.SUPABASE_SERVICE_ROLE_KEY // Admin key
);

module.exports = { supabase, supabaseAdmin };
