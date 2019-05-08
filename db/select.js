const mongoService = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../config');

const client = new mongoService(config.db.url, {
  useNewUrlParser: true
});

function select(table, options = {}, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(config.db.name);

    db.collection(table).find(options).toArray(function (err, docs) {
      assert.equal(null, err);
      callback(docs);
      client.close();
    })
  });
}

exports.menu = function (callback) {
  select('menu_58', function (docs) {
    callback(docs);
  })
}