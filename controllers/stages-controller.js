const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStages = async (req, res) => {
  try {
    const stages = await prisma.stage.findMany();
    res.json(stages);
  } catch (error) {
    console.error('Error fetching stages:', error);
    res.status(500).json({ error: 'Unable to fetch stages' });
  }
};

const createStage = async (req, res) => {
  const { name, color } = req.body;

  try {
    const stage = await prisma.stage.create({
      data: {
        name,
        color,
      },
    });
    res.json(stage);
  } catch (error) {
    console.error('Error creating stage:', error);
    res.status(500).json({ error: 'Unable to create stage' });
  }
};

const updateStage = async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;

  try {
    const updatedStage = await prisma.stage.update({
      where: { id },
      data: { name, color },
    });
    res.json(updatedStage);
  } catch (error) {
    console.error('Error updating stage:', error);
    res.status(500).json({ error: 'Unable to update stage' });
  }
};

module.exports = {
  getStages,
  createStage,
  updateStage,
};
