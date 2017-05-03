var url = require('url');
var path = require('path');
var fs = require('fs');
var MIME_TYPES = require('./mime.js');
var express = require('express');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('../routes/routes.js');

var app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../res')));

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// function app(req, res) {
//     res.setTimeout(10000, function () {
//         res.writeHead(500);
//         res.end('500，响应超时');
//     });
//     var filepath = realpath(url.parse(req.url).pathname);
//     var extname = path.extname(filepath);
//     if (extname === '') {
//         var fn = routes[req.method.toLowerCase() + 's'][filepath];
//         if (fn) {
//             fn(req, res);
//         } else {
//             res.writeHead(404);
//             res.end('404，页面不存在');
//         }
//     } else {
//         fs.readFile(filepath, function (err, body) {
//             if (err) {
//                 res.writeHead(404);
//             } else {
//                 res.writeHead(200, {
//                     'Content-Type': MIME_TYPES[extname],
//                     'Content-Length': body.length, /// 统计的是Buffer的长度，而非String的长度
//                     'Server': 'node.js',
//                     'X-Powered-By': 'satrong'
//                 });
//                 res.write(body);
//             }
//             res.end();
//         });
//     }
// }

// /// 针对静态文件返回真实地址
// function realpath(pathname) {
//     if (/^\/((js)|(css)|(fonts)|(html))\/.+/i.test(pathname)) {
//         return ROOT + 'res' + pathname;
//     } else {
//         return pathname;
//     }
// }
module.exports = app;