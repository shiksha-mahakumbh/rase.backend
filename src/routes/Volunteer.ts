// src/routes/volunteerRoute.ts
import { Router } from 'express';
import { registerVolunteer } from '../controllers/VolunteerController';

const router = Router();

// POST request for volunteer registration
router.post('/register', registerVolunteer);

export default router;
