const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients-сontroller');
const servicesController = require('../controllers/services-controller');
const positionController = require('../controllers/position-controller');
const employeeController = require('../controllers/employees-controller');
const stageController = require('../controllers/stages-controller');
const orderController = require('../controllers/order-controller');
const reportsController = require('../controllers/reports-controller');


router.get('/positions', positionController.getAllPositions);
router.post('/createPosition', positionController.createPosition);
router.put('/positions/:id', positionController.updatePosition);
router.delete('/positions/:id', positionController.deletePosition);

router.get('/employees', employeeController.getEmployees);
router.post('/createEmployee', employeeController.createEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);
router.put('/updateEmployee/:id', employeeController.updateEmployee);

router.get('/clientsData', clientsController.getClients);
router.post('/createClient', clientsController.createClient);
router.delete('/deleteClient/:id', clientsController.deleteClient);
router.put('/updateClient/:id', clientsController.updateClient);

router.get('/services', servicesController.getServices);
router.get('/getCategories', servicesController.getCategories);
router.post('/createCategory', servicesController.createCategory);
router.post('/createService', servicesController.createService);
router.put('/updateCategory/:id', servicesController.updateCategory);
router.delete('/deleteCategory/:id', servicesController.deleteCategory);
router.put('/updateService/:id', servicesController.updateService);
router.delete('/deleteService/:id', servicesController.deleteService);

router.get('/stages', stageController.getStages);
router.post('/stages', stageController.createStage);
router.put('/stages/:id', stageController.updateStage);

router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);
router.get('/client/:clientId/orders', orderController.getClientOrders);

router.get('/ordersByCategory', reportsController.getOrdersByCategory);
router.get('/completedOrdersByEmployee', reportsController.getCompletedOrdersByEmployee);
router.get('/clientsWithMostOrders', reportsController.getClientsWithMostOrders);
router.get('/orderStages', reportsController.getOrderStages);
router.get('/averageOrderCompletionTime', reportsController.getAverageOrderCompletionTime);


module.exports = router;
