import { Request, Response } from 'express';
import { IncomingForm } from 'formidable'; // Import formidable for file handling
import path from 'path';
import { createVolunteer } from '../models/VolunteerModel'; // Import createVolunteer model function
import { Volunteer } from '../models/VolunteerModel'; // Import Volunteer interface

// Handle POST request for volunteer registration
export const registerVolunteer = async (req: Request, res: Response): Promise<Response> => {
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'uploads', 'resumes'), // Directory to store uploaded files
    keepExtensions: true, // Keep file extensions
    maxFileSize: 5 * 1024 * 1024, // Max file size (5MB)
    filter: (part) => part.mimetype === 'application/pdf' || part.mimetype === 'image/png' || part.mimetype === 'image/jpeg', // Allowed file types
  });

  return new Promise<Response>((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // Error during form parsing
        console.error("Error in form parsing:", err);
        return resolve(
          res.status(500).json({ error: 'File upload failed', details: err })
        );
      }

      // Extract fields from the parsed body and ensure they are treated as strings
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const Affiliation = Array.isArray(fields.Affiliation) ? fields.Affiliation[0] : fields.Affiliation;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const PhoneNumber = Array.isArray(fields.PhoneNumber) ? fields.PhoneNumber[0] : fields.PhoneNumber;
      const Services = Array.isArray(fields.Services) ? fields.Services[0] : fields.Services;
      const accommodation = Array.isArray(fields.accommodation) ? fields.accommodation[0] : fields.accommodation;
      const file = files['Attachments'] ? (files['Attachments'] as any)[0] : null;

      // Check if required fields are provided
      if (!name || !Affiliation || !email) {
        return resolve(
          res.status(400).json({ message: 'Please fill all the mandatory fields.' })
        );
      }

      // Handle file URL
      const resumeUrl = file ? `/uploads/resumes/${file.newFilename}` : null;

      try {
        // Call the model to insert volunteer data into the database
        const result = await createVolunteer({
          name,
          Affiliation,
          email,
          PhoneNumber,
          Services,
          accommodation,
          resumeUrl,
        });

        // Return success response
        return resolve(
          res.status(200).json({
            message: 'Volunteer registration successful!',
            volunteer: result,
          })
        );
      } catch (error) {
        // Handle database insertion error
        console.error('Error during registration:', error);
        return resolve(
          res.status(500).json({ message: 'An error occurred during registration.' })
        );
      }
    });
  });
};
