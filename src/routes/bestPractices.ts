import express from "express";
import multer from "multer";
import path from "path";
import { submitBestPractice } from "../controllers/bestPracticesController"; // Importing the controller for best practices

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
  dest: "/uploads", // Specify the destination for file uploads
  limits: {
    fileSize: 10 * 1024 * 1024, // Max file size 10MB
    fieldSize: 50 * 1024 * 1024, // Max field size (e.g., 50MB)
  },
  fileFilter(req, file, cb) {
    const fileTypes = /pdf|png|jpg|jpeg/; // Allowed file types (PDF, PNG, JPG, JPEG)
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
    const mimetype = fileTypes.test(file.mimetype); // Check MIME type
    if (extname && mimetype) {
      cb(null, true); // Proceed if valid file type
    } else {
      cb(new Error("Invalid file type. Only PDF, JPG, PNG are allowed.")); // Reject invalid files
    }
  },
});


// POST route for submitting best practices, with file upload functionality
router.post("/", upload.single("attachment"), submitBestPractice); // Upload file as 'attachment' field

export default router;
