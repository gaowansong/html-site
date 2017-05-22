var express = require('express');
var router = express.Router();
var main = require('./main');
var news = require('./news');
var sites = require('./sites');
var login = require('./login');
var site_manage = require('./site_manage');
var config = require('./config');


router.use('/', site_manage);
router.use('/news', news);
router.use('/sites', sites);
router.use('/config', config);
router.use('/login', login);
router.use('/site_manage', site_manage);


module.exports = router;