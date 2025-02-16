import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Edit, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Cinema.css";

const Cinema = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cinemas, setCinemas] = useState([
    { id: 1, name: "Galaxy Cinema", address: "123 Main St", phone: "0123456789", rooms: 5 },
    { id: 2, name: "Lotte Cinema", address: "456 Central Ave", phone: "0987654321", rooms: 7 },
    { id: 3, name: "CGV Cinemas", address: "789 Broadway", phone: "0112233445", rooms: 6 },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCinema, setEditingCinema] = useState(null);
  const [newCinema, setNewCinema] = useState({ name: "", address: "", phone: "", rooms: "" });
  const cinemasPerPage = 10;

  const filteredCinemas = cinemas.filter(
    (cinema) =>
      cinema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cinema.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cinema.phone.includes(searchTerm)
  );

  const indexOfLastCinema = currentPage * cinemasPerPage;
  const indexOfFirstCinema = indexOfLastCinema - cinemasPerPage;
  const currentCinemas = filteredCinemas.slice(indexOfFirstCinema, indexOfLastCinema);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cinemas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cinemas");
    XLSX.writeFile(wb, "cinemas.xlsx");
  };

  const handleShowModal = (cinema = null) => {
    setEditingCinema(cinema);
    setNewCinema(cinema ? { ...cinema } : { name: "", address: "", phone: "", rooms: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingCinema) {
      setCinemas(cinemas.map((cinema) => (cinema.id === editingCinema.id ? newCinema : cinema)));
    } else {
      setCinemas([...cinemas, { ...newCinema, id: cinemas.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCinemas(cinemas.filter((cinema) => cinema.id !== id));
  };

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
            <tr key={cinema.id}>
              <td>{cinema.id}</td>
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

      {/* Pagination */}
      <Pagination className="cinema-pagination">
        {Array.from({ length: Math.ceil(filteredCinemas.length / cinemasPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
            <Form.Group className="mb-3">
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control
                type="number"
                value={newCinema.rooms}
                onChange={(e) => setNewCinema({ ...newCinema, rooms: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cinema;
