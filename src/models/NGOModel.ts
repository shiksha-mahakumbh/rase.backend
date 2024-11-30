// src/models/NGOModel.ts
import { query } from '../utils/db'; // Import the query function from utils/db

// Define the NGO model for database operations
export const createNgo = async (ngoData: {
  name: string;
  RegistrationNo: string;
  email: string;
  Website?: string;
  PhoneNumber?: string;
  Contribution?: string;
  Attachments?: string;
  accommodation: string;
}) => {
  const { name, RegistrationNo, email, Website, PhoneNumber, Contribution, Attachments, accommodation } = ngoData;

  const queryStr = `
    INSERT INTO ngos (name, RegistrationNo, email, Website, PhoneNumber, Contribution, Attachments, accommodation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const result = await query(queryStr, [
      name,
      RegistrationNo,
      email,
      Website || null,
      PhoneNumber || null,
      Contribution || null,
      Attachments || null,
      accommodation,
    ]);

    return result;
  } catch (error: unknown) {
    // Type the error as Error to access its message property safely
    if (error instanceof Error) {
      throw new Error(`Error creating NGO: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while creating NGO');
    }
  }
};
