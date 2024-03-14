const { PrismaClient } = require('@prisma/client');
const { v4: uuid } = require('uuid');
const prisma = new PrismaClient();

const getAllPositions = async (req, res) => {
  try {
    const positions = await prisma.position.findMany();
    res.json(positions);
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ error: 'Unable to fetch positions' });
  }
};

const createPosition = async (req, res) => {
  const { name } = req.body;

  try {
    const newPosition = await prisma.position.create({
      data: {
        id: uuid(),
        name,
      },
    });
    res.json(newPosition);
  } catch (error) {
    console.error('Error creating position:', error);
    res.status(500).json({ error: 'Unable to create position' });
  }
};

const updatePosition = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedPosition = await prisma.position.update({
      where: {
        id: (id),
      },
      data: {
        name,
      },
    });
    res.json(updatedPosition);
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ error: 'Unable to update position' });
  }
};

module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
};
