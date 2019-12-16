// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
  update: 'update t_system set app_id=?, app_version=?, path=?, release_date=?, function_descripe=? where admin_id=?',
  query: 'select * from t_system where uid=?',
  queryAll: 'select * from t_system'
};

module.exports = user;
