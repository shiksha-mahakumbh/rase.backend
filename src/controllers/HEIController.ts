import { Request, Response } from 'express';
import { createHEIProject } from '../models/HEIModel';  // Import the model for database interaction

// Helper function to get the file path, if exists
const getFilePath = (files: any, fieldName: string): string | null => {
  const file = files?.[fieldName];
  if (!file) return null;
  return `/uploads/${Array.isArray(file) ? file[0].filename : file.filename}`;
};

// Function to handle HEI project submission
export const submitHEIProject = async (req: Request, res: Response) => {
  try {
    const { projectName, projectDescription, instituteName, instituteAddress, teamSize, participants } = req.body;

    // Extract file paths using the helper function
    const projectPptPath = getFilePath(req.files, 'projectPpt');
    const projectVideoPath = getFilePath(req.files, 'projectVideo');
    const feeUploadPath = getFilePath(req.files, 'feeUpload');

    // Validate required fields and files
    if (
      !projectName || !projectDescription || !instituteName || !instituteAddress ||
      !teamSize || !participants || !projectPptPath || !projectVideoPath || !feeUploadPath
    ) {
      return res.status(400).json({ error: 'All fields and file uploads are required.' });
    }

    // Call the model to insert data into the database
    const result = await createHEIProject({
      projectName,
      projectDescription,
      instituteName,
      instituteAddress,
      teamSize,
      participants: JSON.stringify(participants),  // Convert participants to JSON
      projectPptPath,
      projectVideoPath,
      feeUploadPath,
    });

    // Return a success response
    return res.status(200).json({
      message: 'HEI project submitted successfully!',
      project: {
        projectName, projectDescription, instituteName, instituteAddress, teamSize,
        participants, projectPptPath, projectVideoPath, feeUploadPath,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to submit the HEI project.' });
  }
};
