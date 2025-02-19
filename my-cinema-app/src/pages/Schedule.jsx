import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Schedule.css";
import "../styles/table.css";

const Schedule = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const schedulesPerPage = 10;

    const [schedules, setSchedules] = useState([
    
        {
            id: 1,
            movie: "Avengers: Endgame",
            cinema: "Cinema A",
            room: "Room 1",
            showtime: "2024-02-14 18:00"
        },
        {
            id: 2,
            movie: "Inception",
            cinema: "Cinema B",
            room: "Room 3",
            showtime: "2024-02-15 20:30"
        },
        {
            id: 3,
            movie: "Interstellar",
            cinema: "Cinema A",
            room: "Room 2",
            showtime: "2024-02-16 17:45"
        },
        {
            id: 4,
            movie: "Joker",
            cinema: "Cinema C",
            room: "Room 5",
            showtime: "2024-02-17 19:00"
        },
        {
            id: 5,
            movie: "The Dark Knight",
            cinema: "Cinema B",
            room: "Room 1",
            showtime: "2024-02-18 21:15"
        },
        {
            id: 6,
            movie: "Spider-Man: No Way Home",
            cinema: "Cinema A",
            room: "Room 4",
            showtime: "2024-02-19 16:30"
        },
        {
            id: 7,
            movie: "Titanic",
            cinema: "Cinema C",
            room: "Room 2",
            showtime: "2024-02-20 14:00"
        },
        {
            id: 8,
            movie: "The Matrix",
            cinema: "Cinema B",
            room: "Room 3",
            showtime: "2024-02-21 22:00"
        },
        {
            id: 9,
            movie: "Dune: Part Two",
            cinema: "Cinema A",
            room: "Room 1",
            showtime: "2024-02-22 18:45"
        },
        {
            id: 10,
            movie: "The Godfather",
            cinema: "Cinema C",
            room: "Room 5",
            showtime: "2024-02-23 20:00"
        },
        {
            id: 11,
            movie: "Parasite",
            cinema: "Cinema B",
            room: "Room 4",
            showtime: "2024-02-24 19:30"
        }
    
    
    ]);

    const [formData, setFormData] = useState({
        id: "",
        movie: "",
        cinema: "",
        room: "",
        showtime: ""
    });

    const handleShowModal = (schedule = null) => {
        setEditingSchedule(schedule);
        setFormData(schedule || { id: "", movie: "", cinema: "", room: "", showtime: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingSchedule) {
            setSchedules(schedules.map((schedule) => (schedule.id === editingSchedule.id ? { ...formData, id: editingSchedule.id } : schedule)));
        } else {
            setSchedules([...schedules, { ...formData, id: schedules.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setSchedules(schedules.filter((schedule) => schedule.id !== id));
    const filteredSchedules = schedules.filter(
        (schedule) =>
            schedule.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.cinema.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const currentSchedules = filteredSchedules.slice(indexOfFirstSchedule, indexOfLastSchedule);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(schedules);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Schedules");
        XLSX.writeFile(wb, "schedules.xlsx");
    };

    return (
        <div className="schedule-container">
            <h2 className="schedule-title">Schedules</h2>
            <div className="schedule-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Movie, Cinema, room" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="schedule-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Schedule
                    </Button>
                    <Button variant="primary" onClick={exportToExcel}>
                        <Download size={18} className="me-2" /> Export to Excel
                    </Button>
                </div>
            </div>
            <Table bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Movie</th>
                        <th>Cinema</th>
                        <th>Room</th>
                        <th>Showtime</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSchedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td>{schedule.id}</td>
                            <td>{schedule.movie}</td>
                            <td>{schedule.cinema}</td>
                            <td>{schedule.room}</td>
                            <td>{schedule.showtime}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(schedule)}>
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
            <Pagination className="schedule-pagination">
                {Array.from({ length: Math.ceil(filteredSchedules.length / schedulesPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
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
