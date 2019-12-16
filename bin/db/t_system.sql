create table if not exists t_system(
  admin_id varchar(16) primary key,
  password varchar(16),
  app_id int,
  app_version varchar(16),
  path varchar(128),
  release_date varchar(32),
  function_descripe varchar(512)
) default charset = utf8;

insert into t_system values('admin','111111', 1, '1.0.1','public/app_version/app-release.apk','2019-11-13 18:50:01','初始化版本');

commit;

