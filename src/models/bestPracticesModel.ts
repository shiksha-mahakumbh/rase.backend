import { query } from "../utils/db";

// Define the BestPractice type
export interface BestPractice {
  institutionName: string;
  aboutPractices: string;
  keyPerson: string;
  email: string;
  contactNumber: string;
  address: string;
  attachment?: string;
}

// Insert a new best practice into the database
export const insertBestPractice = async (data: BestPractice) => {
  const sql = `
    INSERT INTO best_practices (
      institution_name, about_practices, key_person, email, contact_number, address, attachment
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.institutionName,
    data.aboutPractices,
    data.keyPerson,
    data.email,
    data.contactNumber,
    data.address,
    data.attachment || null,
  ];
  return await query<{ insertId: number }>(sql, values);
};
