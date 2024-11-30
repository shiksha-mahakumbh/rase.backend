// src/controllers/VolunteerController.ts
import { Request, Response } from 'express';
import { query } from '../utils/db'; // Import query helper function for database interaction
import { Volunteer } from '../models/VolunteerModel'; // Import Volunteer model (interface)
import path from 'path';
import fs from 'fs';
import { IncomingForm } from 'formidable'; // Import formidable for file handling

// Handle POST request for volunteer registration
export const registerVolunteer = async (req: Request, res: Response): Promise<Response> => {
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'uploads', 'resumes'),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filter: (part) => part.mimetype === 'application/pdf' || part.mimetype === 'image/png' || part.mimetype === 'image/jpeg',
  });

  return new Promise<Response>((resolve, reject) => {
    form.parse(req.body as any, async (err, fields, files) => {
      if (err) {
        return resolve(
          res.status(500).json({ error: 'File upload failed', details: err })
        );
      }

      const { name, Affiliation, email, PhoneNumber, Services, accommodation } = fields;
      const file = files['Attachments'] ? (files['Attachments'] as any)[0] : null;

      // Check if required fields are provided
      if (!name || !Affiliation || !email) {
        return resolve(
          res.status(400).json({ message: 'Please fill all the mandatory fields.' })
        );
      }

      // Handle attachment file URL
      const resumeUrl = file ? `/uploads/resumes/${file.newFilename}` : null;

      try {
        // Insert data into database
        const insertQuery = `
          INSERT INTO volunteers (name, Affiliation, email, PhoneNumber, Services, accommodation, resumeUrl)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          name,
          Affiliation,
          email,
          PhoneNumber,
          Services,
          accommodation,
          resumeUrl,
        ];

        const result = await query(insertQuery, values);

        return resolve(
          res.status(200).json({
            message: 'Volunteer registration successful!',
            volunteer: result,
          })
        );
      } catch (error) {
        console.error('Error during registration:', error);
        return resolve(
          res.status(500).json({ message: 'An error occurred during registration.' })
        );
      }
    });
  });
};
