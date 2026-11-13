const http = require("http");

["service-airport.jpg", "service-excursions.jpg", "service-bikes.jpg", "service-taxi.jpg", "service-rental.jpg"].forEach(file => {
  http.get(`http://localhost:3000/images/${file}`, res => {
    console.log(file, "status:", res.statusCode, "length:", res.headers["content-length"]);
  });
});

