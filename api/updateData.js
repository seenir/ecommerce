// api/updateData.js

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  const { itemId, name, description, price } = req.query;

  const client = await pool.connect();

  try {
    const sql = 'UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4';
    const values = [name, description, price, itemId];
    const result = await client.query(sql, values);
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating item' });
  } finally {
    client.release();
  }
}
