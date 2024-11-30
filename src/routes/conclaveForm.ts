import express from "express";
import { submitConclaveForm } from "../controllers/conclaveFormController";

const router = express.Router();

// POST route to submit a conclave form
router.post("/", submitConclaveForm);

export default router;
