const Task = require("../models/task");
const { getWIBDateTime } = require("../utils/timezone");

// Controller untuk membuat task baru
exports.createTask = async (req, res) => {
  try {
    const { title, status, date, startTime, endTime } = req.body;

    const wibDate = getWIBDateTime(date).format("YYYY-MM-DD");
    const wibStartTime = getWIBDateTime(`${date} ${startTime}`).format("HH:mm");
    const wibEndTime = getWIBDateTime(`${date} ${endTime}`).format("HH:mm");

    // Validate time range
    if (wibStartTime >= wibEndTime) {
      return res
        .status(400)
        .json({ error: "Start time must be earlier than end time." });
    }

    const task = new Task({
      title,
      status,
      date: wibDate,
      startTime: wibStartTime,
      endTime: wibEndTime,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk mendapatkan semua task
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk mendapatkan task berdasarkan ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk memperbarui task
exports.updateTask = async (req, res) => {
  try {
    const { title, status, date, startTime, endTime } = req.body;

    // Mengonversi date, startTime, dan endTime ke WIB
    const wibDate = getWIBDateTime(date).format("YYYY-MM-DD");
    const wibStartTime = getWIBDateTime(`${date} ${startTime}`).format("HH:mm");
    const wibEndTime = getWIBDateTime(`${date} ${endTime}`).format("HH:mm");

    // Validasi: Memastikan startTime lebih awal dari endTime
    if (wibStartTime >= wibEndTime) {
      return res
        .status(400)
        .json({ error: "startTime must be earlier than endTime" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        date: wibDate,
        startTime: wibStartTime,
        endTime: wibEndTime,
      },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk menghapus task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
