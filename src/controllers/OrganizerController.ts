import { Request, Response } from 'express'; // Ensure to import express types
import { createOrganizer } from '../models/OrganizerModel';

// Allowed state codes for validation
const stateCodes = {
  PB001: "Punjab",
  HR001: "Haryana",
  HP001: "Himachal Pradesh",
  JK001: "J&K",
  DL001: "Delhi",
};

// POST handler for organizer registration
export async function POST(req: Request, res: Response): Promise<Response> {
  try {
    const { name, phone, designation, institution, duty, email, accommodation, stateCode } = req.body;

    // Validate state code
    if (!stateCodes[stateCode as keyof typeof stateCodes]) {
      return res.status(400).json({ message: 'Invalid state code. Please enter a valid state code.' });
    }

    // Validate mandatory fields
    if (!name || !phone || !designation || !institution || !duty || !accommodation) {
      return res.status(400).json({ message: 'Please fill all mandatory fields.' });
    }

    // Prepare data for insertion into the database
    const newOrganizer = await createOrganizer({
      name,
      phone,
      designation,
      institution,
      duty,
      email,
      accommodation,
      state: stateCodes[stateCode as keyof typeof stateCodes],
      stateCode,
    });

    // Return success message with the new organizer details
    return res.status(201).json({
      message: 'Registration successful!',
      organizer: newOrganizer,
    });
  } catch (error) {
    console.error('Error processing registration:', error);
    return res.status(500).json({
      message: 'An error occurred during registration. Please try again later.',
    });
  }
}
