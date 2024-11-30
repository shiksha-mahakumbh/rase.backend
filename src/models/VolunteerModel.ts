import { query } from '../utils/db'; // Import query helper function for database interaction

// Define the Volunteer interface (model) directly in the same file
export interface Volunteer {
  name: string;
  Affiliation: string;
  email: string;
  PhoneNumber?: string;
  Services?: string;
  accommodation?: string;
  resumeUrl?: string|null;
}

export const createVolunteer = async (volunteerData: Volunteer): Promise<any> => {
  const { name, Affiliation, email, PhoneNumber, Services, accommodation, resumeUrl } = volunteerData;

  const insertQuery = `
    INSERT INTO volunteers (name, Affiliation, email, PhoneNumber, Services, accommodation, resumeUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    Affiliation,
    email,
    PhoneNumber || null,
    Services || null,
    accommodation || null,
    resumeUrl || null,
  ];

  try {
    const result = await query(insertQuery, values);
    return result;
  } catch (error) {
    console.error('Error during volunteer insertion:', error);
    throw new Error('Error inserting volunteer data');
  }
};
