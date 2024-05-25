const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const app = express();
const http = require("http");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://preprod.keralastudy.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://preprod.keralastudy.com",
    "http://bstudy.codepixelsoft.com",
    "http://localhost:3001",
    "http://preprod.bangalorestudy.com",
    "https://preprod.bangalorestudy.com",
    "https://bangalorestudy.com"
  ]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/api", (req, res) => {
 res.json({ message: "Welcome to Learntechww.comww1122" });
});

// Start the HTTP server
let portnumber = 5000;

var httpServer = http.createServer(app);
httpServer.listen(portnumber);

httpServer.on("listening", function () {
  console.log("ok, server is running on portq: " + portnumber);
});
