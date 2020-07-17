class FakeDB {
  static executions = [];
  static targets = [];
  static results = [];

  /* Execution */
  static getExecutionsSize() {
    return this.executions.length;
  }

  static saveExecution(execution) {
    this.executions.push(execution);
  }

  static getAllExecutions() {
    return this.executions;
  }

  static getOneExecutionById(id) {
    let selected = this.executions.filter(e => e.executionId === id);
    return selected.length === 0 ? null : selected[0];
  }

  static selectExecutionsForTarget(targetId) {
    return this.executions.filter(e => e.targetId === targetId);
  }

  /* Target */
  static getTargetsSize() {
    return this.targets.length;
  }

  static saveTarget(target) {
    this.targets.push(target);
    console.log("New target saved");
    console.log(this.targets);
  }

  static getAllTargets() {
    return this.targets;
  }

  static getOneTargetById(id) {
    console.log(this.targets);
    let selected = this.targets.filter(e => e.targetId === id);
    return selected.length === 0 ? null : selected[0];
  }

  /* Result */
  static getResultsSize() {
    return this.results.length;
  }

  static saveResult(result) {
    this.results.push(result);
  }

  static getAllResults() {
    return this.results;
  }

  static getOneResultById(id) {
    let selected = this.results.filter(e => e.resultId === id);
    return selected.length === 0 ? null : selected[0];
  }

  static selectResultsForTarget(targetId) {
    return this.results.filter(e => e.targetId === targetId);
  }
}

module.exports = FakeDB;
