const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients-сontroller');
const servicesController = require('../controllers/services-controller');


router.get('/clientsData', clientsController.getClients);
router.post('/createClient', clientsController.createClient);

router.get('/services', servicesController.getServices);
router.get('/getCategories', servicesController.getCategories);
router.post('/createCategory', servicesController.createCategory);
router.post('/createService', servicesController.createService);

module.exports = router;
