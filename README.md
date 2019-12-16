## 介绍

express 服务端项目，包括以下：mysql 结合、日志记录、错误捕获、token 认证、跨域配置、自动重启 等一系列常见的功能。

**node.js 版本为：11.12.0**

**npm 版本为：6.7.0**

## 启动

``` bash
1、进入到目录底下，安装插件，例如 express_project 目录底下
$ npm install
2、初始化 sql 脚本，需要进入目录 /express_project/bin/db/,执行以下脚本语句
$ setup.sh
3、开发环境启动项目
$ npm run dev
4、正式环境启动项目
$ npm run start
5、浏览器打开
http://localhost:3000
```

