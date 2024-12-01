import express from 'express';
import multer from 'multer';
import path from 'path';
import { createHEIProject} from '../models/HEIModel';

const router = express.Router();



// POST route to submit institution form data
router.post('/',  createHEIProject);

export default router;
