import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Edit, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import { fetchRooms, fetchCinemas, addRoom, updateRoom, deleteRoom } from "../services/api";
import "../styles/Room.css";
import "../styles/table.css";

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [cinemas, setCinemas] = useState([]); // ✅ Thêm danh sách rạp
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: "", seatCount: "", type: "", cinemaId: "" });

  useEffect(() => {
    loadRooms();
    loadCinemas(); // ✅ Load danh sách rạp
  }, []);

  const loadRooms = async () => {
    const roomsData = await fetchRooms();
    const cinemasData = await fetchCinemas();

    // ✅ Gán tên cinema dựa vào cinemaId
    const roomsWithCinema = roomsData.map(room => {
      const cinema = cinemasData.find(c => c.cinemaId === room.cinemaId);
      return { ...room, cinemaName: cinema ? cinema.name : "Unknown" };
    });

    setRooms(roomsWithCinema);
  };

  const loadCinemas = async () => {
    const data = await fetchCinemas();
    setCinemas(data);
  };

  const handleShowModal = (room = null) => {
    setEditingRoom(room);
    setNewRoom(room ? { ...room } : { name: "", seatCount: "", type: "", cinemaId: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoom(null);
  };

  const handleSave = async () => {
    if (!newRoom.name || !newRoom.seatCount || !newRoom.type || !newRoom.cinemaId) {
      alert("Please fill in all fields.");
      return;
    }
  
    const formattedRoom = {
      name: newRoom.name.trim(),
      seatCount: parseInt(newRoom.seatCount, 10),
      type: newRoom.type.trim(),
      cinemaId: parseInt(newRoom.cinemaId, 10), // Đảm bảo chuyển đổi sang số
    };
  
    try {
      if (editingRoom) {
        await updateRoom(editingRoom.roomId, formattedRoom);
      } else {
        await addRoom(formattedRoom);
      }
      loadRooms();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving room:", error);
      alert(`Error: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };
  

  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId);
        loadRooms();
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Error deleting room.");
      }
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rooms);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rooms");
    XLSX.writeFile(wb, "rooms.xlsx");
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cinema-container">
      <h2 className="cinema-title">Rooms</h2>
      <div className="cinema-header">
        <InputGroup className="search-bar">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">
            <Search size={18} />
          </Button>
        </InputGroup>
        <div className="cinema-actions">
          <Button variant="success" onClick={() => handleShowModal()}>
            <FilePlus size={18} className="me-2" /> Add Room
          </Button>
          <Button variant="primary" onClick={exportToExcel} className="ms-2">
            <Download size={18} className="me-2" /> Export to Excel
          </Button>
        </div>
      </div>

      <Table bordered hover responsive className="cinema-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Seat Count</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomId}</td>
              <td>{room.name}</td>
              <td>{room.seatCount}</td>
              <td>{room.type}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(room)}>
                  <Edit size={18} />
                </Button>
                <Button variant="outline-danger" onClick={() => handleDelete(room.roomId)}>
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRoom ? "Edit Room" : "Add Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Seat Count</Form.Label>
              <Form.Control
                type="number"
                value={newRoom.seatCount}
                onChange={(e) => setNewRoom({ ...newRoom, seatCount: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={newRoom.type}
                onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cinema</Form.Label>
              <Form.Select
                value={newRoom.cinemaId}
                onChange={(e) => setNewRoom({ ...newRoom, cinemaId: e.target.value })}
              >
                <option value="">Select Cinema</option>
                {cinemas.map((cinema) => (
                  <option key={cinema.cinemaId} value={cinema.cinemaId}>
                    {cinema.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{editingRoom ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Rooms;
