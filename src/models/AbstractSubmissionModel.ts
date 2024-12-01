// src/models/AbstractSubmissionModel.ts
import { query } from "../utils/db";

// Define the AbstractSubmission type interface
export interface AbstractSubmission {
  id?: number;
  PaperTitle: string;
  CorrespondingAuthorEmail: string;
  CorrespondingAuthorName: string;
  CoauthorNames?: string;
  CoauthorEmail?: string;
  Keywords: string;
  ContactNumber: string;
  AttachmentsWord: string;
  AttachmentsPdf: string;
  FeeReceipt: string;
  type: string;
}

// Define the result from the MySQL query (ResultSetHeader or RowDataPacket[])
interface ResultSetHeader {
  insertId: number;
  affectedRows: number;
}

// Model class for handling AbstractSubmission operations
class AbstractSubmissionModel {
  // Create a new AbstractSubmission
  static async create(submission: AbstractSubmission): Promise<AbstractSubmission | null> {
    const queryStr = `
      INSERT INTO submissions (PaperTitle, CorrespondingAuthorEmail, CorrespondingAuthorName, CoauthorNames, CoauthorEmail, Keywords, ContactNumber, AttachmentsWord, AttachmentsPdf, FeeReceipt, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const results = await query<ResultSetHeader>(queryStr, [
      submission.PaperTitle,
      submission.CorrespondingAuthorEmail,
      submission.CorrespondingAuthorName,
      submission.CoauthorNames,
      submission.CoauthorEmail,
      submission.Keywords,
      submission.ContactNumber,
      submission.AttachmentsWord,
      submission.AttachmentsPdf,
      submission.FeeReceipt,
      submission.type,
    ]);

    if (results && 'insertId' in results) {
      return { ...submission, id: results.insertId };
    }

    return null;
  }

  // Find a submission by its ID
  static async findById(id: number): Promise<AbstractSubmission | null> {
    const queryStr = `SELECT * FROM submissions WHERE id = ? LIMIT 1`;
    const rows = await query<AbstractSubmission[]>(queryStr, [id]);

    return Array.isArray(rows) && rows.length ? rows[0] : null;
  }

  // Get all submissions
  static async findAll(): Promise<AbstractSubmission[]> {
    const queryStr = `SELECT * FROM submissions`;
    const rows = await query<AbstractSubmission[]>(queryStr, []);

    return Array.isArray(rows) ? rows : [];
  }
}

export default AbstractSubmissionModel;
