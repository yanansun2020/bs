const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const Connections = require("./models/connections");
const Result = require("./models/result");

const app = express();
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer);

/*
  Apply body parser
 */
app.use(bodyParser());

/*
 Apply statics
 */
app.use(express.static(__dirname + "/public"));

/*
 Apply views
 */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

/*
 Apply routers
 */
const router = require("./routers");
app.use(router);

/*
  SocketIO event handlers
 */
io.on("connection", socket => {
  const targetId = socket.handshake.query.targetId;
  console.log(`Connection from ${targetId}`);
  Connections.addConnection(targetId, socket);

  socket.on("execution finish", message => {
    console.log("Execution finished event received");
    console.log(message);
    console.log(message.result.data);

    const result = new Result(
      message.result.status,
      message.result.data,
      message.executionId,
      message.targetId
    );

    result.save();
  });
});

io.on("disconnect", socket => {
  console.log(`Disconnect from ${socket.id}`);
  Connections.removeConnection(socket);
});

module.exports = { app, httpServer };
