var net = require('net');
var app = require('./lib/app.js');
var conf = require('./conf.js');

/// 获取可用端口
var baseport = conf.port;
var ports = [];
(function getPort(port) {
    var server = net.createServer();
    server.listen(port, function () {
        server.once('close', function () {
            ports.push(port);
            if (ports.length >= 2) {
                app(ports);
            } else {
                getPort(port + 1);
            }
        });
        server.close();
    });
    
    server.on('error', function () {
        getPort(port + 1);
    });
})(baseport);