// src/controllers/TalentController.ts
import { Request, Response } from 'express';
import { query } from '../utils/db'; // Import query helper function for database interactions
import { Talent } from '../models/TalentModel'; // Import Talent model (interface)

export const submitTalent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      talentName,
      institutionName,
      talentType,
      email,
      contactNumber,
      description,
    }: Talent = req.body; // Typecast the incoming request body to match Talent interface

    // Validate all required fields
    if (
      !name ||
      !talentName ||
      !institutionName ||
      !talentType ||
      !email ||
      !contactNumber ||
      !description ||
      !req.file
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Prepare SQL query to insert new talent data
    const insertQuery = `
      INSERT INTO talents (name, talentName, institutionName, talentType, email, contactNumber, description, attachment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      talentName,
      institutionName,
      talentType,
      email,
      contactNumber,
      description,
      req.file?.path, // Store the file path
    ];

    // Execute the query
    const result = await query(insertQuery, values);

    // Return success response
    return res.status(201).json({ message: 'Talent submitted successfully!', data: result });
  } catch (error) {
    console.error('Error during talent submission:', error);
    return res.status(500).json({ message: 'Failed to submit talent.' });
  }
};
