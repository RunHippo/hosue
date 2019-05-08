const https = require('https');
const cheerio = require('cheerio');
const config = require('../config');
const iconv = require('iconv-lite');
const insertMenu = require('../db').insert.menu;
fetchData();

function fetchData() {
  https.get(config.url + '/ershoufang/0/', function (res) {
    let chunks = [];
    let size = 0;
    res.on('data', function (chunk) {
      chunks.push(chunk);
      size += chunk.length;
    });

    res.on('end', function () {
      var data = Buffer.concat(chunks, size);
      var html = iconv.decode(data, 'utf8').toString();
      loadHtml(html, function (data) {
        insertMenu(data);
      });
    });
  })
}

function loadHtml(html, callback) {
  const $ = cheerio.load(html);
  const arr = [];
  $('#qySelectFirst a').each(function (item, index) {
    const obj = {};
    const href = $(this).attr('href');
    obj.name = $(this).text();
    obj.href = href;
    obj.keyword = href.match(/^\/(\w*?)\//)[1];
    arr.push(obj);
  })
  callback(arr);
}