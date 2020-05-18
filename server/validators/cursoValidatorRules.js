const { check} = require('express-validator');


exports.cursoValidationRules =  [
        // username must be an email
        check('curso.nombre').notEmpty(),
        // password must be at least 5 chars long
        check('curso.fecha').notEmpty(),
                // username must be an email
        check('curso.hora').notEmpty(),
        // password must be at least 5 chars long
        check('curso.descripcion').notEmpty(),
        // password must be at least 5 chars long
        check('curso.direccion').notEmpty(),
        // password must be at least 5 chars long
        check('curso.costo').notEmpty(),

];


