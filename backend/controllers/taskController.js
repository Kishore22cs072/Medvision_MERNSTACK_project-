import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, patientId } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });
    const t = await Task.create({ title, description, patientId });
    return res.status(201).json(t);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

