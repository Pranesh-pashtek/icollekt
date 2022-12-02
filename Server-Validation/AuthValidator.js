const {check,validationResult} = require('express-validator');

exports.AuthSignupValidator = [
    check('name')
    .notEmpty()
    .withMessage('User name is required'),
    check('email')
    .notEmpty()
    .withMessage('Email is required'),
    check('password')
    .notEmpty()
    .withMessage('Password is required'),
    check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
],

exports.AuthSigninValidator = [
    check('email')
    .notEmpty()
    .withMessage('Email is required'),
    check('password')
    .notEmpty()
    .withMessage('Password is required'),
]

exports.reqValidator = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next();
}