import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import "../styles/Cinema.css";
import "../styles/table.css";

const Cinema = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCinema, setEditingCinema] = useState(null);
  const [cinemas, setCinemas] = useState([
    { id: 5001, name: "CGV", address: "19 Tô Hiến Thành, Hà Nội", phone: "024-3974-6567", rooms: 3 },
    { id: 5002, name: "MoonLight", address: "229 Tây Sơn, Hà Nội", phone: "024-5264-6547", rooms: 9 }
  ]);
  const [formData, setFormData] = useState({ id: "", name: "", address: "", phone: "", rooms: "" });

  // Mở Modal Add/Edit
  const handleShowModal = (cinema = null) => {
    setEditingCinema(cinema);
    setFormData(cinema || { id: "", name: "", address: "", phone: "", rooms: "" });
    setShowModal(true);
  };

  // Đóng Modal
  const handleCloseModal = () => setShowModal(false);

  // Xử lý nhập liệu
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Lưu dữ liệu (Thêm/Sửa)
  const handleSave = () => {
    if (editingCinema) {
      // Sửa rạp
      setCinemas(cinemas.map((cinema) => (cinema.id === editingCinema.id ? { ...formData, id: editingCinema.id } : cinema)));
    } else {
      // Thêm rạp mới
      setCinemas([...cinemas, { ...formData, id: cinemas.length + 5001 }]);
    }
    handleCloseModal();
  };

  // Xóa rạp
  const handleDelete = (id) => setCinemas(cinemas.filter((cinema) => cinema.id !== id));

  return (
    <div className="cinema-container">
      <h2 className="cinema-title">Cinema</h2>

      {/* Search & Filter */}
      <div className="cinema-header">
        <InputGroup className="search-bar">
          <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button variant="outline-secondary">
            <Search size={18} />
          </Button>
        </InputGroup>

        <div className="cinema-actions">
          <Button variant="danger" onClick={() => handleShowModal()}>
            <FilePlus size={18} className="me-2" />
            Add Cinema
          </Button>
          <Button variant="primary">
            <Download size={18} className="me-2" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table bordered hover responsive className="table">
        <thead>
          <tr>
            <th>CINEMA ID</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>PHONE NUMBER</th>
            <th>NUMBER OF ROOMS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {cinemas.map((cinema) => (
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
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      {/* Modal Add/Edit Cinema */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCinema ? "Edit Cinema" : "Add Cinema"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control type="number" name="rooms" value={formData.rooms} onChange={handleChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cinema;
