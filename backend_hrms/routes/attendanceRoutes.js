const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// POST: Mark Attendance
router.post('/', async (req, res) => {
  const { employeeId, date, status } = req.body;

  if (!employeeId || !date || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const record = new Attendance({ employeeId, date, status });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Error saving attendance" });
  }
});

// GET: Fetch attendance for a specific employee
router.get('/:employeeId', async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.params.employeeId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching records" });
  }
});

module.exports = router;