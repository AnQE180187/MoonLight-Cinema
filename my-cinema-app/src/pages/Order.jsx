import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import "../styles/Order.css";
import "../styles/table.css";

const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([
    { id: 1001, customer: "John Doe", date: "2024-02-10", total: 120.5, status: "Completed" },
    { id: 1002, customer: "Jane Smith", date: "2024-02-11", total: 75.0, status: "Pending" },
    { id: 1003, customer: "Robert Brown", date: "2024-02-12", total: 200.0, status: "Cancelled" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingOrder.id) {
      setOrders(orders.map(order => (order.id === editingOrder.id ? editingOrder : order)));
    } else {
      setOrders([...orders, { ...editingOrder, id: orders.length + 1 }]);
    }
    setShowModal(false);
    setEditingOrder(null);
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Orders</h2>

      {/* Search & Filter */}
      <div className="order-header">
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

        <div className="order-actions">
          <Button variant="danger" onClick={() => { setEditingOrder({}); setShowModal(true); }}>
            <FilePlus size={18} className="me-2" />
            Add Order
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
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>DATE</th>
            <th>TOTAL AMOUNT</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleEdit(order)}>
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

      {/* Pagination */}
      <Pagination className="order-pagination">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      {/* Modal for Add/Edit Order */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingOrder?.id ? "Edit Order" : "Add Order"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                value={editingOrder?.customer || ""}
                onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editingOrder?.date || ""}
                onChange={(e) => setEditingOrder({ ...editingOrder, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                value={editingOrder?.total || ""}
                onChange={(e) => setEditingOrder({ ...editingOrder, total: parseFloat(e.target.value) || 0 })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editingOrder?.status || ""}
                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
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

export default Order;
