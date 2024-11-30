import express from 'express';
import multer from 'multer';
import path from 'path';
import { submitHEIProject } from '../controllers/HEIController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the directory where the file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
  },
});

const upload = multer({ storage });

// POST route to submit institution form data
router.post('/', upload.single('feeReceipt'), submitHEIProject);

export default router;
