const express = require('express');
const { check, body } = require('express-validator/check');
const User = require('../models/user');
// const isAuth = require('../middleware/is-auth'); //TODO: Set this up for later

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', 
[
check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
// .custom((value, {req}) => {

//   return User.findOne({ email: value })
//     .then(userDoc => {
//         if (userDoc){
//             return Promise.reject('Email is alreay in use'); //FIXME: Return JSON to html so they can use error messages?
//         }   
// });
// })
.normalizeEmail(),
body('password','Password must be at least 5 characters and only text & numbers').isLength({min: 5}).isAlphanumeric().trim(),
body('confirmPassword').trim().custom((value, {req}) => {
    if (value !== req.body.password){
        throw new Error('Passwords have to match');
    }
    return true;
}),
body('username').isLength({min: 5}).isAlphanumeric().trim()
],
 authController.postSignup
);

module.exports = router;