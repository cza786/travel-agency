const fs = require("fs");

const imgPath = "C:/Users/SHAMA/.gemini/antigravity/brain/b97863d6-fd18-4f31-a364-612503846a3a/.user_uploaded/media_1794545523069_6e2408bb.png";
const buf = fs.readFileSync(imgPath);

const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log("Uploaded logo dimensions:", width, "x", height, "File size:", buf.length);

