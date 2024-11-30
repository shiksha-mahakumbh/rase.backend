import { query } from '../utils/db';  // Import the db query utility

interface HEIProjectData {
  projectName: string;
  projectDescription: string;
  instituteName: string;
  instituteAddress: string;
  teamSize: number;
  participants: string;  // Store as a JSON string
  projectPptPath: string | null;
  projectVideoPath: string | null;
  feeUploadPath: string | null;
}

// Function to insert a new HEI project into the database
export const createHEIProject = async (projectData: HEIProjectData) => {
  const {
    projectName,
    projectDescription,
    instituteName,
    instituteAddress,
    teamSize,
    participants,
    projectPptPath,
    projectVideoPath,
    feeUploadPath
  } = projectData;

  const queryStr = `
    INSERT INTO hei_projects (
      projectName, projectDescription, instituteName, instituteAddress,
      teamSize, participants, projectPptPath, projectVideoPath, feeUploadPath
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    // Use the db query function to execute the insert query
    const result = await query(queryStr, [
      projectName,
      projectDescription,
      instituteName,
      instituteAddress,
      teamSize,
      participants,
      projectPptPath,
      projectVideoPath,
      feeUploadPath,
    ]);

    return result;  // Return the result of the query (e.g., inserted row ID or success)
  } catch (error) {
    // Check if the error is an instance of Error (to safely access the message)
    if (error instanceof Error) {
      console.error('Error inserting HEI project:', error);
      throw new Error(`Error creating HEI project: ${error.message}`);
    } else {
      // If it's not an instance of Error, log the unknown error
      console.error('Unknown error:', error);
      throw new Error('Unknown error occurred while creating HEI project');
    }
  }
};
