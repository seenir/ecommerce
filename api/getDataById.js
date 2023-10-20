const pool = require('../db');

const getData = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the ID is provided as a route parameter
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    res.json(result.rows[0]); // Assuming you expect only one result
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getData;
