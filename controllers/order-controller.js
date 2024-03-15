const { PrismaClient } = require('@prisma/client');
const { v4: uuid } = require('uuid');
const prisma = new PrismaClient();

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        employee: true,
        service: true,
        client: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Unable to fetch orders' });
  }
};

const createOrder = async (req, res) => {
  const { comments, leadTime, employeeId, serviceId, clientId } = req.body;

  try {
    const order = await prisma.orders.create({
      data: {
        id: uuid(),
        comments,
        leadTime,
        employeeId,
        serviceId,
        clientId,
      },
    });
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
};

const getClientOrders = async (req, res) => {
    const { clientId } = req.params;
  
    try {
      const clientOrders = await prisma.orders.findMany({
        where: {
          clientId: clientId,
        },
        include: {
          service: true,
          employee: true,
        },
      });
      res.json(clientOrders);
    } catch (error) {
      console.error('Error fetching client orders:', error);
      res.status(500).json({ error: 'Unable to fetch client orders' });
    }
  };

module.exports = {
  getOrders,
  createOrder,
  getClientOrders,
};
