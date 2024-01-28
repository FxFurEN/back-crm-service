const client = require('../db');
class ClientsController{
    async loadClientData(req, res){
        try{
            client.query('SELECT clientid, fioclient, phonenumber, mail, typeclient AS TypeClientID FROM ClientData', (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  const clients = result.rows;
                  res.send(clients);
                }
              });

        }catch(e){

        }
    }
    async addClient(req, res){
        try{
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

        }catch(e){

        }
    }
}


module.exports = new ClientsController();