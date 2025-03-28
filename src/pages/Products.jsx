import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Product.css";
import "../styles/table.css";
import "../styles/Modal.css";

const Product = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const [products, setProducts] = useState([
        
            {
                id: 1,
                name: "Popcorn",
                category: "Snacks",
                price: "$5",
                stock: "100"
            },
            {
                id: 2,
                name: "Coca-Cola",
                category: "Beverages",
                price: "$3",
                stock: "150"
            },
            {
                id: 3,
                name: "Nachos",
                category: "Snacks",
                price: "$6",
                stock: "80"
            },
            {
                id: 4,
                name: "Hot Dog",
                category: "Fast Food",
                price: "$7",
                stock: "50"
            },
            {
                id: 5,
                name: "Pepsi",
                category: "Beverages",
                price: "$3",
                stock: "140"
            },
            {
                id: 6,
                name: "Chocolate Bar",
                category: "Snacks",
                price: "$4",
                stock: "90"
            },
            {
                id: 7,
                name: "French Fries",
                category: "Fast Food",
                price: "$5",
                stock: "60"
            },
            {
                id: 8,
                name: "Sprite",
                category: "Beverages",
                price: "$3",
                stock: "130"
            },
            {
                id: 9,
                name: "Chicken Nuggets",
                category: "Fast Food",
                price: "$8",
                stock: "40"
            },
            {
                id: 10,
                name: "Water Bottle",
                category: "Beverages",
                price: "$2",
                stock: "200"
            },
            {
                id: 11,
                name: "Ice Cream",
                category: "Desserts",
                price: "$6",
                stock: "70"
            }
        
        
    ]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        stock: ""
    });

    const handleShowModal = (product = null) => {
        setEditingProduct(product);
        setFormData(product || { id: "", name: "", category: "", price: "", stock: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        if (editingProduct) {
            setProducts(products.map((product) => (product.id === editingProduct.id ? { ...formData, id: editingProduct.id } : product)));
        } else {
            setProducts([...products, { ...formData, id: products.length + 1 }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => setProducts(products.filter((product) => product.id !== id));
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "products.xlsx");
    };

    return (
        <div className="product-container">
            <h2 className="product-title">Products</h2>
            <div className="product-header">
                <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Name, Category" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>
                <div className="product-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Product
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
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(product)}>
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
            <Pagination className="product-pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
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
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="text" name="stock" value={formData.stock} onChange={handleChange} />
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

export default Product;