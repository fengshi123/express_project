// 建立连接，向表中插入值
var date = new Date();
var month = date.getMonth() + 1 + '';
var currentTime = date.getFullYear() + '-' +
 month.padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' +
 date.getHours().toString().padStart(2, '0') + ':' +
 date.getMinutes().toString().padStart(2, '0') + ':' +
 date.getSeconds().toString().padStart(2, '0');

module.exports = currentTime;
