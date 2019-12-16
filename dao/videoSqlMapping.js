// CRUD SQL语句
var video = {
  insert: 'insert into t_video(uid, video_name, video_path, video_time) VALUES(?,?,?,?)',
  queryById: 'select * from t_video where uid=?',
  delete: 'delete from t_video where uid=? and video_id=?',
  insertComment: 'insert into t_comment(video_id, uid, name, comment_content, comment_time) VALUES(?,?,?,?,?)',
  queryByVisdeoId: 'select * from t_comment where video_id=?'
};

module.exports = video;
