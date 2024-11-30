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

  const queryStr = `
    INSERT INTO institutions (name, role, email, contactNumber, website, cont, feeAmount, feeReceipt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const result = await query(queryStr, [
      name,
      role,
      email,
      contactNumber,
      website,
      cont,
      feeAmount,
      feeReceipt,
    ]);

    // Log the result to understand the return type
    console.log('Query Result:', result);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating institution: ${error.message}`);
    } else {
      throw new Error('Error creating institution: Unknown error');
    }
  }
};
