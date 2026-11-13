const http = require("http");

http.get("http://localhost:3001/de", (res) => {
  let data = "";
  res.on("data", (c) => (data += c));
  res.on("end", () => {
    const idx = data.indexOf("Deutsch");
    if (idx !== -1) {
      console.log("Port 3001 Found Deutsch at", idx);
      console.log(data.substring(idx - 200, idx + 200));
    } else {
      console.log("Port 3001 Deutsch not found");
    }
  });
}).on("error", (err) => {
  console.log("Port 3001 error:", err.message);
});

