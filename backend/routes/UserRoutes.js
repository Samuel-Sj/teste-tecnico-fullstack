const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/name',userController.getUserByName);
router.get('/cpf/:cpf', userController.getUserByCPF);

module.exports = router