const { PrismaClient } = require('@prisma/client');
const { v4: uuid } = require('uuid');
const prisma = new PrismaClient();

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
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
    const order = await prisma.order.create({
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

module.exports = {
  getOrders,
  createOrder,
};
