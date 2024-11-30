// controllers/SchoolProjectController.ts
import { Request, Response } from 'express';
import { SchoolProjectModel } from '../models/SchoolModel'; // Import the model

// POST request to handle the project submission
export const submitSchoolProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      projectName,
      projectDescription,
      schoolName,
      schoolAddress,
      teamSize,
      participants,
    } = req.body;

    // Type assertion for req.files
    const files = req.files as {
      projectPpt?: Express.Multer.File[];
      projectVideo?: Express.Multer.File[];
      feeUpload?: Express.Multer.File[];
    };

    // Validate all required fields and file uploads
    if (
      !projectName ||
      !projectDescription ||
      !schoolName ||
      !schoolAddress ||
      !teamSize ||
      !participants ||
      !files?.projectPpt?.[0] ||
      !files?.projectVideo?.[0] ||
      !files?.feeUpload?.[0]
    ) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    // Parse participants from stringified JSON
    const parsedParticipants = JSON.parse(participants);

    // Prepare the data for insertion into the database
    const projectData = {
      projectName,
      projectDescription,
      schoolName,
      schoolAddress,
      teamSize,
      participants: parsedParticipants,
      projectPpt: files.projectPpt[0].path,
      projectVideo: files.projectVideo[0].path,
      feeUpload: files.feeUpload[0].path,
    };

    // Call the model to insert the project into the database
    const result = await SchoolProjectModel.createProject(projectData);

    // Return a success response
    res.status(201).json({ message: 'Project submitted successfully!', data: result });
  } catch (error) {
    console.error('Error during project submission:', error);
    res.status(500).json({ message: 'Failed to submit the project.' });
  }
};
