import { query } from "../utils/db";

// Define the DelegateForm type
export interface DelegateForm {
  name: string;
  designation: string;
  institutionName: string;
  email: string;
  contactNumber: string;
  address: string;
  views: string;
  files: string[];
}

// Insert a new delegate form into the database
export const insertDelegateForm = async (form: DelegateForm) => {
  const sql = `
    INSERT INTO delegate_forms (name, designation, institution_name, email, contact_number, address, views, files)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    form.name,
    form.designation,
    form.institutionName,
    form.email,
    form.contactNumber,
    form.address,
    form.views,
    JSON.stringify(form.files), // Store file paths as a JSON string
  ];

  return await query(sql, values);
};
