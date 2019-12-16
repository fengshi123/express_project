var fs = require('fs-extra');
var common = require('./common');
var logger = require('../common/logger');
var sql = require('./videoSqlMapping');
// 使用连接池，提升性能
var mysql = require('mysql');
var conf = require('../conf/db');
var pool = mysql.createPool(conf.mysql);

// 默认视频目录，存在则不创建，不存在则创建
const USER_VIDEO_NAME = 'user_video';

function getFileTime (path) {
  return new Promise(function (resolve, reject) {
    fs.stat(path, function (err, stats) {
      if (err) {
        reject(err);
      }
      resolve(parseInt(stats.atimeMs));
    })
  })
}

module.exports = {

  // 上传视频
  addVideo: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      fs.ensureDir(`./public/${USER_VIDEO_NAME}/${req.user.uid}`)
        .then(() => {
          common.upload(`./public/${USER_VIDEO_NAME}/${req.user.uid}`, req).then(async function ([imgObj, textObj]) {
            const videoPath = (imgObj.video)[0].path.replace(/\\/g, '/')
            const videoName = unescape((imgObj.video)[0].originalFilename)
            const videoTime = await getFileTime(`./${videoPath}`)
            let param = {
              uid: req.user.uid,
              video_name: videoName,
              video_path: videoPath,
              video_time: videoTime
            }
            // 建立连接，向表中插入值
            connection.query(sql.insert, [param.uid, param.video_name, param.video_path, param.video_time], function (err, result) {
              if (err) {
                logger.error(err);
              } else {
                result = {
                  code: 0,
                  msg: '上传视频成功'
                };
              }
              // 以json形式，把操作结果返回给前台页面
              common.jsonWrite(res, result);
              // 释放连接
              connection.release();
            });
          });
        })
    });
  },
  // 获取视频列表
  queryAllVideo: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      // 建立连接
      connection.query(sql.queryById, req.user.uid, function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '获取视频列表成功',
            data: result
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      });
    });
  },
  // 删除视频
  deleteVideo: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      var param = req.body;
      connection.query(sql.delete, [req.user.uid, param.id], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          fs.unlink('./' + param.path, function (err) {
            var result;
            if (err) {
              logger.error(err);
            } else {
              result = {
                code: 0,
                message: '删除视频成功'
              };
              common.jsonWrite(res, result);
            }
          })
        }
        connection.release();
      });
    });
  },
  // 获取评论
  queryComment: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      var param = req.body;
      // 建立连接
      connection.query(sql.queryByVisdeoId, param.id, function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '获取评论成功',
            data: result
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      });
    });
  },
  // 添加评论
  addComment: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      var param = req.body;
      // 建立连接
      connection.query(sql.insertComment, [param.id, req.user.uid, param.name, param.comment, param.time], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '评论成功',
            data: result
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      });
    });
  }
}
