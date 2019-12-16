var express = require('express');
var router = express.Router();

var systemInfoDao = require('../dao/systemInfoDao.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 增加 app
router.post('/edit', function (req, res, next) {
  systemInfoDao.edit(req, res, next);
});

router.get('/query', function (req, res, next) {
  systemInfoDao.query(req, res, next);
});

router.get('/queryAll', function (req, res, next) {
  systemInfoDao.queryAll(req, res, next);
});

module.exports = router;
