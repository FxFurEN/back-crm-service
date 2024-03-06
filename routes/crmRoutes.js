const { Router } = require('express');
const crmController = require('../controllers/crmController');
const clientsController = require('../controllers/clients-сontroller');
const userController = require('../controllers/user-controller');
const router = new Router();


router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

router.get('/loadClientsData', clientsController.loadClientData);
router.post('/addClient', clientsController.addClient);
router.get('/loadClientTypes', crmController.loadClientTypes);

router.get('/loadCategories', crmController.loadCategories);
router.post('/addCategory', crmController.addCategory);
router.get('/loadGoods', crmController.loadGoods);
router.post('/addGoods', crmController.addGoods);

module.exports = router;
