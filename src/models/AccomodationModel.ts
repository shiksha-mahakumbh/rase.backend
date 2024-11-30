// src/models/AbstractSubmissionModel.ts

import { query } from '../utils/db'; // Assuming you have a query function for DB interaction

// Function definition
export const addAccommodation = async (accommodationData: any): Promise<any> => {
  const sql = `
    INSERT INTO accommodations 
    (name, email, contactNumber, designation, delegate, delegateType, event, accommodationType, accommodationDate, feeReceiptUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    accommodationData.name,
    accommodationData.email,
    accommodationData.contactNumber,
    accommodationData.designation,
    accommodationData.delegate,
    accommodationData.delegateType,
    accommodationData.event,
    accommodationData.accommodationType,
    accommodationData.accommodationDate,
    accommodationData.feeReceiptUrl,
  ];

  // Execute the query and return results
  const results = await query(sql, values);
  return results; // Return the entire result, not just insertId
};
