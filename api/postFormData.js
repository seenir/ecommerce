import { Client } from 'pg';

export default async function handler(req, res) {
  const { name, description, price } = req.body;
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // This is necessary if your PostgreSQL server uses a self-signed certificate
    },
  });
  console.error('client client client:', client);
  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO items (name, description, price) VALUES ($1, $2, $3)',
      [name, description, price]
    );
    res.status(200).json({ success: true, message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  } finally {
    await client.end();
  }
}
