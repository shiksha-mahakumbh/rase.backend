// src/models/OrganizerModel.ts
import { query } from '../utils/db'; // Import the query function from db utility

// Define the structure of the organizer data
export interface OrganizerData {
  name: string;
  phone: string;
  designation: string;
  institution: string;
  duty: string;
  email?: string;
  accommodation: string;
  state: string;
  stateCode: string;
}

// Function to insert a new organizer into the database
export const createOrganizer = async (organizerData: OrganizerData) => {
  const {
    name,
    phone,
    designation,
    institution,
    duty,
    email,
    accommodation,
    state,
    stateCode,
  } = organizerData;

  // Log the incoming data (request)
  console.log('Received organizer data:', {
    name,
    phone,
    designation,
    institution,
    duty,
    email,
    accommodation,
    state,
    stateCode,
  });

  const queryStr = `
    INSERT INTO organizers (name, phone, designation, institution, duty, email, accommodation, state, stateCode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    // Log the query string before executing
    console.log('Executing query:', queryStr);
    const result = await query(queryStr, [
      name,
      phone,
      designation,
      institution,
      duty,
      email || null,
      accommodation,
      state,
      stateCode,
    ]);

    // Log the successful insertion result
    console.log('Organizer inserted successfully:', result);
    return result;
  } catch (error: unknown) {
    // Log the error for debugging
    console.error('Error inserting organizer:', error);
    if (error instanceof Error) {
      throw new Error('Error creating organizer: ' + error.message);
    }
    // If the error is not an instance of Error, we assert a fallback message
    throw new Error('Error creating organizer: An unknown error occurred');
  }
};
