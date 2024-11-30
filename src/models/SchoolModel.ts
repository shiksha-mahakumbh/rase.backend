// models/SchoolProject.ts
import { query } from '../utils/db'; // Import the query function

interface Participant {
  name: string;
  age: number;
}

interface SchoolProject {
  projectName: string;
  projectDescription: string;
  schoolName: string;
  schoolAddress: string;
  teamSize: number;
  participants: Participant[];
  projectPpt: string;
  projectVideo: string;
  feeUpload: string;
}

class SchoolProjectModel {
  // Method to insert a new project into the database
  static async createProject(projectData: SchoolProject): Promise<any> {
    const {
      projectName,
      projectDescription,
      schoolName,
      schoolAddress,
      teamSize,
      participants,
      projectPpt,
      projectVideo,
      feeUpload,
    } = projectData;

    const queryText = `
      INSERT INTO school_projects (projectName, projectDescription, schoolName, schoolAddress, teamSize, participants, projectPpt, projectVideo, feeUpload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      projectName,
      projectDescription,
      schoolName,
      schoolAddress,
      teamSize,
      JSON.stringify(participants), // Store participants as JSON string
      projectPpt,
      projectVideo,
      feeUpload,
    ];

    try {
      const result = await query(queryText, values);
      return result; // Returns the result from MySQL (usually the inserted row details)
    }  catch (error) {
        console.error('Error during project submission:', error);
        
      }
  }
}

export { SchoolProjectModel };
