var fs = require('fs');
var _path = require('path');
var express = require('express');
var router = express.Router();
var site_config = require('../model/site_config.js'); 
var mongoose = require('mongoose');

/// 添加配置
router.post('/add', function (req, res) {
    var self = this;
    var selector = [];
    JSON.parse(req.body.levels).forEach(function (element, index) {
        selector.push({
            $: element.selector,
            attr: element.attr
        });
    });
    req.body.selector = selector;
    // var filename = ROOT + 'config/' + req.body.configName.trim();
    req.body.isPagination = !!req.body.page?1:0;
    req.body.mode = 'web';
    var id = req.body.id || '';
    if (!req.body.id) {
        req.body.id = 'testid';
        site_config.create({
            configName: req.body.configName,
            configJson: JSON.stringify(req.body)
        }, function(err, data){
            if (err) {
                res.json({
                    status: false,
                    info: '保存失败',
                    data: err
                });
            }else{
                res.json({
                    status: true,
                    info: '保存成功',
                    data: data
                });
            }  
        });
    }else{
        site_config.update({
            _id: id
        },{
            configName: req.body.configName,
            configJson: JSON.stringify(req.body)
        },function(err, data){
            if (err) {
                res.json({
                    status: false,
                    info: '更新失败',
                    data: err
                });
            }else{
                res.json({
                    status: true,
                    info: '更新成功',
                    data: data
                });
            }  
        });
    }
});

/// 删除配置
router.get('/delete', function (req, res) {
    // var self = this;
    var id = req.query.id;
    site_config.remove({
        _id: id
    }, function(err, result){
        res.json({
            status: !err,
            info: !err?'删除成功':'删除失败',
            error: err
        });
    });
});

/// 获取配置内容
router.get('/edit', function (req, res) {
    // var self = this;
    var id = req.query.id;
    site_config.find({
        _id: id
    }, function(err, result){
        if (err) {
            res.json({
                status: false,
                info: '该配置文件不存在'
            });
        }else{
            var resultjson = JSON.parse(result[0].configJson);
            resultjson.id = id;
            var data = utils.switchAttr(resultjson, 'isPagination page,selector levels,selector.[].$ selector');
            res.json({
                status: true,
                data: utils.extend(data, { configName: req.query.name, id: req.query.id})
            });
        }

    })
});


module.exports = router;