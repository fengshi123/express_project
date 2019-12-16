create table if not exists t_video(
  video_id int primary key AUTO_INCREMENT,
  uid varchar(16),
  video_name varchar(32),
  video_path varchar(512),
  video_time bigint
) default charset = utf8;

-- insert into t_video values(1,'1','movie.mp4','user_video/1/movie.mp4');

create table if not exists t_comment(
  comment_id int primary key AUTO_INCREMENT,
  video_id int,
  uid varchar(16),
  name varchar(32),
  comment_content varchar(512),
  comment_time bigint
) default charset = utf8;

commit;