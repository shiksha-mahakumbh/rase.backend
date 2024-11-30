// src/routes/NGORoute.ts
import express from 'express';
import { submitNgo } from '../controllers/NGOController'; // Import the submitNgo controller

const router = express.Router();

// POST route to submit NGO form data
router.post('/', submitNgo); // This route will handle the POST request for creating an NGO

export default router;
