var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.visits_number = req.session.visits_number + 1 || 1;
  res.render('index', { title: req.session.visits_number });
});

router.get('/users', function(req, res, next){
  User.find({}, function(err, users){
    if(err) return next(err);
    res.json(users);
  })
});

router.get('/users/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) return next(err);
    if (!user){
      next(new HttpError(404, "User not found"));
    }
    res.json(user);
  });
});



module.exports = router;
