var user = {
  queryById: 'select * from t_user where uid=?',
  adminLogin: 'select * from t_system where admin_id=?'
};

module.exports = user;
