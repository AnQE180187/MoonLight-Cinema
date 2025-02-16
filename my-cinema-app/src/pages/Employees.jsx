import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Employees.css";
import "../styles/table.css";

const Employees = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;

    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice@example.com",
            phone: "123-456-7890",
            dob: "1985-07-24",
            role: "Manager"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob@example.com",
            phone: "987-654-3210",
            dob: "1990-03-12",
            role: "Staff"
        }
    ]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        dob: "",
        role: ""
    });

    const handleShowModal = (employee = null) => {
        setEditingEmployee(employee);
        setFormData(employee || { id: "", name: "", email: "", phone: "", dob: "", role: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingEmployee) {
            setEmployees(employees.map((employee) => (employee.id === editingEmployee.id ? { ...formData, id: editingEmployee.id } : employee)));
        } else {
            setEmployees([...employees, { ...formData, id: employees.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setEmployees(employees.filter((employee) => employee.id !== id));
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(employees);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employees");
        XLSX.writeFile(wb, "employees.xlsx");
    };

    return (
        <div className="employees-container">
            <h2 className="employees-title">Employees</h2>
            <div className="employees-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Name, Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="employees-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Employee
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
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.dob}</td>
                            <td>{employee.role}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(employee)}>
                                    <Edit size={18} />
                                </Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="employees-pagination">
                {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingEmployee ? "Edit Employee" : "Add Employee"}</Modal.Title>
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
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} />
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

export default Employees;
