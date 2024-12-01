import { query } from "../utils/db"; // Import query function from utils/db

// Function to insert talent data into the database
export const createTalent = async (talentData: {
  name: string;
  talentName: string;
  institutionName: string;
  talentType: string;
  email: string;
  contactNumber: string;
  description: string;
  attachment: string;
}) => {
  const { name, talentName, institutionName, talentType, email, contactNumber, description, attachment } = talentData;

  // Data validation
  if (!name || !talentName || !institutionName || !talentType || !email || !contactNumber || !description) {
    throw new Error("All fields are required.");
  }

  // SQL query to insert data into the database
  const sql = `
    INSERT INTO talents (name, talent_name, institution_name, talent_type, email, contact_number, description, attachment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Values to be inserted
  const values = [name, talentName, institutionName, talentType, email, contactNumber, description, attachment];

  try {
    // Execute the query to insert the talent data
    const result = await query(sql, values);
    return result; // Return the result (e.g., inserted ID or confirmation)
  } catch (error: any) {
    console.error("Error in creating talent:", error);
    
    // Enhance error details with specific information
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error("Talent with the same name or email already exists.");
    }

    throw new Error("Failed to create talent in the database. Please try again later.");
  }
};
