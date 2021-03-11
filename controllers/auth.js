const User = require('../models/user');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator/check");

/***************************************************************************
 * Post Signup
 ****************************************************************************/
exports.postSignup = (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
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

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

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

/***************************************************************************
 * Post Login
 ****************************************************************************/
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                    username: loadedUser.username,
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'pLOw!r2VGVszbWX{606e,FeBA]Q<+_', { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

/***************************************************************************
 * GET Profile
 ****************************************************************************/
exports.getProfile = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
    }
    res.status(200).json({
        username: req.username,
        email: req.email
    })
}