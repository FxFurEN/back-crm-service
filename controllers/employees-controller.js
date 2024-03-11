const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        position: true,
      },
    });
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Unable to fetch employees' });
  }
};

const createEmployee = async (req, res) => {
  const { initials, email, login, password, positionId } = req.body;

  try {
    const employee = await prisma.employee.create({
      data: {
        initials,
        email,
        login,
        password,
        positionId,
      },
    });
    res.json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Unable to create employee' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Unable to delete employee' });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
};
