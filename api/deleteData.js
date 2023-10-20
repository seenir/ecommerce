const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use environment variable for connection string
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  const itemId = req.query.itemId;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM items WHERE id = $1', [itemId]);
    const results = { 'results': (result) ? result.rows : null };
    res.status(200).json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
