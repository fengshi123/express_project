// dao/examSqlMapping.js
// CRUD SQL语句
var exam = {
  insertQuestion: 'insert into t_question(question_id, exam_id, type, stem, stem_img, stem_audio, audio_time, result_options, result) VALUES(?,?,?,?,?,?,?,?,?)',
  createExam: 'insert into t_exam(uid, name, create_time) VALUES(?,?,?)',
  insert: 'insert into t_exam(exam_id, uid, name, create_time) VALUES(?,?,?,?)',
  delete: 'delete from t_exam where exam_id=?',
  queryAll: 'select * from t_exam order by exam_id DESC',
  insertAnswer: 'insert into t_answer(uid, question_id, exam_id, answer) VALUES(?,?,?,?)',
  queryQuestionById: 'select q.*, a.answer from t_question as q LEFT JOIN t_answer as a on a.uid = ? and q.exam_id = a.exam_id and a.question_id = q.question_id where q.exam_id = ? ORDER BY q.question_id',
  queryScoreById: 'select a.uid, q.exam_id, Count(a.question_id) as rightSum from t_question as q LEFT JOIN t_answer as a on a.question_id = q.question_id and a.answer = q.result where a.exam_id = ? and a.exam_id = q.exam_id GROUP BY a.uid, q.exam_id ORDER BY a.uid ASC',
  queryExamId: 'select e.exam_id,e.`name`,e.create_time,a.question_id is_finish from t_exam e LEFT JOIN t_answer a on a.uid = ? and e.exam_id = a.exam_id and a.question_id=1 ORDER BY e.exam_id DESC',
  queryUserById: 'select distinct uid from t_answer where exam_id=?'
};

module.exports = exam;
