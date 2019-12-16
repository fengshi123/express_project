var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');
var common = require('../dao/common.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 上传文件
router.post('/upload', function (req, res, next) {
  common.upload(req, res, next);
});

// 增加用户
router.post('/addUser', function (req, res, next) {
  userDao.add(req, res, next);
});

router.get('/queryAll', function (req, res, next) {
  userDao.queryAll(req, res, next);
});

router.post('/deleteUser', function (req, res, next) {
  userDao.delete(req, res, next);
});

router.get('/query', function (req, res, next) {
  userDao.queryById(req, res, next);
});

router.get('/deleteUser', function (req, res, next) {
  userDao.delete(req, res, next);
});

router.post('/updateUser', function (req, res, next) {
  userDao.update(req, res, next);
});

module.exports = router;
