import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import {
  uploadAndGenerateReport,
  getReportsByPatient,
  generateRandomReportForPatient
} from "../controllers/generateReportController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});
const upload = multer({ storage });

const router = express.Router();


router.post("/upload", upload.single("image"), uploadAndGenerateReport);


router.post("/random", generateRandomReportForPatient);


router.get("/patient/:patientId", getReportsByPatient);

export default router;
