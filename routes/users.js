var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');

var User = require('../models/user');

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        if(req.body.firstname)
          user.firstName = req.body.firstname;
        if(req.body.lastname)
          user.lastName = req.body.lastname;
        user.save((err, user) => {
          if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        });
      }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token, status: 'You are successfully logged in!'});
});

module.exports = router;