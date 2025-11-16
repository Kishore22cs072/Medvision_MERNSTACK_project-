import Report from "../models/Report.js";
import Patient from "../models/Patient.js";



export const uploadAndGenerateReport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image file required" });

    const { patientId, name, age, gender, notes } = req.body;
    let patient = null;

    if (patientId) {
      patient = await Patient.findById(patientId);
      if (!patient) return res.status(404).json({ message: "Patient not found" });
    } else {
      if (!name) return res.status(400).json({ message: "Patient name required when patientId not provided" });
      patient = await Patient.create({ name, age, gender, notes });
    }

    const classes = ["Normal", "Pneumonia", "Tuberculosis", "COVID-19", "Bronchitis"];
    const classification = classes[Math.floor(Math.random() * classes.length)];
    const accuracy = Math.floor(Math.random() * 20) + 80; 
    const suggestions = [
      "Follow up with specialist",
      "Schedule follow-up imaging if symptoms persist",
      "Maintain hydration and rest"
    ];

    const rec = await Report.create({
      patientId: patient._id,
      imageUrl: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      classification,
      accuracy,
      suggestions
    });

    return res.json({
      message: "Report generated",
      patient: { id: patient._id, name: patient.name },
      report: rec
    });
  } catch (err) {
    console.error("report error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getReportsByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const reports = await Report.find({ patientId }).sort({ createdAt: -1 });
    return res.json(reports);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
