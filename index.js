const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require('pg');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(
  express.urlencoded(),
  cors({
    origin: 'http://localhost:8080'
  })
);

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

client.connect(() => console.log('DB is connected'));