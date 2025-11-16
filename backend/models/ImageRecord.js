import mongoose from "mongoose";

const ImageRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  originalName: { type: String },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  classification: {
    label: { type: String },
    accuracy: { type: Number, default: 0 },
    suggestions: { type: [String], default: [] }
  }
}, { timestamps: true });

export default mongoose.model("ImageRecord", ImageRecordSchema);
