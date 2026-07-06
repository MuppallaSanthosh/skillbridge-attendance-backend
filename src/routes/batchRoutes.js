const express = require("express");
const router = express.Router();

const {
  createBatch,
  getBatches,
} = require("../controllers/batchController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Batch (Protected)
router.post("/", authMiddleware, createBatch);

// Get All Batches (Protected)
router.get("/", authMiddleware, getBatches);

module.exports = router;