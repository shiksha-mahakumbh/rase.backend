import { query } from '../utils/db';  // Import the db query utility

interface HEIProjectData {
  projectName: string;
  projectDescription: string;
  instituteName: string;
  instituteAddress: string;
  teamSize: number;
  participants: string;  // Store participants as a JSON string
  projectPptPath: string | null;
  projectDocPath: string | null;
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
    projectDocPath,
  } = projectData;

  // Check for missing required fields
  if (!projectName || !projectDescription || !instituteName || !instituteAddress || !teamSize || !participants) {
    throw new Error('All required fields must be provided');
  }

  // Ensure that the file paths are not null or undefined
  const pptFilePath = projectPptPath || null;  // If no PPT file path, set to null
  const docFilePath = projectDocPath || null;  // If no document file path, set to null

  const queryStr = `
    INSERT INTO hei_projects (
      projectName, projectDescription, instituteName, instituteAddress,
      teamSize, participants, projectPptPath, projectDocPath
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    // Execute the query to insert the project into the database
    const result = await query(queryStr, [
      projectName,
      projectDescription,
      instituteName,
      instituteAddress,
      teamSize,
      participants,
      pptFilePath,  // Ensure this is either a path or null
      docFilePath,  // Ensure this is either a path or null
    ]);
    console.log({
      projectName,
      projectDescription,
      instituteName,
      instituteAddress,
      teamSize,
      participants,
      pptFilePath,
      docFilePath
    });
    
    // Assuming the result is in the format [RowDataPacket] and contains insertId
    const insertId = result[0].insertId;

    return { insertId };  // Return the insertId
  } catch (error: unknown) {
    // Type assertion to tell TypeScript that error is an instance of Error
    if (error instanceof Error) {
      // Now TypeScript knows that error is an Error object and has a message property
      console.error('Error creating HEI project:', error.message);
      throw new Error(`Error creating HEI project: ${error.message}`);
    } else {
      // In case the error is not an instance of Error, we throw a generic error
      console.error('Unknown error occurred while creating HEI project');
      throw new Error('Unknown error occurred while creating HEI project');
    }
  }
};
