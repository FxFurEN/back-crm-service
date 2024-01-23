const express = require('express');
const crmController = require('../controllers/crmController');

const router = express.Router();

router.get('/loadClientsData', crmController.loadClientsData);
router.post('/addClient', crmController.addClient);
router.get('/loadClientTypes', crmController.loadClientTypes);
router.get('/loadCategories', crmController.loadCategories);
router.post('/addCategory', crmController.addCategory);
router.get('/loadGoods', crmController.loadGoods);
router.post('/addGoods', crmController.addGoods);

module.exports = router;
