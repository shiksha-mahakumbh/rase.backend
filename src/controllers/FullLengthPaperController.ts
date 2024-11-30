import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { createFullLengthPaper } from '../models/FullLengthPaper';
// Helper function to get file path if file exists
const getFilePath = (fileKey: string, files: { [key: string]: UploadedFile[] }): string | undefined => {
  const fileArray = files[fileKey];
  if (Array.isArray(fileArray) && fileArray.length > 0) {
    const file = fileArray[0]; // Access the first file in the array
    if ('filename' in file) {
      return `/uploads/${file.filename}`;  // TypeScript should now understand that 'file' has the 'filename' property
    }
  }
  return undefined;
};

export const submitPaper = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      PaperTitle,
      CorrespondingAuthorEmail,
      CorrespondingAuthorName,
      CoauthorNames,
      CoauthorEmail,
      Keywords,
      ContactNumber,
    } = req.body;

    // Retrieve file paths from uploaded files
    const files = req.files as { [key: string]: UploadedFile[] };

    const AttachmentsWord = getFilePath('AttachmentsWord', files);
    const AttachmentsPdf = getFilePath('AttachmentsPdf', files);
    const AttachmentsPpt = getFilePath('AttachmentsPpt', files);
    const FeeReceipt = getFilePath('FeeReceipt', files);

    // Create the new paper record in the database
    const result = await createFullLengthPaper({
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
      FeeReceipt,
    });

    // Return success response with the inserted paper's ID
    res.status(201).json({
      message: 'Paper submitted successfully!',
      paperId: result,  // result contains insertId
    });
  } catch (error) {
    console.error('Error submitting paper:', error);
    res.status(500).json({
      message: 'Something went wrong while submitting the paper.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
