﻿var cp = require('child_process');
var http = require('http');
var net = require('net');
var fs = require('fs');
var path = require('path');
var url = require('url');
var WebSocketServer = require('ws').Server;
global.ROOT = path.join(__dirname, '../');
var ejs = require('ejs');
var app = require('./app_start.js');
global.utils = require('./utils.js');
global.routes = require('./routes.js')();

var MIME_TYPES = require('./mime.js');

var worker;

/// 读取routes
// var routeFiles = fs.readdirSync(ROOT + 'routes');

// routeFiles.forEach(function (element, index) {
//     require(ROOT + 'routes/' + element).route();
// });


module.exports = function (ports) {
    global.PORTS = ports;
    var port = ports[0];

    var server = http.createServer(app);
    server.listen(port, function () {
        console.log('node-crawler启动成功，监听端口%s中\r(请使用支持websocket的浏览器打开地址http://127.0.0.1:%s进行操作)', port, port);
    });

    var worker;
    var wss = new WebSocketServer({ port: ports[1] });
    wss.on('connection', function connection(_ws) {
        _ws.on('message', function incoming(message) {
            //console.log('received: %s', message);
            message = JSON.parse(message);
            if (message.action === 'start') {
                /// 开启子进程来执行抓取
                worker = cp.fork(ROOT + 'lib/crawler.js');
                worker.on("message", function (data) {
                    _ws.send(data);
                });
                worker.on("close", function (code, signal) {
                    !code && _ws.send(JSON.stringify({ color: 'redBG', info: !signal ? '执行完毕':'已手动停止抓取', status: 0 }));
                });
                console.log('message',message);
                /// 将要使用的配置文件名传送给子进程
                worker.send(message.config);
            } else if (message.action === "stop") {
                worker.kill();
            }
        });
    });
}

