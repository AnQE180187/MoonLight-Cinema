import React, { useState, useEffect } from "react";

const MovieModal = ({ isOpen, onClose, onSave, movie }) => {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    director: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    } else {
      setFormData({ name: "", genre: "", director: "", description: "", startDate: "", endDate: "" });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{movie ? "Edit Movie" : "Add Movie"}</h2>
        <input name="name" placeholder="Movie Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input name="director" placeholder="Director" value={formData.director} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">{movie ? "Update" : "Create"}</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
