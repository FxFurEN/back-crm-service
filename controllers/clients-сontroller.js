const { PrismaClient } = require('@prisma/client');
const { v4: uuid } = require('uuid');
const prisma = new PrismaClient();

const getClients = async (req, res) => {
  try {
    const clients = await prisma.clients.findMany();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Unable to fetch clients' });
  }
};

const createClient = async (req, res) => {
  const { name, phone, email, initials, unp, isLegalEntity } = req.body;

  try {
    if (isLegalEntity) {
      const existingClient = await prisma.clients.findUnique({ where: { unp } });
      if (existingClient) {
        res.status(400).json({ error: 'УНП уже существует' });
        return;
      }
    }

    const client = await prisma.clients.create({
      data: {
        id: uuid(),
        name,
        phone,
        email,
        initials,
        unp,
        sign: isLegalEntity
      },
    });
    res.json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Unable to create client' });
  }
};



module.exports = {
  getClients,
  createClient,
};
