const http = require("http");

http.get("http://localhost:3000/images/logo.png", (res) => {
  console.log("logo.png status:", res.statusCode, "type:", res.headers["content-type"], "length:", res.headers["content-length"]);
});

