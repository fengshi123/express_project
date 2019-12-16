// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
  insert: 'insert into t_app_version(appname, version, path, upload_date, function_descripe) VALUES(?,?,?,?,?)',
  delete: 'delete from t_app_version where appid in (?)',
  queryAll: 'select * from t_app_version order by appid desc',
  query: 'select * from t_app_version where version = (?)'
};

module.exports = user;
