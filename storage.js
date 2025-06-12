class Storage {
  constructor() {
    this.data = [];
  }

  getAllstorage() {
    return this.data;
  }

  getOneStorage(id) {
    return this.data.find(item => item.id === id);
  }

  addNewStorage(item) {
    this.data.push(item);
  }
}

module.exports = Storage;
