const router = require("express").Router();
const Execution = require("../models/execution");
const Result = require("../models/result");
const Target = require("../models/target");
const Connections = require("../models/connections");

router.get("/", (req, res) => {
  res.render("index");
});

/* execution */
router.get("/executions", (req, res) => {
  if (typeof req.query.targetId !== "undefined") {
    res.send(Execution.selectForTarget(req.query.targetId));
  } else {
    res.send(Execution.getAll());
  }
});

router.get("/executions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.send(Execution.getOneById(id));
});

router.post("/executions", (req, res) => {
  const { payload, targetId } = req.body;
  const result = new Execution(payload, targetId);
  result.save();

  const connection = Connections.getConnection(targetId);
  if (connection) {
    console.log(`Found connections for ${targetId}`);
    console.log("sending payload..");
    connection.emit("execute", result);
  }

  res.send(result);
});

/* target */
router.get("/targets", (req, res) => {
  res.send(Target.getAll());
});

router.get("/targets/:id", (req, res) => {
  const id = req.params.id;
  res.send(Target.getOneById(id));
});

router.post("/targets", (req, res) => {
  const { targetId, profile } = req.body;
  const result = new Target(targetId, profile);
  result.save();
  res.send(result);
});

/* result */
router.get("/results", (req, res) => {
  if (typeof req.query.targetId !== "undefined") {
    res.send(Result.selectForTarget(req.query.targetId));
  } else {
    res.send(Result.getAll());
  }
});

router.get("/results/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.send(Result.getOneById(id));
});

router.post("/results", (req, res) => {
  const { status, data, executionId, targetId } = req.body;
  const result = new Result(status, data, executionId, targetId);
  result.save();
  res.send(result);
});

module.exports = router;
