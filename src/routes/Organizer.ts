// src/routes/organizerRoutes.ts
import { Router } from 'express';
import { POST } from '../controllers/OrganizerController';

const router = Router();

// Define the route for organizer registration (POST)
router.post('/register', POST);

export default router;
