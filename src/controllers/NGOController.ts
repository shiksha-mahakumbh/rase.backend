// src/controllers/NGOController.ts
import { Request, Response } from 'express';
import { createNgo } from '../models/NGOModel'; // Import the createNgo function from the model

// Controller function to handle NGO creation
export const submitNgo = async (req: Request, res: Response) => {
  try {
    // Destructure the form data from the request body
    const { name, RegistrationNo, email, Website, PhoneNumber, Contribution, Attachments, accommodation } = req.body;

    // Validate the required fields
    if (!name || !RegistrationNo || !email || !accommodation) {
      return res.status(400).json({
        message: 'Please fill all the mandatory fields: name, RegistrationNo, email, and accommodation.',
      });
    }

    // Prepare the NGO data for the model function
    const ngoData = {
      name,
      RegistrationNo,
      email,
      Website,
      PhoneNumber,
      Contribution,
      Attachments,
      accommodation,
    };

    // Call the createNgo function from the model to save the data
    const result = await createNgo(ngoData);

    // Respond with success message and the result
    return res.status(201).json({
      message: 'NGO registered successfully!',
      ngo: result, // The result from the createNgo function (may include the inserted data or some status)
    });
  } catch (error: unknown) {
    // Type the error as Error to access its message property safely
    if (error instanceof Error) {
      console.error('Error creating NGO:', error);
      return res.status(500).json({
        message: 'Failed to create NGO. Please try again.',
        error: error.message,
      });
    } else {
      // If the error is not an instance of Error, handle it as a generic error
      console.error('Unknown error:', error);
      return res.status(500).json({
        message: 'An unknown error occurred while creating NGO.',
        error: 'Unknown error',
      });
    }
  }
};
