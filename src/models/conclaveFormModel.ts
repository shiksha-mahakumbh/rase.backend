import { query } from "../utils/db";

// Define the ConclaveForm type
export interface ConclaveForm {
  typeofConclave: string;
  name: string;
  designation: string;
  institutionName: string;
  email: string;
  contactNumber: string;
  address: string;
  views: string;
}

// Insert a new conclave form into the database
export const insertConclaveForm = async (data: ConclaveForm) => {
  const sql = `
    INSERT INTO conclave_forms (
      typeof_conclave, name, designation, institution_name, email, contact_number, address, views
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.typeofConclave,
    data.name,
    data.designation,
    data.institutionName,
    data.email,
    data.contactNumber,
    data.address,
    data.views,
  ];
  return await query<{ insertId: number }>(sql, values);
};
