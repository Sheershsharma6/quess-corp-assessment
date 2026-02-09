const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET: Fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// POST: Add a new employee
router.post('/', async (req, res) => {
  const { employeeId, fullName, email, department } = req.body;

  // Basic Server-side Validation
  if (!employeeId || !fullName || !email || !department) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newEmployee = new Employee({ employeeId, fullName, email, department });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Employee ID or Email already exists" });
    }
    res.status(500).json({ message: "Error saving employee" });
  }
});

// DELETE: Remove an employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee" });
  }
});

module.exports = router;