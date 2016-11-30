const validator = require('validator');
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){

  const email = req.body.email;
  const password = req.body.password;
  const age = req.body.age;
  const gender = req.body.gender;

  if(!email || !validator.isEmail(email) || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  //see if a user w/ given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err); }
    //if user w/ email does exist return an error
    if(existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    };
    //if a user w/o email NOT exist create/save user
    const user = new User({
      email: email,
      password: password,
      age: age,
      gender: gender
    });

    user.save(function(err) {
      if(err) { return next(err); }
      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });

}

exports.signin = function(req, res, next) {
  //user already had their pass/email auth'd
  res.send({ token: tokenForUser(req.user) });
  //we need to give em a token
}
