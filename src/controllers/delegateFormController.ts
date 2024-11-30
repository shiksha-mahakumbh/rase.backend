import { Request, Response } from "express";
import formidable from "formidable";  // Just import 'formidable' directly
import { insertDelegateForm, DelegateForm } from "../models/delegateFormModel";

export const submitDelegateForm = (req: Request, res: Response): void => {
  const form = formidable({ 
    uploadDir: "./uploads",   // Set the upload directory
    keepExtensions: true,     // Keep file extensions
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form:", err);
      res.status(400).json({ message: "Error parsing the form" });
      return;
    }

    // Extract form fields
    const { name, designation, institutionName, email, contactNumber, address, views } = fields;

    if (!name || !designation || !institutionName || !email || !contactNumber || !address || !views) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Validate files
    if (!files.files || !Array.isArray(files.files)) {
      res.status(400).json({ message: "Files are not uploaded or invalid format." });
      return;
    }

    // Cast to `formidable.File[]` so that TypeScript knows it's an array of files
    const filePaths: string[] = (files.files as formidable.File[]).map((file) => file.filepath);

    // Prepare the form data to insert into the database
    const formData: DelegateForm = {
      name: Array.isArray(name) ? name[0] : name,  // Ensure it's a string
      designation: Array.isArray(designation) ? designation[0] : designation,
      institutionName: Array.isArray(institutionName) ? institutionName[0] : institutionName,
      email: Array.isArray(email) ? email[0] : email,
      contactNumber: Array.isArray(contactNumber) ? contactNumber[0] : contactNumber,
      address: Array.isArray(address) ? address[0] : address,
      views: Array.isArray(views) ? views[0] : views,
      files: filePaths,  // Save file paths as an array
    };

    try {
      // Insert form data into the database
      const result = await insertDelegateForm(formData);
      res.status(200).json({ message: "Form submitted successfully!", data: result });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Type assertion to ensure 'error' is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({ message: "Error submitting form", error: error.message || "Unknown error occurred" });
      } else {
        res.status(500).json({ message: "Error submitting form", error: "Unknown error occurred" });
      }
    }
  });
};
