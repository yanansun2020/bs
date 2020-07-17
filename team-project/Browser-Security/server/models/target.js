const Model = require("./abstract/model");
const Connections = require("../models/connections");

class Target extends Model {
  isOnline = false;
  profile = {};

  constructor(targetId, profile) {
    super();
    this.targetId = targetId;
    this.profile = profile;
  }

  save() {
    Target.db.saveTarget(this);
  }

  static getAll() {
    return this.db.getAllTargets().map(e => {
      e.isOnline = Connections.isOnline(e.targetId);
      return e;
    });
  }

  static getOneById(id) {
    const result = this.db.getOneTargetById(id);
    result.isOnline = Connections.isOnline(result.targetId);
    return result;
  }
}

module.exports = Target;
