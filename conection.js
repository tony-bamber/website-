// Connection.js

const fs = require('fs');
const path = require('path');

class Connection {
  constructor() {
    this.filePath = path.join(__dirname, 'storage.json');

  }

  readData() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);

  }

  }


module.exports = Connection;
