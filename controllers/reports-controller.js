const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOrdersByCategory = async (req, res) => {
  try {
    const ordersByCategory = await prisma.orders.findMany({
      include: {
        service: {
          include: {
            category: true
          }
        },
        client: true 
      }
    });
    res.json(ordersByCategory);
  } catch (error) {
    console.error('Error fetching orders by category:', error);
    res.status(500).json({ error: 'Unable to fetch orders by category' });
  }
};


const getCompletedOrdersByEmployee = async (req, res) => {
  try {
    const completedOrdersByEmployee = await prisma.orders.findMany({
      where: {
        execution: {
          some: {
            stage: {
              name: 'Completed' // Assuming you have a stage named 'Completed'
            }
          }
        }
      },
      include: {
        employee: true
      }
    });
    res.json(completedOrdersByEmployee);
  } catch (error) {
    console.error('Error fetching completed orders by employee:', error);
    res.status(500).json({ error: 'Unable to fetch completed orders by employee' });
  }
};

const getClientsWithMostOrders = async (req, res) => {
  try {
    const clientsWithMostOrders = await prisma.clients.findMany({
      include: {
        orders: true
      },
      orderBy: {
        orders: {
          _count: 'desc' // Order by the count of orders in descending order
        }
      }
    });
    res.json(clientsWithMostOrders);
  } catch (error) {
    console.error('Error fetching clients with most orders:', error);
    res.status(500).json({ error: 'Unable to fetch clients with most orders' });
  }
};

const getOrderStages = async (req, res) => {
  try {
    const stages = await prisma.stage.findMany();
    res.json(stages);
  } catch (error) {
    console.error('Error fetching order stages:', error);
    res.status(500).json({ error: 'Unable to fetch order stages' });
  }
};

const getAverageOrderCompletionTime = async (req, res) => {
  try {
    const averageCompletionTime = await prisma.execution.aggregate({
      _avg: {
        executionDate: true
      }
    });
    res.json(averageCompletionTime);
  } catch (error) {
    console.error('Error fetching average order completion time:', error);
    res.status(500).json({ error: 'Unable to fetch average order completion time' });
  }
};

module.exports = {
  getOrdersByCategory,
  getCompletedOrdersByEmployee,
  getClientsWithMostOrders,
  getOrderStages,
  getAverageOrderCompletionTime
};
