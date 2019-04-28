const mongoService = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config');

const client = new mongoService(config.db.url, {
  useNewUrlParser: true
});

function insert(table, data, callback) {
  client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(config.db.name);
    db.collection(table).insertMany(data, function (err, result) {
      assert.equal(err, null);
      callback(result)
      client.close();
    });
  });
}

exports.menu = function (data) {
  insert('menu_58', data, function (result) {

  })
}