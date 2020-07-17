const Model = require("./abstract/model");

class Execution extends Model {
  executionId = 0;

  constructor(payload, targetId) {
    super();
    this.payload = payload;
    this.targetId = targetId;
    this.executionId = Execution.db.getExecutionsSize();
  }

  save() {
    Execution.db.saveExecution(this);
  }

  static getAll() {
    return this.db.getAllExecutions();
  }

  static getOneById(id) {
    return this.db.getOneExecutionById(id);
  }

  static selectForTarget(targetId) {
    return this.db.selectExecutionsForTarget(targetId);
  }
}

module.exports = Execution;
