import express from "express";
import multer from "multer";
import path from "path";
import { submitDelegateForm } from "../controllers/delegateFormController";

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Make the filename unique
    },
  }),
});

// POST route for delegate form submission
router.post("/", upload.array("files"), submitDelegateForm);

export default router;
