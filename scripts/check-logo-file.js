const fs = require("fs");

// Check if logo.png exists and size
const stat = fs.statSync("public/images/logo.png");
console.log("logo.png size:", stat.size, "bytes");

const statOrig = fs.statSync("public/images/logo-original.png");
console.log("logo-original.png size:", statOrig.size, "bytes");

