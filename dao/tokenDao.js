var mysql = require('mysql');
var conf = require('../conf/db');
var jsonWebToken = require('jsonwebtoken');
var sql = require('./tokenSqlMapping');
var logger = require('../common/logger');
const CONSTANT = require('../common/constant');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');

module.exports = {
  getToken: function (role, req, res, next) {
    var uid = req.body.uid;
    var password = req.body.password;
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      let sqlSentence = role === 'admin' ? sql.adminLogin : sql.queryById;
      connection.query(sqlSentence, uid, function (err, result) {
        if (err) {
          logger.error(err);
        }
        if (result.length > 0) {
          var obj = result[0];
          var ret;
          if (obj.password === password) {
            if (role === 'admin') {
              ret = {
                code: 0,
                data: {
                  token: jsonWebToken.sign({
                    uid: obj.admin_id
                  }, CONSTANT.SECRET_KEY, {
                    expiresIn: 60 * 60 * 24 * 30
                  }),
                  uid: obj.admin_id,
                  app_id: obj.app_id,
                  app_version: obj.app_version,
                  release_date: obj.release_date
                }
              };
            } else {
              ret = {
                code: 0,
                data: {
                  token: jsonWebToken.sign({
                    uid: obj.uid
                  }, CONSTANT.SECRET_KEY, {
                    expiresIn: 60 * 60 * 24 * 30
                  }),
                  uid: obj.uid,
                  name: obj.name,
                  role: obj.role,
                  sex: obj.sex
                }
              };
            }
          }
        }
        common.jsonWrite(res, ret);
        connection.release();
      });
    });
  }
}
