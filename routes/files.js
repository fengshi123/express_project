var express = require('express');
var router = express.Router();
var fd = require('../dao/filesDao');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 获取网盘文件
router.post('/queryAll', function (req, res, next) {
  fd.queryAll(req, res, next);
});

// 新建文件夹
router.post('/newDir', function (req, res, next) {
  fd.add(req, res, next);
});

// 上传指定路径
router.post('/getFilePath', function (req, res, next) {
  fd.getFilePath(req, res, next);
});

// 上传文件
router.post('/uploadFile', function (req, res, next) {
  fd.uploadFile(req, res, next);
});

// 递归删除文件夹
router.post('/deleteDir', function (req, res, next) {
  fd.delDir(req, res, next);
});

// 删除文件
router.post('/deleteFile', function (req, res, next) {
  fd.delFile(req, res, next);
});

// 重命名文件
router.post('/renameFile', function (req, res, next) {
  fd.update(req, res, next);
});

module.exports = router;
