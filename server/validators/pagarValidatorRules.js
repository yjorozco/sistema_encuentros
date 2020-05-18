const { check} = require('express-validator');


exports.pagarValidationRules =  [
        // username must be an email
        check('curso.nombre').notEmpty(),
        // password must be at least 5 chars long
        check('curso.fecha').notEmpty(),
        // username must be an email
        check('curso.hora').notEmpty(),
        // password must be at least 5 chars long

        // password must be at least 5 chars lon
        check('curso.costo').notEmpty(),

];