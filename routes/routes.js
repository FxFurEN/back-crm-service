const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients-сontroller');
const servicesController = require('../controllers/services-controller');
const positionController = require('../controllers/position-controller');


router.get('/positions', positionController.getAllPositions);
router.post('/createPosition', positionController.createPosition);
router.put('/positions/:id', positionController.updatePosition);


router.get('/clientsData', clientsController.getClients);
router.post('/createClient', clientsController.createClient);

router.get('/services', servicesController.getServices);
router.get('/getCategories', servicesController.getCategories);
router.post('/createCategory', servicesController.createCategory);
router.post('/createService', servicesController.createService);

module.exports = router;
