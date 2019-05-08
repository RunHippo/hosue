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
      db.collection('list_58').updateMany({
        date: '今天'
      }, {
        $currentDate: {
          date: true
        }
      }, function (error, res) {
        assert.equal(error, null);
        client.close();
      });
      callback(result);
    });
  });
}

exports.menu = function (data) {
  insert('menu_58', data, function (result) {

  })
}
exports.list = function (data) {
  insert('list_58', data, function (result) {

  })
}