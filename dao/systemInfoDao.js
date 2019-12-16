var currentTime = require('../common/getCurrentTime');
var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./systemInfoSqlMapping');
var logger = require('../common/logger');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');

module.exports = {
  edit: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      var param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.update,
        [param.appid, param.appVersion, param.path, currentTime, param.functionDescripe, param.adminId],
        function (err, result) {
          if (err) {
            logger.error(err);
          } else {
            result = {
              code: 0,
              msg: '发布成功'
            };
            try {
              if (global.ws) {
                var info = {
                  appid: param.appid,
                  appVersion: param.appVersion,
                  path: param.path,
                  publishTime: currentTime,
                  functionDescripe: param.functionDescripe
                }
                global.ws.send(JSON.stringify(info));
              }
            } catch (e) {
              console.log(e);
            }
          }
          // 以json形式，把操作结果返回给前台页面
          common.jsonWrite(res, result);
          // 释放连接
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
        if (err) {
          logger.error(err);
        }
        var ret = result[0];
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  }
};
