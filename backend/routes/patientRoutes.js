import express from "express";
import { getAllPatients, createPatient, getPatientById } from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.get("/:id", getPatientById);

export default router;
