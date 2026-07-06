const pool = require("../config/db");

// Add Student
const addStudent = async (req, res) => {
  try {
    const { name, email, department, roll_number } = req.body;

    const result = await pool.query(
      `INSERT INTO students (name, email, department, roll_number)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, department, roll_number]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Students
const getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Student by ID
const getStudentById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    const { name, email, department, roll_number } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET name=$1, email=$2, department=$3, roll_number=$4
       WHERE id=$5
       RETURNING *`,
      [name, email, department, roll_number, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};