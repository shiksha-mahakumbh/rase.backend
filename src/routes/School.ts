// routes/schoolProjectRoutes.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import { submitSchoolProject } from '../controllers/SchoolController';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route for submitting school projects
router.post(
  '/school',
  upload.fields([
    { name: 'projectPpt', maxCount: 1 },
    { name: 'projectVideo', maxCount: 1 },
    { name: 'feeUpload', maxCount: 1 },
  ]),
  submitSchoolProject
);

export default router;
