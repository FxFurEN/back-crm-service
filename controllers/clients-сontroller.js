const { PrismaClient } = require('@prisma/client');
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

module.exports = {
  getClients,
};
