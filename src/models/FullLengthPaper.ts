import { query } from '../utils/db'; // Assuming you have a utility to run SQL queries

// Define the FullLengthPaper attributes interface
interface FullLengthPaperAttributes {
  id: number;
  PaperTitle: string;
  CorrespondingAuthorEmail: string;
  CorrespondingAuthorName: string;
  CoauthorNames?: string;
  CoauthorEmail?: string;
  Keywords?: string;
  ContactNumber?: string;
  AttachmentsWord?: string|null;  // Type can be `string | undefined`
  AttachmentsPdf?: string|null;   // Type can be `string | undefined`
  AttachmentsPpt?: string|null;   // Type can be `string | undefined`
  FeeReceipt?: string|null;      // Type can be `string | undefined`
}

// Define creation attributes interface
interface FullLengthPaperCreationAttributes extends Omit<FullLengthPaperAttributes, 'id'> {}

// Function to insert data into the `full_length_papers` table
const createFullLengthPaper = async (data: FullLengthPaperCreationAttributes) => {
  const { 
    PaperTitle, 
    CorrespondingAuthorEmail, 
    CorrespondingAuthorName, 
    CoauthorNames, 
    CoauthorEmail, 
    Keywords, 
    ContactNumber, 
    AttachmentsWord, 
    AttachmentsPdf, 
    AttachmentsPpt, 
    FeeReceipt 
  } = data;

  const sql = `
    INSERT INTO full_length_papers (
      PaperTitle,
      CorrespondingAuthorEmail,
      CorrespondingAuthorName,
      CoauthorNames,
      CoauthorEmail,
      Keywords,
      ContactNumber,
      AttachmentsWord,
      AttachmentsPdf,
      AttachmentsPpt,
      FeeReceipt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    PaperTitle,
    CorrespondingAuthorEmail,
    CorrespondingAuthorName,
    CoauthorNames,
    CoauthorEmail,
    Keywords,
    ContactNumber,
    AttachmentsWord,
    AttachmentsPdf,
    AttachmentsPpt,
    FeeReceipt
  ];

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw new Error('Error inserting data into the database');
  }
};

// Function to get paper by ID from the database (example query)
const getFullLengthPaperById = async (id: number) => {
  const sql = `
    SELECT * FROM full_length_papers WHERE id = ?
  `;
  const values = [id];

  try {
    const result = await query(sql, values);
    return result[0]; // Assuming the result is an array
  } catch (error) {
    console.error('Error retrieving paper:', error);
    throw new Error('Error retrieving paper from the database');
  }
};

export { createFullLengthPaper, getFullLengthPaperById };
