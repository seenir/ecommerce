const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: 5432, // or your specific port
  ssl: {
    rejectUnauthorized: false, // This is necessary if your PostgreSQL server uses a self-signed certificate
  },
});

module.exports = pool;
