var express = require('express');
var router = express.Router();

/* GET home page. */

const fileController = require('../controllers/fileController');
const payController = require('../controllers/payController');
const authController = require('../controllers/authenController');
const authValidator = require('../validators/authValidator');
const cursoController = require('../controllers/cursoController');
const stateController = require('../controllers/state-controller');
const configController = require('../controllers/config-controller');


const validator = require('../validators/validator');
const validatorRules = require('../validators/cursoValidatorRules');
const pagarValidationRules = require('../validators/pagarValidatorRules');
const certificadoValidationRules = require('../validators/certificadoValidationRules');
router.post('/file/uploadFile', fileController.uploadFile);
router.post('/course/payment', pagarValidationRules.pagarValidationRules, authValidator.authValidator, payController.payment);
router.post('/course/inscritos',  authValidator.authValidationRules, authValidator.authValidator, payController.listaAlumnos);
router.post('/file/certificados', authValidator.authValidator, fileController.certificado);
router.post('/auth/generateAccount', authController.generateAccount);
router.post('/auth/auth', authValidator.authValidationRules, authValidator.authValidator, authController.auth);
router.post('/course/agregarcursos', validatorRules.cursoValidationRules, validator.validator, cursoController.crearCurso);
router.post('/course/consultarCursos', authValidator.authValidationRules, authValidator.authValidator, cursoController.consultarCursos);

//router.post('/channel', stateController.post.createChannel);
//router.post('/buy', stateController.post.buyProduct);
//router.post('/stop', stateController.post.stopChannel);


router.get('/config/params', configController.get.getParams);
router.get('/products', configController.get.getProducts);
router.get('/faucet', stateController.get.faucet);
//router.get('/course/paymentState', payController.channelPayment);

module.exports = router;
