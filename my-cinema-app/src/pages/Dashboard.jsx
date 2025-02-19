import React from "react";
import { Card, Row, Col, Container, Button, Table} from "react-bootstrap";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Carousel from "react-bootstrap/Carousel";
import { PeopleFill, Film, TicketPerforatedFill, CurrencyDollar } from 'react-bootstrap-icons';
import "../styles/Dashboard.css";



function Dashboard() {
  const revenueData = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 7000 },
    { month: 'Mar', revenue: 8000 },
    { month: 'Apr', revenue: 6500 },
    { month: 'May', revenue: 9000 },
    { month: 'Jun', revenue: 11000 },
  ];
  const ticketSalesData = [
    { day: 'Mon', tickets: 150 },
    { day: 'Tue', tickets: 200 },
    { day: 'Wed', tickets: 180 },
    { day: 'Thu', tickets: 220 },
    { day: 'Fri', tickets: 300 },
    { day: 'Sat', tickets: 400 },
    { day: 'Sun', tickets: 350 },
  ];
  const bookings = [
    { user: 'John Doe', movie: 'Avatar 2', seats: 3, amount: '$45' },
    { user: 'Jane Smith', movie: 'Oppenheimer', seats: 2, amount: '$30' },
    { user: 'Michael Brown', movie: 'Spider-Man: No Way Home', seats: 4, amount: '$60' },
  ];
  const posters = [
    'PosterPhim/Poster_Nhà Bà Nữ.jpg',
    'PosterPhim/Poster_Lật Mặt 7.jpg',
    'PosterPhim/Poster_Mai.jpg',
    'PosterPhim/Poster_Nụ Hôn Bạc Tỷ.jpg',
    'PosterPhim/Poster_Quỷ Cẩu.jpg',
  ];
    
  return (
    <div className="container mt-4">
      {/* Movie Posters Carousel */}
      <Carousel className="mb-4">
        {posters.map((poster, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={poster} alt={`Poster ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="row">
        {/* Dashboard Summary Cards */}
        <div className="col-md-3">
          <Card className="text-center p-3">
            <Card.Title>Total Users</Card.Title>
            <PeopleFill size={24} />
            <Card.Text className="fs-3 fw-bold">1,245</Card.Text>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center p-3">
            <Card.Title>Total Movies</Card.Title>
            <Film size={24} />
            <Card.Text className="fs-3 fw-bold">78</Card.Text>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center p-3">
            <Card.Title>Tickets Sold</Card.Title>
            <TicketPerforatedFill size={24} />
            <Card.Text className="fs-3 fw-bold">5,678</Card.Text>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center p-3">
            <Card.Title>Total Revenue</Card.Title>
            <CurrencyDollar size={24} />
            <Card.Text className="fs-3 fw-bold">$45,780</Card.Text>
          </Card>
        </div>
      </div>

     {/* Movie Performance Charts */}
     <div className="row mt-4">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Revenue Trends</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Tickets Sold Per Day</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tickets" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Latest Bookings Table */}
      <div className="row mt-4">
        <div className="col-md-12">
          <Card>
            <Card.Body>
              <Card.Title>Recent Bookings</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Movie</th>
                    <th>Seats</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.user}</td>
                      <td>{booking.movie}</td>
                      <td>{booking.seats}</td>
                      <td>{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
