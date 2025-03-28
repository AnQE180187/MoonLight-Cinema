import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Customers.css";
import "../styles/table.css";

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            dob: "1990-01-01"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "987-654-3210",
            dob: "1995-05-15"
        },
        {
            id: 3,
            name: "Toro",
            email: "toro@example.com",
            phone: "258-741-9635",
            dob: "1988-02-02"
        },
        {
            id: 4,
            name: "Bob Brown",
            email: "bobbrown@example.com",
            phone: "456-789-0123",
            dob: "1994-04-04",
        },
        {
            id: 5,
            name: "Charlie Davis",
            email: "charliedavis@example.com",
            phone: "567-890-1234",
            dob: "1995-05-05",
        },
        {
            id: 6,
            name: "Florentino",
            email: "florentino@example.com",
            phone: "896-254-3258",
            dob: "1987-08-07",
        },
        {
            id: 7,
            name: "Yenna",
            email: "yenna@example.com",
            phone: "328-244-9772",
            dob: "1986-07-01",
        },
        {
            id: 8,
            name: "Tulen",
            email: "tulen@example.com",
            phone: "856-123-9875",
            dob: "1977-01-01",
        },
        {
            id: 9,
            name: "Hayate",
            email: "hayate@example.com",
            phone: "012-987-6547",
            dob: "1979-05-01",
        },
        {
            id: 10,
            name: "Raz",
            email: "raz@example.com",
            phone: "582-314-6879",
            dob: "1999-05-07",
        },






    ]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        dob: ""
    });

    const handleShowModal = (customer = null) => {
        setEditingCustomer(customer);
        setFormData(customer || { id: "", name: "", email: "", phone: "", dob: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingCustomer) {
            setCustomers(customers.map((customer) => (customer.id === editingCustomer.id ? { ...formData, id: editingCustomer.id } : customer)));
        } else {
            setCustomers([...customers, { ...formData, id: customers.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setCustomers(customers.filter((customer) => customer.id !== id));
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(customers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Customers");
        XLSX.writeFile(wb, "customers.xlsx");
    };

    return (
        <div className="customers-container">
            <h2 className="customers-title">Customers</h2>
            <div className="customers-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Name, Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="customers-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Customer
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
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.dob}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(customer)}>
                                    <Edit size={18} />
                                </Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(customer.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="customers-pagination">
                {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingCustomer ? "Edit Customer" : "Add Customer"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} />
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

export default Customers;