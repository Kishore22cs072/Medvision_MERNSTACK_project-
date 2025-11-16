import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  uploadAndGenerateReport,
  generateRandomReportForPatient,
  getReportsByPatient
} from "../controllers/generateReportController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
const uploadPath = path.join(__dirname, "..", UPLOAD_DIR);

if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});




router.post("/", upload.single("image"), uploadAndGenerateReport);

router.post("/random", generateRandomReportForPatient);


router.get("/patient/:patientId", getReportsByPatient);

export default router;
