import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Trash2, Edit, Download } from "lucide-react";
import "../styles/Product.css";
import "../styles/table.css";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Popcorn", price: 5.99, stock: 100 },
    { id: 2, name: "Soda", price: 3.49, stock: 50 },
    { id: 3, name: "Nachos", price: 4.99, stock: 30 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingProduct?.name || editingProduct?.price <= 0 || editingProduct?.stock < 0) {
      alert("Please enter valid product details.");
      return;
    }

    if (editingProduct.id) {
      setProducts(products.map(p => (p.id === editingProduct.id ? editingProduct : p)));
    } else {
      const newProduct = { ...editingProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }

    setShowModal(false);
    setEditingProduct(null);
  };


  return (
    <div className="product-container">
      <h2 className="product-title">Products</h2>

      {/* Search & Add & Export */}
      <div className="product-header">
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

        <div className="product-actions">
          <Button variant="danger" onClick={() => { setEditingProduct({}); setShowModal(true); }}>
            <FilePlus size={18} className="me-2" />
            Add Product
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
            <th>ID</th>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleEdit(product)}>
                  <Edit size={18} />
                </Button>
                <Button variant="outline-danger" onClick={() => handleDelete(product.id)}>
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="product-pagination">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      {/* Modal for Add/Edit Product */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct?.id ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={editingProduct?.name || ""}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={editingProduct?.price || ""}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={editingProduct?.stock || ""}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
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

export default Product;
