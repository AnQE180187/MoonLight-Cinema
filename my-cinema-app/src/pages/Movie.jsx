import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import { Search, FilePlus, Download, Trash2, Trash, Edit, PlayCircle } from "lucide-react";
import * as XLSX from "xlsx";
import "../styles/Movie.css";
import "../styles/table.css";

const Movie = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;

    const [movies, setMovies] = useState([
        {
            id: 1,
            name: "Avengers: Endgame",
            genre: "Action",
            director: "Russo Brothers",
            start_date: "2019-04-26",
            end_date: "2019-07-01",
            poster: "https://th.bing.com/th/id/OIP.WVWesbet0E70HmkG7weOjQHaKC?w=202&h=275&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            trailer: "https://www.youtube.com/embed/TcMBFSGVi1c"
        },
        {
            id: 2,
            name: "Interstellar",
            genre: "Sci-Fi",
            director: "Christopher Nolan",
            start_date: "2014-11-07",
            end_date: "2015-01-01",
            poster: "https://th.bing.com/th/id/OIP.pSGeyWEjeygmC6TjZWadWwHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
        }
    ]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        genre: "",
        director: "",
        start_date: "",
        end_date: "",
        poster: "",
        trailer: ""
    });

    // Mở Modal Add/Edit
    const handleShowModal = (movie = null) => {
        setEditingMovie(movie);
        setFormData(movie || { id: "", name: "", genre: "", director: "", start_date: "", end_date: "", poster: "", trailer: "" });
        setShowModal(true);
    };

    // Đóng Modal
    const handleCloseModal = () => setShowModal(false);

    // Xử lý nhập liệu
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Lưu dữ liệu (Thêm/Sửa)
    const handleSave = () => {
        if (editingMovie) {
            setMovies(movies.map((movie) => (movie.id === editingMovie.id ? { ...formData, id: editingMovie.id } : movie)));
        } else {
            setMovies([...movies, { ...formData, id: movies.length + 1001 }]);
        }
        handleCloseModal();
    };

    // Xóa phim
    const handleDelete = (id) => setMovies(movies.filter((movie) => movie.id !== id));

    // Mở Trailer
    const handleShowTrailer = (url) => {
        setTrailerUrl(url);
        setShowTrailer(true);
    };
    const filteredMovies = movies.filter(
        (movie) =>
            movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(movies);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Movies");
        XLSX.writeFile(wb, "movies.xlsx");
    };

    return (
        <div className="movie-container">
            <h2 className="movie-title">Movies</h2>

            {/* Search & Filter */}
            <div className="movie-header">
            <InputGroup className="search-bar">
                    <Form.Control type="text" placeholder="Search by Name, Genre, Director" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="outline-secondary">
                        <Search size={18} />
                    </Button>
                </InputGroup>

                <div className="movie-actions">
                    <Button variant="success" onClick={() => handleShowModal()}>
                        <FilePlus size={18} className="me-2" /> Add Movie
                    </Button>
                    <Button variant="primary" onClick={exportToExcel}>
                        <Download size={18} className="me-2" /> Export to Excel
                    </Button>
                </div>
            </div>

            {/* Table */}
            <Table bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Poster</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Director</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Trailer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>
                                <img src={movie.poster} alt={movie.name} className="movie-poster" />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.director}</td>
                            <td>{movie.start_date}</td>
                            <td>{movie.end_date}</td>
                            <td>
                                <Button variant="outline-info" onClick={() => handleShowTrailer(movie.trailer)}>
                                    <PlayCircle size={18} />
                                </Button>
                            </td>
                            <td>
                                <Button variant="outline-secondary" className="me-2" onClick={() => handleShowModal(movie)}>
                                    <Edit size={18} />
                                </Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(movie.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className="movie-pagination">
        {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

            {/* Modal Add/Edit Movie */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingMovie ? "Edit Movie" : "Add Movie"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Director</Form.Label>
                            <Form.Control type="text" name="director" value={formData.director} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Poster URL</Form.Label>
                            <Form.Control type="text" name="poster" value={formData.poster} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Trailer URL</Form.Label>
                            <Form.Control type="text" name="trailer" value={formData.trailer} onChange={handleChange} required />
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

            {/* Modal Trailer */}
            <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg">
                <Modal.Body>
                    <iframe width="100%" height="400" src={trailerUrl} title="Trailer" frameBorder="0" allowFullScreen></iframe>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Movie;
