import { Request, Response } from 'express';
import path from 'path';
import { createAccommodation } from '../models/AccomodationModel';

export const submitAccommodation = async (req: Request, res: Response) => {
  try {
    // Manually validate input
    const {
      name,
      email,
      ContactNumber,
      Designation,
      Delegate,
      Delegatetype,
      event,
      accommodationtype,
      accommodationdate,
    } = req.body;

    // Check for missing fields
    if (
      !name || 
      !email || 
      !ContactNumber || 
      !Designation || 
      !Delegate || 
      !Delegatetype || 
      !event || 
      !accommodationtype || 
      !accommodationdate
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Basic validation for email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate contact number format (basic validation for now, can be more specific)
    const contactNumberRegex = /^[0-9]{10}$/;
    if (!contactNumberRegex.test(ContactNumber)) {
      return res.status(400).json({ message: 'Invalid contact number format' });
    }

    // Handle file upload (assuming the file is saved in the 'uploads' directory)
    const feeReceipt = req.file;
    if (!feeReceipt) {
      return res.status(400).json({ message: 'Please upload a fee receipt' });
    }

    // Save the file path to the database (stored in 'uploads' directory)
    const feeReceiptPath = path.join('/uploads/Accomodations', feeReceipt.filename);

    // Create the accommodation in the database
    const accommodationData = {
      name,
      email,
      ContactNumber,
      Designation,
      Delegate,
      Delegatetype,
      event,
      accommodationtype,
      accommodationdate,
      FeeReceipt: feeReceiptPath,
    };

    const result = await createAccommodation(accommodationData);

    // Send success response with result
    res.status(201).json(result);
  } catch (error) {
    console.error('Error submitting accommodation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
