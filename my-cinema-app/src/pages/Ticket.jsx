import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import "../styles/Ticket.css";
import "../styles/table.css";

const Ticket = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([
    { id: 2001, schedule: "Movie A - Room 1", seat: "A1", price: 10.0, status: "Available" },
    { id: 2002, schedule: "Movie B - Room 2", seat: "B3", price: 12.5, status: "Booked" },
    { id: 2003, schedule: "Movie C - Room 1", seat: "C5", price: 15.0, status: "Cancelled" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const handleDelete = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingTicket.id) {
      setTickets(tickets.map(ticket => (ticket.id === editingTicket.id ? editingTicket : ticket)));
    } else {
      setTickets([...tickets, { ...editingTicket, id: tickets.length + 1 }]);
    }
    setShowModal(false);
    setEditingTicket(null);
  };

  return (
    <div className="ticket-container">
      <h2 className="ticket-title">Tickets</h2>

      {/* Search & Filter */}
      <div className="ticket-header">
        <InputGroup className="search-bar">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">
            <Search size={18} />
          </Button>
        </InputGroup>

        <div className="ticket-actions">
          <Button variant="danger" onClick={() => { setEditingTicket({}); setShowModal(true); }}>
            <FilePlus size={18} className="me-2" />
            Add Ticket
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
            <th>TICKET ID</th>
            <th>SCHEDULE</th>
            <th>SEAT</th>
            <th>PRICE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.schedule}</td>
              <td>{ticket.seat}</td>
              <td>${ticket.price.toFixed(2)}</td>
              <td>{ticket.status}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleEdit(ticket)}>
                  <Edit size={18} />
                </Button>
                <Button variant="outline-danger" onClick={() => handleDelete(ticket.id)}>
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="ticket-pagination">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      {/* Modal for Add/Edit Ticket */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTicket?.id ? "Edit Ticket" : "Add Ticket"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                type="text"
                value={editingTicket?.schedule || ""}
                onChange={(e) => setEditingTicket({ ...editingTicket, schedule: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Seat</Form.Label>
              <Form.Control
                type="text"
                value={editingTicket?.seat || ""}
                onChange={(e) => setEditingTicket({ ...editingTicket, seat: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editingTicket?.price || ""}
                onChange={(e) => setEditingTicket({ ...editingTicket, price: parseFloat(e.target.value) || 0 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editingTicket?.status || ""}
                onChange={(e) => setEditingTicket({ ...editingTicket, status: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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

export default Ticket;
