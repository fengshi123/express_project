var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./appVersionSqlMapping');
var logger = require('../common/logger');
var fs = require('fs-extra');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');
var currentTime = require('../common/getCurrentTime');

module.exports = {
  upload: function (req, res, next) {
    const appDir = './public/app_version';
    fs.ensureDir(appDir)
      .then(() => {
        common.upload(appDir, req).then(function ([obj, textObj]) {
          res.json({
            code: '0',
            path: obj.files[0].path
          });
        })
      })
  },
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      var param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.insert, [param.appname, param.version, param.path, currentTime, param.descripe], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '增加成功'
          };
        }
        // 以json形式，把操作结果返回给前台页面
        common.jsonWrite(res, result);
        // 释放连接
        connection.release();
      });
    });
  },
  delete: function (req, res, next) {
    // delete by Id
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      var appid = req.body.appid;
      var sql = 'delete from t_app_version where appid in (' + appid + ')';
      connection.query(sql, '', function (err, result) {
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
  query: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      var version = req.body.version;
      connection.query(sql.query, [version], function (err, result) {
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
  download: function (req, res, next) {
    res.download('./' + req.query.path)
  }
};
