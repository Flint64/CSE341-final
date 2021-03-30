const express = require('express');
const { check, body } = require('express-validator/check');
const User = require('../models/user');

const isAuth = require('../middleware/is-auth');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                }
            });
        })
        .normalizeEmail(),
        body('password', 'Password must be at least 5 characters and only text & numbers').isLength({ min: 5 }).isAlphanumeric().trim(),
        body('confirmPassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true;
        }),
        body('username').isLength({ min: 5 }).isAlphanumeric().trim()
    ],
    authController.postSignup
);

router.post('/login', authController.login);

router.get('/profile/:userId', isAUth, authController.getProfile);

module.exports = router;