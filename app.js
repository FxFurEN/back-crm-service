const express = require('express');
const clientsRoutes = require('./routes/routes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/crm', clientsRoutes);

module.exports = app;
