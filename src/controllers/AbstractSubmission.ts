import { Request, Response } from "express";
import AbstractSubmissionModel from "../models/AbstractSubmissionModel";
import multer from "multer";

// Set up file storage and file validation using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/abstracts");
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
}).fields([
  { name: "AttachmentsWord", maxCount: 1 },
  { name: "AttachmentsPdf", maxCount: 1 },
  { name: "FeeReceipt", maxCount: 1 },
]);

export const submitAbstract = async (req: Request, res: Response) => {
  try {
    // Log the incoming body to see the submitted data
    console.log("Received form data:", req.body);

    // Validate incoming data
    const { PaperTitle, CorrespondingAuthorEmail, CorrespondingAuthorName, Keywords, ContactNumber, type } = req.body;

    // Log each individual required field for better debugging
    console.log("PaperTitle:", PaperTitle);
    console.log("CorrespondingAuthorEmail:", CorrespondingAuthorEmail);
    console.log("CorrespondingAuthorName:", CorrespondingAuthorName);
    console.log("Keywords:", Keywords);
    console.log("ContactNumber:", ContactNumber);
    console.log("Type:", type);

    if (!PaperTitle || !CorrespondingAuthorEmail || !CorrespondingAuthorName || !Keywords || !ContactNumber || !type) {
      return res.status(400).json({ message: "Please fill in all required fields!" });
    }

    // Log incoming files
    console.log("Received files:", req.files);

    // Handle file uploads
    const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };

    const AttachmentsWord = files["AttachmentsWord"] ? files["AttachmentsWord"][0].path : '';
    const AttachmentsPdf = files["AttachmentsPdf"] ? files["AttachmentsPdf"][0].path : '';
    const FeeReceipt = files["FeeReceipt"] ? files["FeeReceipt"][0].path : '';

    // Log file paths for debugging
    console.log("AttachmentsWord:", AttachmentsWord);
    console.log("AttachmentsPdf:", AttachmentsPdf);
    console.log("FeeReceipt:", FeeReceipt);

    // Create an abstract submission using the model
    const newSubmission = await AbstractSubmissionModel.create({
      PaperTitle,
      CorrespondingAuthorEmail,
      CorrespondingAuthorName,
      CoauthorNames: req.body.CoauthorNames || null,
      CoauthorEmail: req.body.CoauthorEmail || null,
      Keywords,
      ContactNumber,
      AttachmentsWord,
      AttachmentsPdf,
      FeeReceipt,
      type,
    });

    if (!newSubmission) {
      return res.status(500).json({ message: "Failed to create abstract submission!" });
    }

    res.status(200).json({ message: "Abstract submitted successfully!", submission: newSubmission });
  } catch (error) {
    console.error("Error submitting abstract:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
