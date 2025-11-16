import Patient from "../models/Patient.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    return res.json(patients);
  } catch (err) {
    console.error("getAllPatients error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const createPatient = async (req, res) => {
  try {
    const { name, age, gender, notes } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const patient = await Patient.create({ name, age, gender, notes });
    return res.status(201).json(patient);
  } catch (err) {
    console.error("createPatient error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    return res.json(patient);
  } catch (err) {
    console.error("getPatientById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
