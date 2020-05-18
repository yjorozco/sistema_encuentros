const { check} = require('express-validator');


exports.certificadoValidationRules =  [
        // username must be an email
      
        check('certificado.descripcion').notEmpty(),
                // username must be an email
        check('certificado.fileData').notEmpty(),
        // password must be at least 5 chars long  
];