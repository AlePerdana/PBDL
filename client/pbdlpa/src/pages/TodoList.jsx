import React, { useState, useEffect, searchTerm } from "react";
import { motion } from "framer-motion";
import SearchIcon from "../assets/search.png";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos/');
      console.log('Fetched Tasks:', response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const handleAddTask = async (event) => {
    event.preventDefault();
    const newTask = {
      title: title,
      status: status,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  
    if (new Date(newTask.startTime) >= new Date(newTask.endTime)) {
      alert("Start time must be earlier than end time.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/todos/', newTask);
      console.log('Task added:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (task) => {
    console.log('Editing task with ID:', task._id);
    setEditId(task._id);
    setTitle(task.title);
    setStatus(task.status);
    setDate(task.date);
    setStartTime(task.startTime);
    setEndTime(task.endTime);
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();
    const updatedTask = {
      title,
      status,
      date,
      startTime,
      endTime,
    };

    try {
      const response = await axios.put(`http://localhost:3000/todos/${editId}`, updatedTask);
      console.log('Task updated:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
                .map((task, index) => (
                  <tr
                    key={task.task_id || index}
                    className="border-b border-black"
                  >
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.title}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.status}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.date}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.startTime}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {task.endTime}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(task._id)} 
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">
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
            <label htmlFor="title" className="font-poppins text-black">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Task Title"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="done">done</option>
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
                onClick= {editId ? handleUpdateTask : handleAddTask} 
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

export default TodoList;
