create table if not exists t_app_version(
  appid int primary key AUTO_INCREMENT,
  appname varchar(128),
  version varchar(16),
  path varchar(128),
  upload_date varchar(32),
  function_descripe varchar(512)
) default charset = utf8;

insert into t_app_version values(1,'react-native-project.apk','1.0.1','/','2019-11-13 18:50:01','初始版本');
insert into t_app_version values(2,'react-native-project.apk','1.0.2','/','2019-11-13 18:50:02','添加 app 结构');

commit;

