th.middleware.js

module.exports.register = function(req, res, next)
{
    req.checkBody({

        'username': {
            notEmpty: true,
            errorMessage: 'Username is required'
        },

        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email Address'
            },
            errorMessage: 'Email is required'
        },

        'password': {
            notEmpty: true,
            errorMessage: 'Password is required'
        },

        'password_confirmation': {
            notEmpty: true,
            errorMessage: 'Password Confirmation is required'
        }

    });

    req.assert('password_confirmation', 'Passwords do not match').equals(req.body.password);

    req.check('username', 'This username is already taken').isUsernameAvailable();

    req.asyncValidationErrors().then(function() {
        next();
    }).catch(function(errors) {

        if(errors) {
            return res.json({
                success:false,
                errors: errors
            });
        };
    });
}