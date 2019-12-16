var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./examSqlMapping');
var logger = require('../common/logger');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');
var currentTime = require('../common/getCurrentTime');
var fs = require('fs-extra');

module.exports = {
  addExam: function (req, res, next) {
    var vm = this;
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      const examDir = './public/exam';
      fs.ensureDir(examDir)
        .then(() => {
          common.upload(examDir, req).then(function ([obj, textObj]) {
            var examName = textObj['examName'][0];
            var questionList = JSON.parse(textObj['questionList'][0]);
            for (var key in Object.keys(obj)) {
              var arr = obj[key] || [];
              questionList[key].stemImg.splice(0, questionList[key].stemImg.length);
              questionList[key].stemAudio.splice(0, questionList[key].stemAudio.length);
              for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                var path = item.path;
                var type = path.split('.').pop();
                type === 'aac' ? questionList[key].stemAudio.push(path)
                  : questionList[key].stemImg.push(path);
              }
            }
            vm.createExam(examName, req, res, connection).then(function (exam) {
              var sqlParamsEntity = questionList.map((question, index) => {
                var resultOptions = question.options.join('|');
                var stemImg = question.stemImg.join('|').replace(/\\/g, '/');
                var stemAudio = question.stemAudio.join('|').replace(/\\/g, '/');
                var audioTime = question.audioTime.join('|');
                // 对正确答案进行调整 将 true 改变成对应的选项 A B
                var choiceList = ['A', 'B', 'C', 'D'];
                var judgeList = ['Y', 'N'];
                for (var i = 0; question.result && i < question.result.length; i++) {
                  if (question.result[i]) {
                    if (question.type === 0 || question.type === 1) {
                      question.result[i] = choiceList[i];
                    } else if (question.type === 2) {
                      question.result[i] = judgeList[i];
                    }
                  }
                }

                var result = question.result.filter(item => {
                  return !!item;
                })
                if (question.type === 3) {
                  result = resultOptions;
                } else {
                  result = result.join('|');
                }
                let arr = [
                  index + 1,
                  exam.insertId,
                  question.type,
                  question.stem,
                  stemImg,
                  stemAudio,
                  audioTime,
                  resultOptions,
                  result
                ];
                return arr;
              });
              common.execTrans(sql.insertQuestion, sqlParamsEntity, function (err, info) {
                var result;
                if (err) {
                  logger.error(err);
                } else {
                  result = {
                    code: 0,
                    msg: '增加试卷成功'
                  };
                }
                common.jsonWrite(res, result);
              })
            }).catch(function (err) {
              common.jsonWrite(res);
              logger.error(err);
            })
          });
        })
    });
  },
  // 创建一张试卷
  createExam: function (examName, req, res, connection) {
    return new Promise(function (resolve, reject) {
      connection.query(sql.createExam, [req.user.uid, examName, currentTime], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result)
        }
      });
    })
  },
  delete: function (req, res, next) {
    // delete by Id
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      var examId = req.body.exam_id;
      connection.query(sql.delete, examId, function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '删除成功'
          };
        }
        common.jsonWrite(res, result);
        connection.release();
      });
    });
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryAll, function (err, result) {
        var ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  },
  queryQuestionById: function (req, res, next) {
    var examId = req.query.exam_id;
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryQuestionById, [req.user.uid, examId], function (err, result) {
        var ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  },
  addAnswer: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      var answerList = req.body.answerList;
      var sqlParamsEntity = answerList.map(answer => {
        let arr = [
          req.user.uid,
          answer.questionid,
          answer.examid,
          answer.answerOption
        ];
        return arr;
      });
      common.execTrans(sql.insertAnswer, sqlParamsEntity, function (err, info) {
        var result;
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '保存答案成功'
          };
        }
        common.jsonWrite(res, result);
      })
    });
  },
  // 查询已作答当前试卷的用户
  queryUserById: function (req, res, next) {
    var examId = req.query.exam_id;
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryUserById, examId, function (err, result) {
        var ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  },
  queryScoreById: function (req, res, next) {
    var examId = req.query.exam_id;
    var questionLength = req.query.questionLength;
    var userSum = req.query.userSum;
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryScoreById, examId, function (err, result) {
        var ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result,
            questionLength: questionLength,
            userSum: userSum
          };
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  },
  queryExamId: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryExamId, req.user.uid, function (err, result) {
        var ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  }
};
