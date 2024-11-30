// src/routes/talentRoutes.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import { submitTalent } from '../controllers/TalentController'; // Import the controller

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST route for talent submission
router.post('/talent', upload.single('attachment'), submitTalent);

export default router;
