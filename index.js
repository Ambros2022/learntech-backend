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
  res.header('Access-Control-Allow-Origin', 'http://preprod.keralastudy.com/');
  // You can also set other CORS headers as needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



var corsOptions = {
  origin: ["http://localhost:3000","http://preprod.keralastudy.com/","http://bstudy.codepixelsoft.com","http://localhost:3001","http://preprod.bangalorestudy.com","https://preprod.bangalorestudy.com","https://bangalorestudy.com"]
};

app.use(cors(corsOptions));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Learntechww.comww1122" });
});

// creating the http server for development
let portnumber = 5000;

var httpServer = http.createServer(app);
httpServer.listen(portnumber);

httpServer.on("listening", function () {
  console.log("ok, server is runningqq: " + portnumber);
});


