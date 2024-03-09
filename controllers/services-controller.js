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


const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Unable to fetch categories' });
  }
};




const createCategory = async (req, res) => {
  const { category } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: category,
      },
    });
    res.json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Unable to create category' });
  }
};

const createService = async (req, res) => {
  const { service, category, price } = req.body;
  try {
    const existingCategory = await prisma.category.findFirst({
      where: { name: category },
    });

    let categoryId;
    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: {
          name: category,
        },
      });
      categoryId = newCategory.id;
    }
    const newService = await prisma.service.create({
      data: {
        name: service,
        price: price,
        category: {
          connect: { id: categoryId },
        },
      },
    });
    res.json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Unable to create service' });
  }
};



module.exports = {
  getServices,
  getCategories,
  createCategory,
  createService,
};
