const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const http = require("http");

const app = express();
const portnumber = 5000;

// ✅ CORS configuration
const allowedOrigins = [
  "http://preprod.keralastudy.com",
  "https://learntechww.com",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Body parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ File upload middleware
app.use(fileUpload({
  limits: { fileSize: 100 * 1024 * 1024 },
  createParentPath: true,
}));

// ✅ Static file serving
app.use('/', express.static(path.join(__dirname, '/storage')));
app.use('/storage', express.static(path.join(__dirname, '/storage')));

// ✅ Routes
require('./app/routes/web.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);

// ✅ Test route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Learntechww.com v1.2811" });
});

// ✅ Start server
const httpServer = http.createServer(app);
httpServer.listen(portnumber, () => {
  console.log("✅ Server running on port:", portnumber);
});
