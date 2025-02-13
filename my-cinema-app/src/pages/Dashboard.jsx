import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Carousel from "react-bootstrap/Carousel";
import "../styles/Dashboard.css";

// Màu sắc cho PieChart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Dữ liệu thống kê số vé bán theo phim
const pieData = [
  { name: "Movie 1", value: 32 },
  { name: "Movie 2", value: 25 },
  { name: "Movie 3", value: 18 },
  { name: "Movie 4", value: 25 },
];

// Dữ liệu biểu đồ số vé bán theo ngày
const lineData = [
  { date: "07/02", sales: 400 },
  { date: "08/02", sales: 450 },
  { date: "09/02", sales: 420 },
  { date: "10/02", sales: 500 },
  { date: "11/02", sales: 530 },
];

function Dashboard() {
  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Carousel Banner */}
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <img className="d-block w-100" src="PosterPhim\Poster_Nhà Bà Nữ.jpg" alt="Banner 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="PosterPhim\Poster_Lật Mặt 7.jpg" alt="Banner 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="PosterPhim\Poster_Quỷ Ăn Tạng.jpg" alt="Banner 33" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="PosterPhim\Poster_Nụ Hôn Bạc Tỷ.jpg" alt="Banner 4" />
        </Carousel.Item>
      </Carousel>
      {/* Thống kê vé bán */}
      <Row className="mt-4">
        {/* Pie Chart */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Ticket Sold Per Movie</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Line Chart */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Ticket Sold</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tổng vé bán */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm p-3">
            <h5>Total Ticket Sold</h5>
            <Row>
              <Col md={4}>
                <Card className="p-3 text-center">
                  <h3>150</h3>
                  <p>DAY</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3 text-center bg-success text-white">
                  <h3>5000</h3>
                  <p>MONTH</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3 text-center bg-danger text-white">
                  <h3>48000</h3>
                  <p>YEAR</p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Doanh thu */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm p-3">
            <h5>Revenue</h5>
            <Row>
              <Col md={4}>
                <Card className="p-3 text-center">
                  <h3>150</h3>
                  <p>DAY</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3 text-center bg-success text-white">
                  <h3>5000</h3>
                  <p>MONTH</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3 text-center bg-danger text-white">
                  <h3>48000</h3>
                  <p>YEAR</p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
