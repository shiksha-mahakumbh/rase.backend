import { Request, Response } from "express";
import { insertDelegateForm, DelegateForm } from "../models/delegateFormModel";

export const submitDelegateForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, designation, institutionName, email, contactNumber, address, views } = req.body;
  
      if (!name || !designation || !institutionName || !email || !contactNumber || !address || !views) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
  
      // Validate files
      if (!Array.isArray(req.files)) {
        res.status(400).json({ message: "Files are not uploaded or invalid format." });
        return;
      }
  
      const filePaths = req.files.map((file) => {
        if (!file || typeof file.path !== "string") {
          throw new Error("Invalid file format");
        }
        return file.path;
      });
  
      const form: DelegateForm = {
        name,
        designation,
        institutionName,
        email,
        contactNumber,
        address,
        views,
        files: filePaths,
      };
  
      // Insert form data into the database
      const result = await insertDelegateForm(form);
  
      res.status(200).json({ message: "Form submitted successfully!", data: result });
    } catch (error) {
      console.error("Error submitting form:", error);
  
      if (error instanceof Error) {
        res.status(500).json({ message: "Error submitting form", error: error.message });
      } else {
        res.status(500).json({ message: "Error submitting form", error: "Unknown error occurred" });
      }
    }
  };
  