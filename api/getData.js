const pool = require('../db');

const getData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items'); // add id
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getData;
