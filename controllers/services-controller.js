const { PrismaClient } = require('@prisma/client');
const { v4: uuid } = require('uuid');
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
        id: uuid(),
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
          id: uuid(),
          name: category,
        },
      });
      categoryId = newCategory.id;
    }
    const newService = await prisma.service.create({
      data: {
        id: uuid(),
        name: service,
        price: parseFloat(price),
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


const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!existingCategory) {
      res.status(404).json({ error: 'Категория не найдена' });
      return;
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name
      },
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Не удалось обновить категорию' });
  }
};


const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Не удалось удалить категорию' });
  }
};


const updateService = async (req, res) => {
  const serviceId = req.params.id;
  const { name, price, category } = req.body;

  try {
    const existingService = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!existingService) {
      res.status(404).json({ error: 'Услуга не найдена' });
      return;
    }

    const existingCategory = await prisma.category.findFirst({
      where: { name: category },
    });

    let categoryId;
    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: {
          id: uuid(),
          name: category,
        },
      });
      categoryId = newCategory.id;
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        name,
        price: parseFloat(price),
        category: {
          connect: { id: categoryId },
        },
      },
    });

    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Unable to update service' });
  }
};

module.exports = {
  getServices,
  getCategories,
  createCategory,
  createService,
  updateCategory,
  deleteCategory, 
  updateService
}
