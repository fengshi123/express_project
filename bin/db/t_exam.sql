create table if not exists t_exam(
  exam_id int primary key AUTO_INCREMENT,
  uid varchar(16),
  name varchar(32),
  create_time varchar(32)
) default charset = utf8;

insert into t_exam values(1,'1','试卷1','2019-11-10 11:11:11');
insert into t_exam values(2,'1','试卷2','2019-11-10 11:11:11');

create table if not exists t_question(
  question_id int,
  exam_id int,
  type int,
  stem varchar(512),
  stem_img varchar(512),
  stem_audio varchar(512),
  audio_time varchar(64),
  result_options varchar(512),
  result varchar(64),
  PRIMARY KEY (question_id,exam_id)
) default charset = utf8;

insert into t_question values(1,1,0,'我是一题单选题','','','3','A选项|B选项|C选项|D选项','B');
insert into t_question values(2,1,2,'我是一题判断题','','','','Y选项|N选项','Y');
insert into t_question values(3,1,1,'我是一道多选题','','','','A选项|B选项|C选项|D选项','A|B');
insert into t_question values(4,1,3,'我是一道填空题________','','','','','填空题的正确答案');
insert into t_question values(5,1,0,'我是最后一道题目','','','3','A选项|B选项|C选项|D选项','A');

insert into t_question values(1,2,0,'我是一题单选题','','','3','A选项|B选项|C选项|D选项','B');
insert into t_question values(2,2,2,'我是一题判断题','','','','Y选项|N选项','Y');
insert into t_question values(3,2,1,'我是一道多选题','','','','A选项|B选项|C选项|D选项','A|B');
insert into t_question values(4,2,3,'我是一道填空题________','','','','','填空题的正确答案');

create table if not exists t_answer(
  uid varchar(16),
  question_id int,
  exam_id int,
  answer varchar(64)
) default charset = utf8;

insert into t_answer values('1',1,1,'B');
insert into t_answer values('1',2,1,'Y');
insert into t_answer values('1',3,1,'A|B');
insert into t_answer values('1',4,1,'填空题的正确答案');
insert into t_answer values('1',5,1,'A');

insert into t_answer values('2',1,1,'B');
insert into t_answer values('2',2,1,'Y');
insert into t_answer values('2',3,1,'A|B');
insert into t_answer values('2',4,1,'好好学习');
insert into t_answer values('2',5,1,'A');

insert into t_answer values('3',1,1,'A');
insert into t_answer values('3',2,1,'Y');
insert into t_answer values('3',3,1,'A|B');
insert into t_answer values('3',4,1,'好好学习');
insert into t_answer values('3',5,1,'A');

insert into t_answer values('4',1,1,'A');
insert into t_answer values('4',2,1,'N');
insert into t_answer values('4',3,1,'A|B');
insert into t_answer values('4',4,1,'填空题的正确答案');
insert into t_answer values('4',5,1,'B');

insert into t_answer values('5',1,1,'B');
insert into t_answer values('5',2,1,'Y');
insert into t_answer values('5',3,1,'A|B');
insert into t_answer values('5',4,1,'填空题的正确答案');
insert into t_answer values('5',5,1,'A');

commit;

