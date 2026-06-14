const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/names',userController.getUsers);
router.get('/cpf/:cpf', userController.getUserByCPF);
router.get('/name/:name', userController.getUserByName);

module.exports = router
