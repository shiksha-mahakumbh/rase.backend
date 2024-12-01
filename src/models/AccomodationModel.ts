import mysql from 'mysql2';
import { query } from '../utils/db'; // Assuming your query function is imported from a separate file

export const createAccommodation = async (accommodationData: any): Promise<any> => {
  const sql = `
    INSERT INTO accommodations (name, email, contact_number, designation, delegate, delegate_type, event, accommodation_type, accommodation_date, fee_receipt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    accommodationData.name,
    accommodationData.email,
    accommodationData.ContactNumber,
    accommodationData.Designation,
    accommodationData.Delegate,
    accommodationData.Delegatetype,
    accommodationData.event,
    accommodationData.accommodationtype,
    accommodationData.accommodationdate,
    accommodationData.FeeReceipt
  ];

  try {
    // Query the database, ensuring the correct result structure
    const [results] = await query(sql, values);

    // Check if we have the correct result object
    if (results && results.insertId) {
      return {
        message: 'Accommodation successfully submitted',
        accommodationData, // Return the submitted data as part of the response
      };
    } else {
      throw new Error('Insert ID not found in the result.');
    }
  } catch (error) {
    console.error('Error creating accommodation:', error);
    throw new Error('Error creating accommodation. Please try again later.');
  }
};
