create table if not exists t_user(
  uid varchar(16) primary key,
  name varchar(16),
  sex varchar(16)
) default charset = utf8;

insert into t_user values('1','teacher','男');
insert into t_user values('2','teacher1','女');

commit;

