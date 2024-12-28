const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const app = express();
const http = require("http");


app.use(cors());

// app.use(cors(corsOptions));
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
 res.json({ message: "Welcome to Learntechww.com v1.2811" });
});

// Start the HTTP server
let portnumber = 5000;

var httpServer = http.createServer(app);
httpServer.listen(portnumber);

httpServer.on("listening", function () {
  console.log("ok, server is running on port: " + portnumber);
});