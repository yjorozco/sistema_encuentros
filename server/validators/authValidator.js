const { check, validationResult } = require('express-validator');


exports.authValidationRules =  [
        // username must be an email
        check('address').notEmpty(),
        // password must be at least 5 chars long
        check('privateKey').notEmpty()
      ];
  



exports.authValidator = async (req, res, next) =>
{
   
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
}