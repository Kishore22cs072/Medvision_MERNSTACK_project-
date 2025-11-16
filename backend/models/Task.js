import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  patientId: { type: String, default: null },
  classification: {
    label: { type: String },
    accuracy: { type: Number, default: 0 },
    suggestions: { type: [String], default: [] }
  }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);
