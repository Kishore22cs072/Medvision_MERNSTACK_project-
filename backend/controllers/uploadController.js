import Report from "../models/Report.js";

export const handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const classification = "Normal";
    const accuracy = 90;
    const suggestions = ["No action needed"];

    const rec = await Report.create({
      patientId: null,
      imageUrl: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      classification,
      accuracy,
      suggestions
    });

    return res.json({ message: "Uploaded", report: rec });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload failed" });
  }
};
