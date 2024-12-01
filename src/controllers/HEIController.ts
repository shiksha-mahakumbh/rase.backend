import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { createHEIProject } from '../models/HEIModel';

interface HEIRequest extends Request {
  files: {
    projectPpt: UploadedFile;
    projectDoc: UploadedFile;
  };
}

// Controller function to create a new HEI project
export const createProject = async (req: HEIRequest, res: Response) => {
  const {
    projectName,
    projectDescription,
    instituteName,
    instituteAddress,
    teamSize,
    participants,
  } = req.body;

  const { projectPpt, projectDoc } = req.files; // Get files from request

  // Ensure both files are provided
  if (!projectPpt || !projectDoc) {
    return res.status(400).json({ message: 'PPT and Document files are required' });
  }

  // Generate unique filenames for the files
  const pptFileName = `${Date.now()}_${projectPpt.name}`;
  const docFileName = `${Date.now()}_${projectDoc.name}`;

  // Define the paths where the files will be saved
  const pptUploadPath = path.join(__dirname, '../uploads', pptFileName);
  const docUploadPath = path.join(__dirname, '../uploads', docFileName);

  try {
    // Move files from temp location to the upload folder
    await projectPpt.mv(pptUploadPath);
    await projectDoc.mv(docUploadPath);
  } catch (err) {
    return res.status(500).json({ message: 'Error uploading files' });
  }

  // Convert participants to JSON string for storage
  const participantsData = JSON.stringify(participants);

  // Prepare project data for insertion
  const projectData = {
    projectName,
    projectDescription,
    instituteName,
    instituteAddress,
    teamSize,
    participants: participantsData,
    projectPptPath: pptUploadPath,
    projectDocPath: docUploadPath,
  };

  try {
    // Call the model to insert the project
    const result = await createHEIProject(projectData);

    return res.status(200).json({
      message: 'Project submitted successfully',
      projectId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Failed to create HEI project' });
  }
};
