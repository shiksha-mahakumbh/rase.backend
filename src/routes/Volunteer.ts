import express from 'express';
import { registerVolunteer } from '../controllers/VolunteerController';

const router = express.Router();

// Route for volunteer registration
router.post('/', registerVolunteer);

export default router;
