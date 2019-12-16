create table if not exists t_user(
  uid varchar(16) primary key,
  name varchar(16),
  password varchar(16),
  role int,
  sex varchar(16)
) default charset = utf8;

insert into t_user values('1','teacher','111',0,'男');
insert into t_user values('2','teacher1','111',0,'女');

commit;

