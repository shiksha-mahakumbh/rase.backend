import express from "express";
import multer from "multer";
import path from "path";
import { submitBestPractice } from "../controllers/bestPracticesController";

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
  dest: "public/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
  fileFilter(req, file, cb) {
    const fileTypes = /pdf|png|jpg|jpeg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPG, PNG are allowed."));
    }
  },
});

// POST route for submitting best practices
router.post("/", upload.single("attachment"), submitBestPractice);

export default router;
