// Load Header
function loadHeader() {
    document.getElementById("header").innerHTML = `
        <header class="header">
            <h2>MoonLight - Cinema Management</h2>
        </header>
    `;
}

// Load Navbar
function loadNavbar() {
    document.getElementById("navbar").innerHTML = `
        <nav class="sidebar">
            <h2>MoonLight</h2>
            <ul>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="cinema.html">Cinema</a></li>
                <li><a href="movie.html">Movie</a></li>
                <li><a href="room.html">Room</a></li>
                <li><a href="schedule.html">Schedule</a></li>
                <li><a href="ticket.html">Ticket</a></li>
                <li><a href="product.html">Product</a></li>
                <li><a href="order.html">Order</a></li>
                <li><a href="employee.html">Employee</a></li>
            </ul>
        </nav>
    `;
}

// Gọi hàm khi trang load
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("navbar").innerHTML = `
        <nav class="sidebar">
            <h2>MoonLight</h2>
            <ul>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="cinema.html">Cinema</a></li>
                <li><a href="movie.html">Movie</a></li>
                <li><a href="room.html">Room</a></li>
                <li><a href="schedule.html">Schedule</a></li>
                <li><a href="ticket.html">Ticket</a></li>
                <li><a href="product.html">Product</a></li>
                <li><a href="order.html">Order</a></li>
                <li><a href="employee.html">Employee</a></li>
            </ul>
        </nav>
    `;
});

