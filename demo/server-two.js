const express = require('express');
const app = express();

// Cache-Control 设置缓存
app.get('*', function (req, res, next) {
  /**
   *  @title 设置缓存 (在HTTP/1.0)
   *  @private 在服务器设置了private比如Cache-Control: private , max-age=60的情况下，表示只有用户的浏览器可以缓存private响应，不允许任何中继Web代理对其进行缓存
   *  @public 如果设置了public，表示该响应可以再浏览器或者任何中继的Web代理中缓存，public是默认值，即Cache-Control: max-age=60等同于Cache-Control: public , max-age=60。
   *  @Expires Expires 表示存在时间，允许客户端在这个时间之前不去检查（发请求），等同max-age的效果 但是如果同时存在，则被Cache-Control的max-age覆盖。
   */
  if (/\.(js|css)$/.test(req.url)) {
    res.setHeader('Cache-Control', 'private,max-age=' + 1000 * 60 * 60); // 强缓存 静态资源 返回状态码  200 (disk cache)
  }
  next();
});

app.all('*', function (req, res, next) {
  console.log('cros ===== ');
  res.header('Access-Control-Allow-Credentials', 'true');
  // href 设置指定的白名单域名 例如 "https://www.baidu.com"
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(express.static('./server-two-public'));

const port = 7002;
app.listen(port, function () {
  console.log(
    `Express started on http://localhost:${port}; press Ctrl + c to terminate.`,
  );
});
