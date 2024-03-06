const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients-сontroller');


router.get('/clientsData', clientsController.getClients);
router.post('/createClient', clientsController.createClient);

module.exports = router;
