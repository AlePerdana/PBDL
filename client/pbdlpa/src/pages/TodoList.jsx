import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SearchIcon from "../assets/search.png";

const PlotConfig = () => {
  const [plots, setPlots] = useState([]);
  const [plotName, setPlotName] = useState("");
  const [area, setArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null); // Track the ID of the plot being edited

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/plots", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Plots:", response.data);
      setPlots(response.data);
    } catch (error) {
      console.error("Error fetching plots:", error);
    }
  };

  const handleAddPlot = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/plots",
        {
          plot_name: plotName,
          area,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlots([...plots, response.data.plot]);
      resetForm();
    } catch (error) {
      console.error("Error adding plot:", error);
    }
  };

  const handleEdit = (plot) => {
    console.log("Editing plot with ID:", plot.plot_id);
    setEditId(plot.plot_id);
    setPlotName(plot.plot_name);
    setArea(plot.area);
  };

  const handleUpdatePlot = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/plots/${editId}`,
        {
          plot_name: plotName,
          area,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlots(
        plots.map((plot) =>
          plot.plot_id === editId
            ? { ...plot, plot_name: plotName, area }
            : plot
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating plot:", error);
    }
  };

  const handleDelete = async (plotId) => {
    console.log("Deleting plot with ID:", plotId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/plots/${plotId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlots(plots.filter((plot) => plot.plot_id !== plotId));
    } catch (error) {
      console.error("Error deleting plot:", error);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setPlotName("");
    setArea("");
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
              Land and Plot Configuration
            </h1>
            <div className="relative mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Cari Petak"
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
                  Nama Petak Lahan
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Luas Area
                </th>
                <th className="py-2 px-2 md:px-3 font-poppins font-medium">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {plots
                .filter((plot) =>
                  plot.plot_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((plot, index) => (
                  <tr
                    key={plot.plot_id || index}
                    className="border-b border-black"
                  >
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {plot.plot_name}
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      {plot.area} m²
                    </td>
                    <td className="py-2 px-2 md:px-3 font-poppins">
                      <button
                        onClick={() => handleEdit(plot)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plot.plot_id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                      >
                        Delete
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
            {editId ? "Edit Plot" : "Add New Plot"}
          </h2>
          <form
            onSubmit={editId ? handleUpdatePlot : handleAddPlot}
            className="flex flex-col gap-3"
          >
            <label htmlFor="plotName" className="font-poppins text-black">
              Nama Petak
            </label>
            <input
              type="text"
              placeholder="Nama Petak Lahan"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={plotName}
              onChange={(e) => setPlotName(e.target.value)}
            />
            <label htmlFor="area" className="font-poppins text-black">
              Luas Area
            </label>
            <input
              type="text"
              placeholder="Luas Area"
              className="p-2 rounded-xl bg-white text-black border border-gray-300"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
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

export default PlotConfig;
