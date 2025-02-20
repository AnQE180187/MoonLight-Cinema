import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Ticket.css";
import "../styles/table.css";
import "../styles/Modal.css";

const Ticket = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;

    const [tickets, setTickets] = useState([
        
            {
                id: 1,
                movie: "Avengers: Endgame",
                cinema: "Cinema A",
                room: "Room 1",
                seat: "A1",
                price: "$10"
            },
            {
                id: 2,
                movie: "Inception",
                cinema: "Cinema B",
                room: "Room 3",
                seat: "B5",
                price: "$12"
            },
            {
                id: 3,
                movie: "Interstellar",
                cinema: "Cinema A",
                room: "Room 2",
                seat: "C3",
                price: "$15"
            },
            {
                id: 4,
                movie: "Joker",
                cinema: "Cinema C",
                room: "Room 5",
                seat: "D7",
                price: "$10"
            },
            {
                id: 5,
                movie: "The Dark Knight",
                cinema: "Cinema B",
                room: "Room 1",
                seat: "E2",
                price: "$14"
            },
            {
                id: 6,
                movie: "Spider-Man: No Way Home",
                cinema: "Cinema A",
                room: "Room 4",
                seat: "F6",
                price: "$11"
            },
            {
                id: 7,
                movie: "Titanic",
                cinema: "Cinema C",
                room: "Room 2",
                seat: "G8",
                price: "$9"
            },
            {
                id: 8,
                movie: "The Matrix",
                cinema: "Cinema B",
                room: "Room 3",
                seat: "H4",
                price: "$13"
            },
            {
                id: 9,
                movie: "Dune: Part Two",
                cinema: "Cinema A",
                room: "Room 1",
                seat: "I9",
                price: "$16"
            },
            {
                id: 10,
                movie: "The Godfather",
                cinema: "Cinema C",
                room: "Room 5",
                seat: "J3",
                price: "$18"
            },
            {
                id: 11,
                movie: "Parasite",
                cinema: "Cinema B",
                room: "Room 4",
                seat: "K5",
                price: "$12"
            }
        
        
    ]);

    const [formData, setFormData] = useState({
        id: "",
        movie: "",
        cinema: "",
        room: "",
        seat: "",
        price: ""
    });

    const handleShowModal = (ticket = null) => {
        setEditingTicket(ticket);
        setFormData(ticket || { id: "", movie: "", cinema: "", room: "", seat: "", price: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingTicket) {
            setTickets(tickets.map((ticket) => (ticket.id === editingTicket.id ? { ...formData, id: editingTicket.id } : ticket)));
        } else {
            setTickets([...tickets, { ...formData, id: tickets.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setTickets(tickets.filter((ticket) => ticket.id !== id));
    const filteredTickets = tickets.filter(
        (ticket) =>
            ticket.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.cinema.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.seat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(tickets);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tickets");
        XLSX.writeFile(wb, "tickets.xlsx");
    };

    return (
        <div className="ticket-container">
            <h2 className="ticket-title">Tickets</h2>
            <div className="ticket-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Movie, Cinema, Room, Seat" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="ticket-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Ticket
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
                        <th>Seat</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.movie}</td>
                            <td>{ticket.cinema}</td>
                            <td>{ticket.room}</td>
                            <td>{ticket.seat}</td>
                            <td>{ticket.price}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(ticket)}>
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
            <Pagination className="ticket-pagination">
                {Array.from({ length: Math.ceil(filteredTickets.length / ticketsPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTicket ? "Edit Ticket" : "Add Ticket"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Movie</Form.Label>
                            <Form.Control type="text" name="movie" value={formData.movie} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cinema</Form.Label>
                            <Form.Control type="text" name="cinema" value={formData.cinema} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Room</Form.Label>
                            <Form.Control type="text" name="room" value={formData.room} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Seat</Form.Label>
                            <Form.Control type="text" name="seat" value={formData.seat} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Ticket;
