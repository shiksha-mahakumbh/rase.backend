// routes/Abstract.ts
import express from "express";
import { submitAbstract } from "../controllers/AbstractSubmission";

const router = express.Router();

// Handle abstract submission
router.post("/", submitAbstract);

export default router;
