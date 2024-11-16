const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Route untuk membuat task baru
router.post("/", taskController.createTask);

// Route untuk mendapatkan semua task
router.get("/", taskController.getAllTasks);

// Route untuk mendapatkan task berdasarkan ID
router.get("/:id", taskController.getTaskById);

// Route untuk memperbarui task
router.put("/:id", taskController.updateTask);

// Route untuk menghapus task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
