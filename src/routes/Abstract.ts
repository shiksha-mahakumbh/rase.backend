import express, { Request, Response } from 'express';
import { submitAbstract } from '../controllers/AbstractSubmission'; // Assuming you export the controller function

const router = express.Router();

// POST route for abstract submission
router.post('/AbstractSubmission', async (req: Request, res: Response) => {
  try {
    // Pass both req and res to submitAbstract
    await submitAbstract(req, res);
  } catch (error) {
    res.status(500).send('Error in submission');
  }
});

export default router;
