const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        category: true, 
      },
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Unable to fetch services' });
  }
};

module.exports = {
  getServices,
};
