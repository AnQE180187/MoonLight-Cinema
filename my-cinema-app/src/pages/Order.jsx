import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Order.css";
import "../styles/table.css";

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const [orders, setOrders] = useState([
        
            {
                id: 1,
                customer: "John Doe",
                total: "$50.00",
                date: "2024-02-14",
                status: "Completed"
            },
            {
                id: 2,
                customer: "Jane Smith",
                total: "$75.50",
                date: "2024-02-15",
                status: "Pending"
            },
            {
                id: 3,
                customer: "Michael Johnson",
                total: "$120.00",
                date: "2024-02-16",
                status: "Completed"
            },
            {
                id: 4,
                customer: "Emily Davis",
                total: "$35.75",
                date: "2024-02-17",
                status: "Cancelled"
            },
            {
                id: 5,
                customer: "David Wilson",
                total: "$89.90",
                date: "2024-02-18",
                status: "Completed"
            },
            {
                id: 6,
                customer: "Sarah Brown",
                total: "$45.25",
                date: "2024-02-19",
                status: "Pending"
            },
            {
                id: 7,
                customer: "James Taylor",
                total: "$200.00",
                date: "2024-02-20",
                status: "Completed"
            },
            {
                id: 8,
                customer: "Olivia Martinez",
                total: "$55.00",
                date: "2024-02-21",
                status: "Processing"
            },
            {
                id: 9,
                customer: "William Anderson",
                total: "$99.99",
                date: "2024-02-22",
                status: "Completed"
            },
            {
                id: 10,
                customer: "Sophia Thomas",
                total: "$80.30",
                date: "2024-02-23",
                status: "Cancelled"
            },
            {
                id: 11,
                customer: "Daniel White",
                total: "$60.45",
                date: "2024-02-24",
                status: "Pending"
            }
        
        
    ]);

    const [formData, setFormData] = useState({
        id: "",
        customer: "",
        total: "",
        date: "",
        status: ""
    });

    const handleShowModal = (order = null) => {
        setEditingOrder(order);
        setFormData(order || { id: "", customer: "", total: "", date: "", status: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingOrder) {
            setOrders(orders.map((order) => (order.id === editingOrder.id ? { ...formData, id: editingOrder.id } : order)));
        } else {
            setOrders([...orders, { ...formData, id: orders.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setOrders(orders.filter((order) => order.id !== id));
    const filteredOrders = orders.filter(
        (order) =>
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(orders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "orders.xlsx");
    };

    return (
        <div className="orders-container">
            <h2 className="orders-title">Orders</h2>
            <div className="orders-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Customer, Status" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="orders-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Order
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
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.total}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(order)}>
                                    <Edit size={18} />
                                </Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(order.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="orders-pagination">
                {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingOrder ? "Edit Order" : "Add Order"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control type="text" name="customer" value={formData.customer} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total</Form.Label>
                            <Form.Control type="text" name="total" value={formData.total} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" value={formData.status} onChange={handleChange} required />
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

export default Orders;
