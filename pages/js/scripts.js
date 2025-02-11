// Ticket Sold Per Movie (Pie Chart)
var ctx1 = document.getElementById('ticketSoldPerMovie').getContext('2d');
var ticketSoldPerMovieChart = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4'],
        datasets: [{
            data: [25, 25, 18, 32],
            backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#1abc9c']
        }]
    }
});

// Ticket Sold (Line Chart)
var ctx2 = document.getElementById('ticketSold').getContext('2d');
var ticketSoldChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022'],
        datasets: [{
            label: 'Tickets Sold',
            data: [5, 7, 9, 10, 8, 6],
            borderColor: '#2980b9',
            fill: false
        }]
    }
});
