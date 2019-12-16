var express = require('express');
var router = express.Router();

var examDao = require('../dao/examDao');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addexam', function (req, res, next) {
  examDao.addExam(req, res, next);
});

router.get('/queryAll', function (req, res, next) {
  examDao.queryAll(req, res, next);
});

router.post('/deleteexam', function (req, res, next) {
  examDao.delete(req, res, next);
});

router.get('/queryQuestionById', function (req, res, next) {
  examDao.queryQuestionById(req, res, next);
});

router.post('/addAnswer', function (req, res, next) {
  examDao.addAnswer(req, res, next);
});

router.get('/queryUserById', function (req, res, next) {
  examDao.queryUserById(req, res, next);
});

router.get('/queryScoreById', function (req, res, next) {
  examDao.queryScoreById(req, res, next);
});

router.get('/queryExamId', function (req, res, next) {
  examDao.queryExamId(req, res, next);
});
module.exports = router;
