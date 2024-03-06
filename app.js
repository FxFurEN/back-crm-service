const express = require('express');
const clientsRoutes = require('./routes/routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/clients', clientsRoutes);

module.exports = app;
