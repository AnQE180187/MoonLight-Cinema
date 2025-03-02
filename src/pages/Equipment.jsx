import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Equipment.css";
import "../styles/table.css";
import "../styles/Modal.css";

const Equipment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const equipmentPerPage = 10;

    const [equipment, setEquipment] = useState([
        
            {
                id: 1,
                name: "Projector",
                category: "Audio/Visual",
                quantity: 5,
                status: "Available"
            },
            {
                id: 2,
                name: "Laptop",
                category: "Electronics",
                quantity: 10,
                status: "In Use"
            },
            {
                id: 3,
                name: "Whiteboard",
                category: "Office Supplies",
                quantity: 3,
                status: "Available"
            },
            {
                id: 4,
                name: "Microphone",
                category: "Audio/Visual",
                quantity: 8,
                status: "Under Maintenance"
            },
            {
                id: 5,
                name: "Conference Table",
                category: "Furniture",
                quantity: 2,
                status: "Available"
            },
            {
                id: 6,
                name: "Tablet",
                category: "Electronics",
                quantity: 15,
                status: "In Use"
            },
            {
                id: 7,
                name: "Office Chair",
                category: "Furniture",
                quantity: 20,
                status: "Available"
            },
            {
                id: 8,
                name: "Speaker",
                category: "Audio/Visual",
                quantity: 6,
                status: "Available"
            },
            {
                id: 9,
                name: "Desktop Computer",
                category: "Electronics",
                quantity: 12,
                status: "Under Maintenance"
            },
            {
                id: 10,
                name: "Printer",
                category: "Office Supplies",
                quantity: 4,
                status: "In Use"
            },
            {
                id: 11,
                name: "Webcam",
                category: "Electronics",
                quantity: 7,
                status: "Available"
            }
        
        
    ]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        quantity: "",
        status: ""
    });

    const handleShowModal = (item = null) => {
        setEditingEquipment(item);
        setFormData(item || { id: "", name: "", category: "", quantity: "", status: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingEquipment) {
            setEquipment(equipment.map((item) => (item.id === editingEquipment.id ? { ...formData, id: editingEquipment.id } : item)));
        } else {
            setEquipment([...equipment, { ...formData, id: equipment.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setEquipment(equipment.filter((item) => item.id !== id));
    const filteredEquipment = equipment.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * equipmentPerPage;
    const indexOfFirstItem = indexOfLastItem - equipmentPerPage;
    const currentEquipment = filteredEquipment.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(equipment);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Equipment");
        XLSX.writeFile(wb, "equipment.xlsx");
    };

    return (
        <div className="equipment-container">
            <h2 className="equipment-title">Equipment</h2>
            <div className="equipment-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Name, Category" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="equipment-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Equipment
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
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEquipment.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(item)}>
                                    <Edit size={18} />
                                </Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(item.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="equipment-pagination">
                {Array.from({ length: Math.ceil(filteredEquipment.length / equipmentPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingEquipment ? "Edit Equipment" : "Add Equipment"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" value={formData.status} onChange={handleChange} />
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

export default Equipment;
