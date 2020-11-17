const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  // check if the password is long enough and username is not empty
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('signup', { message: 'Your password must be 8 chars min' });
  }
  if (username === '') {
    res.render('signup', { message: 'Your username cannot be empty' });
  }
  // check if the username already exists
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        res.render('/signup', { message: 'This Username is already taken' })
      } else {
        // we can create a user and add the hashed password 
        const salt = bcrypt.genSaltSync();
        console.log(salt);
        const hash = bcrypt.hashSync(password, salt);
        User.create({ username: username, password: hash })
          .then(dbUser => {
            // log in or 
            res.redirect('/login');
          })
          .catch(err => {
            // console.log(err);
            next(err);
          })
      }
    })
});


module.exports = router;