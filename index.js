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
    origin: 'http://localhost:5173'
  })
);

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


app.get("/loadClientsData", (req, res) => {
    client.query('SELECT clientid, fioclient, phonenumber, mail, typeclient AS TypeClientID FROM ClientData', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        const clients = result.rows;
        res.send(clients);
      }
    });
});
  
  app.post("/addClient", (req, res) => {
    const { FioClient, PhoneNumber, Mail, TypeClientID } = req.body;
  
    const query = 'INSERT INTO clients (FioClient, PhoneNumber, Mail, TypeClientID) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [FioClient, PhoneNumber, Mail, TypeClientID];
  
    client.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        const newClient = result.rows[0];
        res.send(newClient);
      }
    });
  });

  app.get("/loadClientTypes", (req, res) => {
    client.query('SELECT TypeClientID, NameType FROM TypeClients', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        const clientTypes = result.rows;
        res.send(clientTypes);
      }
    });
  });

client.connect(() => console.log('DB is connected'));
app.listen(3300, () => {
    console.log("Server started on port 3300");
  });