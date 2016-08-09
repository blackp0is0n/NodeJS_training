var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var checkAuth = require('../middleware/checkAuth');

router.get('/', require('./frontpage').get);
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);
router.post('/logout', require('./logout').post);
router.get('/chat', checkAuth, require('./chat').get);


module.exports = router;
