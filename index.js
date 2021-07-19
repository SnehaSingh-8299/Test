"use strict";
require("dotenv").config();
var path = require("path");

const express = require("express");
const fs = require("fs");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const connection = require("./common/connection");
const model = require('./models/index');
const responses = require("./common/responses");
const v1Routes = require("./v1/routes");
const socket = require('./socket/index');
let io = require('socket.io')(server, {cors: {origin: '*'},
origins: "*" , allowEIO3 : true });
socket(io);
const aws = require("aws-sdk");
const { Server } = require("http");
// aws.config.update({
//     secretAccessKey:'',
//     accessKeyId: ''
// });
// var s3 =new aws.s3();
app.use(cors());
app.use(responses());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", v1Routes);
app.use("/", express.static(__dirname + "/public"));

// 404, Not Found
app.use((req, res, next) => res.error(404, "NOT_FOUND"));

app.use(function(req, res ,next){
    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin','*')
    //Request message you wish to allow
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT , PATCH , DELETE');
     //Request message you wish to allow
     res.setHeader('Access-Control-Allow-Headers','Orifgin,X-Requested-With,content-type');
     //Set to true if you need the website to include cookies in the Requests sent
     //to the Api(e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials',true);
     //Pass to next layer of Middleware
     next();
});
// Error handling
app.use((error, req, res, next) => {
    console.error(error);
    return res.error(400, error.message || error);
});

// Listening & Initializing
server.listen(process.env.PORT, async () => {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`Running on:`, process.env.PORT);
    console.log('Start Socketinitialize');

// cronJob.startCronJobs().then(console.log("cronJob.startCronJobs();"));

    connection.mongodb();
});
