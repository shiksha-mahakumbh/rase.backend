import { Request, Response } from 'express';
import formidable from 'formidable';  // Directly import the default export from formidable
import { createAbstractSubmission } from '../models/AbstractSubmissionModel';

export const submitAbstract = async (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    console.log('Starting form parsing...'); // Log when form parsing begins

    // Directly use formidable instead of IncomingForm
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err); // Log error details if parsing fails
        return reject(res.status(400).send('File upload failed!'));
      }

      console.log('Form parsing completed. Fields:', fields); // Log the parsed fields
      console.log('Uploaded files:', files); // Log the uploaded files

      const fileFields = files as formidable.Files;
      const fileArray = fileFields.files as formidable.File[] | undefined;

      const { PaperTitle, CorrespondingAuthorEmail, CorrespondingAuthorName, Keywords, ContactNumber, type, CoAuthors } = fields;

      if (!PaperTitle || !CorrespondingAuthorEmail || !CorrespondingAuthorName || !Keywords || !ContactNumber || !fileArray?.length || !type || !CoAuthors) {
        console.error('Missing required fields:', { PaperTitle, CorrespondingAuthorEmail, CorrespondingAuthorName, Keywords, ContactNumber, fileArray, type, CoAuthors });
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

      console.log('Attachments:', { AttachmentsWord, AttachmentsPdf, FeeReceipt });

      try {
        console.log('Attempting to create abstract submission with data:', {
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

        console.log('Abstract submitted successfully!');
        resolve(res.status(200).send('Abstract submitted successfully!'));
      } catch (error) {
        console.error('Error saving to database:', error); // Log error details when saving to the database fails
        reject(res.status(500).send('Error saving submission to the database.'));
      }
    });
  });
};
