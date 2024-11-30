import { Request, Response } from 'express';
import { createInstitution } from '../models/Institution'; // Import the createInstitution function

// POST route to submit institution form data
export const submitInstitution = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure the form fields from the request body
    const { name, role, email, contactNumber, website, cont, feeAmount } = req.body;

    // Get the feeReceipt file path if a file is uploaded
    const feeReceipt = req.file ? req.file.path : null;

    // Create a new institution entry in the database
    const result = await createInstitution({
      name,
      role,
      email,
      contactNumber,
      website,
      cont,
      feeAmount: parseFloat(feeAmount), // Ensure feeAmount is a number
      feeReceipt,
    });

    // Respond with success message and the result (insertId or other data)
    res.status(201).json({ message: 'Institution data submitted successfully', result });
  } catch (error) {
    console.error('Error submitting institution data: ', error);

    // Assert that the error is of type Error to access its message property
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to submit institution data', error: error.message });
    } else {
      // In case the error is not an instance of Error (fallback)
      res.status(500).json({ message: 'Failed to submit institution data', error: 'Unknown error' });
    }
  }
};
