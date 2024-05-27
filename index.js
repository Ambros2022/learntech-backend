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
app.use('/', express.static(__dirname + '/storage'));
app.use('/storage', express.static(__dirname + '/storage'));

require('./app/routes/web.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);


app.get("/api", (req, res) => {
 res.json({ message: "Welcome to Learntechww.com v1" });
});

// Start the HTTP server
let portnumber = 5000;

var httpServer = http.createServer(app);
httpServer.listen(portnumber);

httpServer.on("listening", function () {
  console.log("ok, server is running on port: " + portnumber);
});
