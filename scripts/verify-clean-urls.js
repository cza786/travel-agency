const http = require("http");

const files = [
  "clean-hero-van.jpg",
  "clean-airport.jpg",
  "clean-excursions.jpg",
  "clean-bikes.jpg",
  "clean-taxi.jpg",
  "clean-rental.jpg",
  "logo.png"
];

files.forEach((f) => {
  http.get(`http://localhost:3000/images/${f}`, (res) => {
    console.log(f, "Status:", res.statusCode, "Size:", res.headers["content-length"]);
  });
});
