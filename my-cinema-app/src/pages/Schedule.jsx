import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import "../styles/Schedule.css";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const schedules = [
    { id: 1001, movie: "Avengers: Endgame", room: "Room 1", start_time: "2024-02-15 14:00", end_time: "2024-02-15 16:30" },
    { id: 1002, movie: "Joker", room: "Room 2", start_time: "2024-02-16 18:00", end_time: "2024-02-16 20:30" },
    { id: 1003, movie: "Inception", room: "Room 3", start_time: "2024-02-17 20:00", end_time: "2024-02-17 22:30" },
  ];

  const handleShowModal = (schedule = null) => {
    setEditingSchedule(schedule);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingSchedule(null);
    setShowModal(false);
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Schedule</h2>

      {/* Search & Actions */}
      <div className="schedule-header">
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

        <div className="schedule-actions">
          <Button variant="danger" onClick={() => handleShowModal()}>
            <FilePlus size={18} className="me-2" />
            Add Schedule
          </Button>
          <Button variant="primary">
            <Download size={18} className="me-2" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table bordered hover responsive className="schedule-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie</th>
            <th>Room</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.movie}</td>
              <td>{schedule.room}</td>
              <td>{schedule.start_time}</td>
              <td>{schedule.end_time}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(schedule)}>
                  <Edit size={18} />
                </Button>
                <Button variant="outline-danger">
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="schedule-pagination">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      {/* Create/Edit Schedule Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingSchedule ? "Edit Schedule" : "Add Schedule"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Movie</Form.Label>
              <Form.Control type="text" placeholder="Enter movie name" defaultValue={editingSchedule?.movie || ""} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Control type="text" placeholder="Enter room name" defaultValue={editingSchedule?.room || ""} />
            </Form.Group>

            <div className="d-flex gap-3">
              <Form.Group className="mb-3 flex-fill">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="datetime-local" defaultValue={editingSchedule?.start_time || ""} />
              </Form.Group>

              <Form.Group className="mb-3 flex-fill">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="datetime-local" defaultValue={editingSchedule?.end_time || ""} />
              </Form.Group>
            </div>

            <Button variant="primary" className="w-100">
              {editingSchedule ? "Update Schedule" : "Create Schedule"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Schedule;
