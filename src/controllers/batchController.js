const pool = require("../config/db");

// Create Batch
const createBatch = async (req, res) => {
  try {
    const { batch_name, course, start_date, end_date } = req.body;

    const result = await pool.query(
      `INSERT INTO batches (batch_name, course, start_date, end_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [batch_name, course, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Batches
const getBatches = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM batches ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createBatch,
  getBatches,
};