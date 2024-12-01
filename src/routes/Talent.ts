// src/routes/Talent.ts
import { Router } from "express";
import multer from "multer";
import path from "path";
import { createTalentController } from "../controllers/TalentController";

const router = Router();

const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/", upload.single("attachment"), (req, res, next) => {
  console.log("Received file:", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  createTalentController(req, res);
});

export default router;
