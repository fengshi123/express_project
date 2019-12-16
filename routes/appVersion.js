var express = require('express');
var router = express.Router();

var appVersionDao = require('../dao/appVersionDao.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 上传 app
router.post('/upload', function (req, res, next) {
  appVersionDao.upload(req, res, next);
});
// 增加 app
router.post('/add', function (req, res, next) {
  appVersionDao.add(req, res, next);
});

router.get('/queryAll', function (req, res, next) {
  appVersionDao.queryAll(req, res, next);
});

router.post('/delete', function (req, res, next) {
  appVersionDao.delete(req, res, next);
});

router.post('/get', function (req, res, next) {
  appVersionDao.query(req, res, next);
});

router.get('/download', function (req, res, next) {
  appVersionDao.download(req, res, next);
});

module.exports = router;
