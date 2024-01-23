const client = require('../db');

const loadClientsData = (req, res) => {
  client.query('SELECT clientid, fioclient, phonenumber, mail, typeclient AS TypeClientID FROM ClientData', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const clients = result.rows;
      res.send(clients);
    }
  });
};

const addClient = (req, res) => {
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
};

const loadClientTypes = (req, res) => {
  client.query('SELECT TypeClientID, NameType FROM TypeClients', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const clientTypes = result.rows;
      res.send(clientTypes);
    }
  });
};

const loadCategories = (req, res) => {
    client.query('SELECT namecategory FROM CategoryGoods', (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const categories = result.rows;
          res.send(categories);
        }
      });
};

const addCategory = (req, res) => {
    const { name } = req.body;
    client.query('INSERT INTO CategoryGoods (NameCategory) VALUES ($1) RETURNING *', [name], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        const newCategory = result.rows[0];
        res.send(newCategory);
      }
    });
};

const loadGoods = (req, res) => {
    client.query('SELECT namegood, retailprice, purchaseprice, article, amount, category  FROM GoodsView', (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const goods = result.rows;
          res.send(goods);
        }
      });
};

const addGoods = (req, res) => {
    const { article, category, name, amount, price, costPrice } = req.body;
    client.query('INSERT INTO Goods (Article, NameGood, Amount, RetailPrice, PurchasePrice, CategoryId) VALUES ($1, $2, $3, $4, $5, (SELECT CategoryID FROM CategoryGoods WHERE NameCategory = $6)) RETURNING *',
      [article, name, amount, price, costPrice, category],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const newGoods = result.rows[0];
          res.send(newGoods);
        }
      });
};

module.exports = {
  loadClientsData,
  addClient,
  loadClientTypes,
  loadCategories,
  addCategory,
  loadGoods,
  addGoods,
};
