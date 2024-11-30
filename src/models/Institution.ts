import { query } from '../utils/db'; // Import the query function

// Function to create an institution entry in the database
export const createInstitution = async (institutionData: {
  name: string;
  role: string;
  email: string;
  contactNumber: string;
  website: string;
  cont: string;
  feeAmount: number;
  feeReceipt: string | null;
}) => {
  const { name, role, email, contactNumber, website, cont, feeAmount, feeReceipt } = institutionData;

  // SQL query to insert a new institution
  const queryStr = `
    INSERT INTO institutions (name, role, email, contactNumber, website, cont, feeAmount, feeReceipt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    // Execute the query
    const [result] = await query(queryStr, [
      name,
      role,
      email,
      contactNumber,
      website,
      cont,
      feeAmount,
      feeReceipt,
    ]);

    return result; // Returning result (e.g., insertId, etc.)
  } catch (error) {
    // Assert that the error is of type Error
    if (error instanceof Error) {
      throw new Error(`Error creating institution: ${error.message}`);
    } else {
      // Fallback if the error is not an instance of Error
      throw new Error('Error creating institution: Unknown error');
    }
  }
};
