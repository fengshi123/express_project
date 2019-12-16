var express = require('express');
var router = express.Router();
var vd = require('../dao/videoDao');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 获取视频列表
router.post('/queryAll', function (req, res, next) {
  vd.queryAllVideo(req, res, next);
});

// 删除视频
router.post('/deleteFile', function (req, res, next) {
  vd.deleteVideo(req, res, next);
});

// 添加视频
router.post('/addVideo', function (req, res, next) {
  vd.addVideo(req, res, next);
});

// 添加评论
router.post('/addComment', function (req, res, next) {
  vd.addComment(req, res, next);
});

// 获取评论
router.post('/queryComment', function (req, res, next) {
  vd.queryComment(req, res, next);
});

module.exports = router;
