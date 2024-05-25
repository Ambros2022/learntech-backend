const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const https = require("https");
const http = require("http");
const fs = require('fs');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.bangalorestudy.com');
  // You can also set other CORS headers as needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



var corsOptions = {
  origin: ["http://localhost:3000","https://www.keralastudy.com","http://bstudy.codepixelsoft.com","http://localhost:3001","http://preprod.bangalorestudy.com","https://preprod.bangalorestudy.com","https://bangalorestudy.com"]
};

app.use(cors(corsOptions));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// enable files upload

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true
}));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Learntechww.comww" });
});

app.use('/', express.static(__dirname + '/storage'));
app.use('/storage', express.static(__dirname + '/storage'));




// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);
// require('./app/routes/admin.routes')(app);
// require('./app/routes/web.routes')(app);

// creating the http server for development
let portnumber = 5000;

var httpServer = http.createServer(app);
httpServer.listen(portnumber);

httpServer.on("listening", function () {
  console.log("ok, server is runningqq: " + portnumber);
});



//this is for live server and secure connect +++++ https ++++

// set port, listen for requests
// const PORT = process.env.APP_PORT || 3000;

// // serve the API with signed certificate on 443 (SSL/HTTPS) port
// const httpsServer = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/api.bangalorestudy.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/api.bangalorestudy.com/fullchain.pem'),
// }, app);



// httpsServer.listen(3000, () => {
//     console.log('HTTPS Server running on port 443');
// });
/*
app.listen(PORT, () => {
  //logger.log('info', '--------------------------------------------------');
  console.log(`Server is running on port ${PORT}.`);
});*/


