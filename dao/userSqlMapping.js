// dao/userSqlMapping.js
// CRUD SQL语句
const user = {
  insert: 'insert into t_user(uid, name, sex) VALUES(?,?,?)',
  update: 'update t_user set name=?, sex=? where uid=?',
  delete: 'delete from t_user where uid=?',
  queryById: 'select * from t_user where uid=?',
  queryAll: 'select * from t_user'
};

module.exports = user;
