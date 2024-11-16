const mongoose = require("mongoose");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs-timezone-iana-plugin");

dayjs.extend(utc);
dayjs.extend(timezone);
// Konfigurasi untuk mendapatkan waktu Indonesia Barat (WIB)

// Skema Task baru
const getWIBDateTime = () => {
  return dayjs().tz("Asia/Jakarta"); // Menggunakan zona waktu Asia/Jakarta (WIB)
};

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending",
  },
  date: {
    type: String,
    required: true, // Tanggal harus diatur oleh pengguna
    default: () => getWIBDateTime().format("YYYY-MM-DD"), // Format tanggal WIB
  },
  startTime: {
    type: String,
    required: true, // Wajib diisi oleh pengguna
    default: () => getWIBDateTime().format("HH:mm"), // Format waktu WIB (HH:mm)
  },
  endTime: {
    type: String,
    required: true, // Wajib diisi oleh pengguna
    default: () => getWIBDateTime().format("HH:mm"), // Format waktu WIB (HH:mm)
  },
});

module.exports = mongoose.model("Task", taskSchema);
