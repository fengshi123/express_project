
// 获取 url 后面携带的参数 param：参数名
function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var url = window.decodeURI(window.location.search, 'UTF-8');
  var r = url.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}

// XHR get 请求
function xhrGetRequest (reqUrl, token, call) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', reqUrl, true);
  xhr.setRequestHeader('Authorization', token);
  //   xhr.headers['Authorization'] = token;
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        console.log('服务端返回值：');
        call(xhr.responseText);
      } else {
        console.log('error...');
      }
    }
  };
}
