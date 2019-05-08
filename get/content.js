const https = require('https');
const cheerio = require('cheerio');
const config = require('../config');
const iconv = require('iconv-lite');
const selectMenu = require('../db').select.menu;
const insertList = require('../db').insert.list;
// https://app.58.com/map_fang/list/ershoufang?action=getHouseOnMapListInfoForPC&localname=cd&page=250
let menu = [];
let list = [];
const url = 'https://app.58.com/map_fang/list/ershoufang?action=getHouseOnMapListInfoForPC&localname=cd&page=';
let page = 1;

fetchData(page);

function fetchData(p) {
  https.get(url + p, function (res) {
    let chunks = [];
    let size = 0;
    res.on('data', function (chunk) {
      chunks.push(chunk);
      size += chunk.length;
    });

    res.on('end', function () {
      var data = Buffer.concat(chunks, size);
      var html = data.toString();
      loadJson(html, function (contentList) {
        list = list.concat(contentList);
        console.log(page);
        if (contentList.length > 0) {
          page++;
          fetchData(page);
        } else {
          insertList(list);
        }
      });
    });
  })
}

function loadJson(data, callback) {
  const matchStr = data.match(/^null\((.*)\)$/);
  try {
    const json = JSON.parse(matchStr[1]);
    const contentList = json.result.getHouseOnMapListInfoForPC.infolist;
    callback(contentList);
  } catch (error) {
    console.log(data);
  }
}