const User = require('../models/user');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator/check");

/***************************************************************************
 * Post Signup
 ****************************************************************************/
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const errors = validationResult(req);
  
  console.log(errors);
  //TODO: We don't render pages, we supply data; this has to now return JSON of a success message
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
        username: username,
      },
      validationErrors: errors.array(),
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        username: username,
      });

      // save to the database
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User registered successfully"
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(err);
    });
};
