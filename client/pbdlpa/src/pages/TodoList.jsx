import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchIcon from "../assets/search.png";

const TaskConfig = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [taskName, setTaskName] = useState("");
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Placeholder data with form-matching fields
  const [tasks, setTasks] = useState([
    {
      task_id: 1,
      task_name: "Task A",
      status: "Active",
      date: "2024-01-01",
      start_time: "08:00",
      end_time: "10:00",
    },
    {
      task_id: 2,
      task_name: "Task B",
      status: "Inactive",
      date: "2024-01-02",
      start_time: "09:00",
      end_time: "12:00",
    },
  ]);

  const handleEdit = (task) => {
    setEditId(task.task_id);
    setTaskName(task.task_name);
    setStatus(task.status);
    setDate(task.date);
    setStartTime(task.start_time);
    setEndTime(task.end_time);
  };

  const handleSubmit = () => {
    const newTask = {
      task_id: editId || new Date().getTime(),
      task_name: taskName,
      status,
      date,
      start_time: startTime,
      end_time: endTime,
    };

    if (editId) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.task_id === editId ? newTask : task))
      );
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setTaskName("");
    setStatus("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#16332F] to-[#2F6D3C] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="flex flex-col md:flex-row items-start justify-center py-8 md:py-10 gap-4 mb-10">
        {/* Left Section - Table */}
        <div className="w-full max-w-lg md:max-w-3xl bg-[#DFEDC0] p-4 md:p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-lg md:text-xl font-poppins font-bold text-black">
              Task Management
            </h1>
            <div className="relative mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Cari Task"
                className="bg-white text-black p-2 pl-4 rounded-full shadow-md text-xs md:text-sm w-56 md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                src={SearchIcon}
                alt="Search Icon"
                className="absolute right-3 top-3 w-4 h-4"
              />
            </div>
          </div>
          <table className="w-full text-left text-black">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  No.
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Task Title
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Status
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Date
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Start Time
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  End Time
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) =>
                  task.task_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((task, index) => (
                  <tr
                    key={task.task_id || index}
                    className="border-b border-black"
                  >
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.task_name}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.status}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.date}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.start_time}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.end_time}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">
                        Done
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Right Section - Form */}
        <div className="w-full max-w-sm bg-[#DFEDC0] p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-poppins font-bold text-black mb-4">
            {editId ? "Edit Task" : "Add New Task"}
          </h2>
          <form className="flex flex-col gap-3">
            <label htmlFor="taskName" className="font-poppins text-black">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Task Title"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <label htmlFor="status" className="font-poppins text-black">
              Status
            </label>
            <select
              id="status"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <label htmlFor="date" className="font-poppins text-black">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="startTime" className="font-poppins text-black">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            <label htmlFor="endTime" className="font-poppins text-black">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-xl"
              >
                {editId ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default TaskConfig;
