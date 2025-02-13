import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import "../styles/Schedule.css";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schedules, setSchedules] = useState([
    { id: 1, movie: "Avengers: Endgame", room: "Room 1", startTime: "2024-02-15 14:00", endTime: "2024-02-15 16:30" },
    { id: 2, movie: "Inception", room: "Room 2", startTime: "2024-02-15 17:00", endTime: "2024-02-15 19:20" },
    { id: 3, movie: "The Dark Knight", room: "Room 3", startTime: "2024-02-15 20:00", endTime: "2024-02-15 22:30" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleDelete = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingSchedule?.movie || !editingSchedule?.room || !editingSchedule?.startTime || !editingSchedule?.endTime) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingSchedule.id) {
      setSchedules(schedules.map(s => (s.id === editingSchedule.id ? editingSchedule : s)));
    } else {
      const newSchedule = { ...editingSchedule, id: schedules.length + 1 };
      setSchedules([...schedules, newSchedule]);
    }

    setShowModal(false);
    setEditingSchedule(null);
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Schedules</h2>

      {/* Search & Add */}
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
        <div classname="schedule-action">
          <Button variant="danger" onClick={() => { setEditingSchedule({}); setShowModal(true); }}>
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
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleEdit(schedule)}>
                  <Edit size={18} />
                </Button>
                <Button variant="outline-danger" onClick={() => handleDelete(schedule.id)}>
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

      {/* Modal for Add/Edit Schedule */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingSchedule?.id ? "Edit Schedule" : "Add Schedule"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Movie</Form.Label>
              <Form.Control
                type="text"
                value={editingSchedule?.movie || ""}
                onChange={(e) => setEditingSchedule(prev => ({ ...prev, movie: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Control
                type="text"
                value={editingSchedule?.room || ""}
                onChange={(e) => setEditingSchedule(prev => ({ ...prev, room: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editingSchedule?.startTime || ""}
                onChange={(e) => setEditingSchedule(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editingSchedule?.endTime || ""}
                onChange={(e) => setEditingSchedule(prev => ({ ...prev, endTime: e.target.value }))}
              />
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

export default Schedule;
