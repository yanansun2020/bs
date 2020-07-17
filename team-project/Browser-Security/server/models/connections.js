class Connections {
  connections = new Map();
  addConnection(targetId, socket) {
    this.connections.set(targetId, socket);
  }

  getConnection(targetId) {
    return this.connections.get(targetId);
  }

  removeConnection(socket) {
    const targetIds = Array.from(this.connections.keys()).filter(
      e => this.connections.get(e).id === socket.id
    );

    if (targetIds.length !== 0) {
      const id = targetIds[0];
      this.connections.delete(id);
    }
  }

  isOnline(targetId) {
    return !!this.connections.get(targetId);
  }
}

const singleton = new Connections();
module.exports = singleton;
