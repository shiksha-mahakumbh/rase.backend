import express, { Request, Response } from 'express';
import { submitAbstract } from '../controllers/AbstractSubmission'; // Assuming you export the controller function

const router = express.Router();

// POST route for abstract submission
router.post('/', submitAbstract);

export default router;
