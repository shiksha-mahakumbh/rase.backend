import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { submitPaper } from '../controllers/FullLengthPaperController';

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const router = express.Router();

// Route for paper submission
router.post(
  '/',
  upload.fields([
    { name: 'AttachmentsWord', maxCount: 1 },
    { name: 'AttachmentsPdf', maxCount: 1 },
    { name: 'AttachmentsPpt', maxCount: 1 },
    { name: 'FeeReceipt', maxCount: 1 },
  ]),
  submitPaper
);

export default router;
