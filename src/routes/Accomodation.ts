import express from 'express';
import { bookAccommodation} from '../controllers/AccomodationSubmission';

const router = express.Router();

// Route to handle the accommodation booking form submission
router.post('/Accomodation', bookAccommodation);

export default router;
