import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Edit, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import { fetchCinemas, addCinema, updateCinema, deleteCinema } from "../services/api";
import "../styles/Cinema.css";
import "../styles/table.css";
const Cinema = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCinema, setEditingCinema] = useState(null);
  const [newCinema, setNewCinema] = useState({ name: "", address: "", phone: "", rooms: "" });
  const cinemasPerPage = 10;

  useEffect(() => {
    loadCinemas();
  }, []);

  const loadCinemas = async () => {
    const data = await fetchCinemas();
    setCinemas(data);
  };

  const handleShowModal = (cinema = null) => {
    setEditingCinema(cinema);
    setNewCinema(cinema ? { ...cinema } : { name: "", address: "", phone: "", rooms: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCinema(null);
  };

  const handleSave = async () => {
    const formattedCinema = {
        name: newCinema.name,
        address: newCinema.address,
        phone: newCinema.phone,
        rooms: parseInt(newCinema.rooms, 10), // Chuyển đổi rooms thành số nguyên
    };

    console.log("Formatted Cinema Data:", formattedCinema);

    try {
        let response;
        if (editingCinema) {
            response = await updateCinema(editingCinema.cinema_id || editingCinema.id, formattedCinema);
        } else {
            response = await addCinema(formattedCinema);
        }

        console.log("API Response:", response);
        loadCinemas();
        handleCloseModal();
    } catch (error) {
        console.error("Error saving cinema:", error);
        alert(`Error: ${JSON.stringify(error.response?.data || error.message)}`);
    }
};


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cinema?")) {
      await deleteCinema(id);
      loadCinemas();
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cinemas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cinemas");
    XLSX.writeFile(wb, "cinemas.xlsx");
  };

  const filteredCinemas = cinemas.filter(
    (cinema) =>
      cinema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cinema.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cinema.phone.includes(searchTerm)
  );

  const indexOfLastCinema = currentPage * cinemasPerPage;
  const indexOfFirstCinema = indexOfLastCinema - cinemasPerPage;
  const currentCinemas = filteredCinemas.slice(indexOfFirstCinema, indexOfLastCinema);

  return (
    <div className="cinema-container">
      <h2 className="cinema-title">Cinemas</h2>

      {/* Search & Actions */}
      <div className="cinema-header">
        <InputGroup className="search-bar">
          <Form.Control
            type="text"
            placeholder="Search by name, address or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">
            <Search size={18} />
          </Button>
        </InputGroup>
        <div className="cinema-actions">
          <Button variant="success" onClick={() => handleShowModal()}>
            <FilePlus size={18} className="me-2" />
            Add Cinema
          </Button>
          <Button variant="primary" onClick={exportToExcel} className="ms-2">
            <Download size={18} className="me-2" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table bordered hover responsive className="cinema-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Number of Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCinemas.map((cinema) => (
            <tr key={cinema.cinemaId}>
              <td>{cinema.cinemaId}</td>
              <td>{cinema.name}</td>
              <td>{cinema.address}</td>
              <td>{cinema.phone}</td>
              <td>{cinema.rooms}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(cinema)}>
                  <Edit size={18} />
                </Button>
                <Button variant="outline-danger" onClick={() => handleDelete(cinema.id)}>
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Add/Edit Cinema */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCinema ? "Edit Cinema" : "Add Cinema"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newCinema.name}
                onChange={(e) => setNewCinema({ ...newCinema, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={newCinema.address}
                onChange={(e) => setNewCinema({ ...newCinema, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={newCinema.phone}
                onChange={(e) => setNewCinema({ ...newCinema, phone: e.target.value })}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingCinema ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cinema;
