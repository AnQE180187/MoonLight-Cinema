import axios from "axios";

const API_URL = "http://localhost:5268/api"; // Địa chỉ backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const fetchCinemas = async () => {
  const response = await fetch(`${API_URL}/cinema`);
  return response.json();
};

export const addCinema = async (cinema) => {
  const response = await fetch(`${API_URL}/cinema`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cinema),
  });
  return response.json();
};

export const updateCinema = async (id, cinema) => {
  await fetch(`${API_URL}/cinema/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cinema),
  });
};

export const deleteCinema = async (id) => {
  await fetch(`${API_URL}/cinema/${id}`, { method: "DELETE" });
};
export default api; // 🔹 Đảm bảo có `export default`

export const fetchRooms = async () => {
  const response = await fetch(`${API_URL}/Room`);
  return response.json();
};

export const addRoom = async (room) => {
  console.log("Data sent to API:", room); // 🛠️ Kiểm tra dữ liệu trước khi gửi

  const response = await fetch(`${API_URL}/Room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API error response:", errorData);
    throw new Error(`API Error: ${JSON.stringify(errorData)}`);
  }

  return response.json();
};


export const updateRoom = async (id, room) => {
  await fetch(`${API_URL}/Room/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });
};

export const deleteRoom = async (id) => {
  await fetch(`${API_URL}/Room/${id}`, { method: "DELETE" });
};

// Lấy danh sách nhân viên
export const getEmployees = async () => {
  try {
    const response = await api.get("/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Thêm nhân viên
export const addEmployee = async (employeeData) => {
  try {
    const response = await api.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Cập nhật nhân viên
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Xóa nhân viên
export const deleteEmployee = async (id) => {
  try {
    await api.delete(`/employees/${id}`);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};