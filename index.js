const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const client = require('./db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const crmRoutes = require('./routes/crmRoutes');

app.use('/crm', crmRoutes);

client.connect(() => console.log('DB is connected'));
app.listen(3300, () => {
    console.log("Server started on port 3300");
});
