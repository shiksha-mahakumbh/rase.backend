import { Request, Response } from 'express';
import formidable from 'formidable';
import { createAbstractSubmission } from '../models/AbstractSubmissionModel';

export const submitAbstract = async (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(res.status(400).send('File upload failed!'));
      }

      const fileFields = files as formidable.Files;
      const fileArray = fileFields.files as formidable.File[] | undefined;

      const { PaperTitle, CorrespondingAuthorEmail, CorrespondingAuthorName, Keywords, ContactNumber, type, CoAuthors } = fields;

      if (!PaperTitle || !CorrespondingAuthorEmail || !CorrespondingAuthorName || !Keywords || !ContactNumber || !fileArray?.length || !type || !CoAuthors) {
        return reject(res.status(400).send('Missing required fields!'));
      }

      const AttachmentsWord = fileArray?.find((file) =>
        file.mimetype && (file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      )?.filepath || null;

      const AttachmentsPdf = fileArray?.find((file) =>
        file.mimetype && file.mimetype === 'application/pdf'
      )?.filepath || null;

      const FeeReceipt = fileArray?.find((file) =>
        file.mimetype && (file.mimetype.includes('image') || file.mimetype === 'application/pdf')
      )?.filepath || null;

      try {
        await createAbstractSubmission({
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
        });

        resolve(res.status(200).send('Abstract submitted successfully!'));
      } catch (error) {
        console.error('Error saving to database:', error);
        reject(res.status(500).send('Error saving submission to the database.'));
      }
    });
  });
};
