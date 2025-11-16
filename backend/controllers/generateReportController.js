import Patient from "../models/Patient.js";
import ImageRecord from "../models/ImageRecord.js";

export const uploadAndGenerateReport = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Image file is required" });

    const { patientId } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const conditions = [
      "Pneumonia",
      "Normal",
      "Bronchitis",
      "COVID-19",
      "Tuberculosis"
    ];

    const label = conditions[Math.floor(Math.random() * conditions.length)];
    const accuracy = Math.floor(Math.random() * 21) + 80; 

    const suggestions = [
      "Follow medical guidelines",
      "Schedule follow-up imaging",
      "Consult your doctor for detailed treatment"
    ];

    const record = await ImageRecord.create({
      patientId: patient._id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      classification: { label, accuracy, suggestions }
    });

    res.json({
      message: "Report generated",
      imageUrl: record.filePath,
      classification: label,
      accuracy,
      suggestions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const generateRandomReportForPatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const labels = ["Normal", "Pneumonia", "Tuberculosis", "COVID-19"];
    const label = labels[Math.floor(Math.random() * labels.length)];
    const accuracy = Math.floor(Math.random() * 21) + 80;

    const suggestions = [
      "Regular monitoring advised",
      "Consult a specialist",
      "Follow standard care protocol"
    ];

    res.json({
      message: "Random report generated",
      classification: label,
      accuracy,
      suggestions
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getReportsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const reports = await ImageRecord.find({ patientId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
