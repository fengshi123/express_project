// dao/userDao.js
// 实现与MySQL交互
const mysql = require('mysql');
const conf = require('../conf/db');
const sql = require('./userSqlMapping');
const logger = require('../common/logger');
// 使用连接池，提升性能
const pool = mysql.createPool(conf.mysql);
const jsonWrite = require('./common');

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.insert, [param.uid, param.name, param.age], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '增加成功'
          };
        }
        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result);
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
      let uid = req.body.uid;
      connection.query(sql.delete, uid, function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '删除成功'
          };
        }
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  update: function (req, res, next) {
    // update by id
    // 为了简单，要求同时传name和age两个参数
    var param = req.body;
    if (param.name == null || param.sex == null || param.uid == null) {
      jsonWrite(res, undefined);
      return;
    }

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.update, [param.name, param.sex, param.uid], function (err, result) {
        if (err) {
          logger.error(err);
        }
        // 成功的操作暂没提供....

        connection.release();
      });
    });
  },
  queryById: function (req, res, next) {
    var uid = req.query.uid; // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.queryById, uid, function (err, result) {
        if (err) {
          logger.error(err);
        }
        // 成功的操作暂没提供....

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
        let ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        jsonWrite(res, ret);
        connection.release();
      });
    });
  }
};
