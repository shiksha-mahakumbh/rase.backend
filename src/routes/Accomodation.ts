import express from 'express';
import multer from 'multer';
import { submitAccommodation } from '../controllers/AccomodationSubmission';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/Accomodation');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define route for handling accommodation form submission
router.post('/', upload.single('FeeReceipt'), submitAccommodation);

export default router;
