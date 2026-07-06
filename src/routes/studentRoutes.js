const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Protected Routes
router.post("/add", verifyToken, addStudent);
router.get("/", verifyToken, getStudents);
router.get("/:id", verifyToken, getStudentById);
router.put("/:id", verifyToken, updateStudent);
router.delete("/:id", verifyToken, deleteStudent);

module.exports = router;