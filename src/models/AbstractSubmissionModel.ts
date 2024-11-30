// models/AbstractSubmission.ts

import { query } from '../utils/db'; // Import the query function for interacting with the DB

export const createAbstractSubmission = async (submissionData: any) => {
  const {
    PaperTitle,
    CorrespondingAuthorEmail,
    CorrespondingAuthorName,
    Keywords,
    ContactNumber,
    AttachmentsWord,
    AttachmentsPdf,
    FeeReceipt,
    type,
    CoAuthors,
  } = submissionData;

  try {
    const result = await query(
      `INSERT INTO AbstractSubmission 
       (PaperTitle, CorrespondingAuthorEmail, CorrespondingAuthorName, Keywords, ContactNumber, AttachmentsWord, AttachmentsPdf, FeeReceipt, type, CoAuthors)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?) RETURNING id`,
      [
        PaperTitle,
        CorrespondingAuthorEmail,
        CorrespondingAuthorName,
        Keywords,
        ContactNumber,
        AttachmentsWord,
        AttachmentsPdf,
        FeeReceipt,
        type,
        JSON.stringify(CoAuthors),
      ]
    );

    return result;
  } catch (error) {
    throw new Error('Error saving abstract submission to the database');
  }
};
