const ResultStatus = require("./result_status");
const Model = require("./abstract/model");

class Result extends Model {
  resultId = 0;
  status = ResultStatus.pending;
  data = {};

  executionId = 0;
  targetId = 0;

  constructor(status, data, executionId, targetId) {
    super();
    this.status = status;
    this.data = data;
    this.executionId = executionId;
    this.targetId = targetId;

    this.resultId = Result.db.getResultsSize();
  }

  save() {
    Result.db.saveResult(this);
  }

  static getAll() {
    return this.db.getAllResults();
  }

  static getOneById(id) {
    return this.db.getOneResultById(id);
  }

  static selectForTarget(targetId) {
    return this.db.selectResultsForTarget(targetId);
  }
}

module.exports = Result;
