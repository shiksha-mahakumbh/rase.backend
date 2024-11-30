// src/controllers/AccomodationSubmission.ts
import { Request, Response } from 'express';
import { addAccommodation } from '../models/AccomodationModel'; // Importing the named export

export const bookAccommodation = async (req: Request, res: Response) => {
  try {
    const { name, email, contactNumber, designation, delegate, delegateType, event, accommodationType, accommodationDate } = req.body;

    // Handle file upload
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    // Prepare the accommodation data
    const accommodationData = {
      name,
      email,
      contactNumber,
      designation,
      delegate,
      delegateType,
      event,
      accommodationType,
      accommodationDate,
      feeReceiptUrl: file,
    };

    // Insert accommodation booking into the database
    const insertedId = await addAccommodation(accommodationData);
    res.status(201).json({ success: true, message: 'Accommodation booked successfully!', accommodationId: insertedId });
  } catch (err) {
    console.error('Error booking accommodation:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
