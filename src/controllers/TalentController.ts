import { Request, Response } from "express";
import { createTalent } from "../models/TalentModel"; // Import the model function for creating talent data
import path from "path";
import fs from "fs";

// Talent creation controller
export const createTalentController = async (req: Request, res: Response) => {
  const { name, talentName, institutionName, talentType, email, contactNumber, description } = req.body;
  
  // Handle the uploaded file (if any)
  const attachment = req.file ? req.file.filename : ""; // File path or empty string if no file

  try {
    // Validation checks (you can add more validation as needed)
    if (!name || !talentName || !institutionName || !email || !contactNumber || !description) {
      return res.status(400).json({ message: "All form fields must be filled out." });
    }

    // Handle file presence
    if (attachment && !fs.existsSync(path.join(__dirname, "../uploads", attachment))) {
      return res.status(400).json({ message: "The uploaded file does not exist or was not uploaded correctly." });
    }

    // Save the talent data into the database (using createTalent function from the model)
    const result = await createTalent({
      name,
      talentName,
      institutionName,
      talentType,
      email,
      contactNumber,
      description,
      attachment
    });

    // Respond with success message
    res.status(200).json({ message: "Talent data submitted successfully!", result });
  } catch (error: unknown) {
    // Enhanced error handling for known and unknown errors
    if (error instanceof Error) {
      console.error("Error creating talent:", error.message); // Log the error message
      res.status(500).json({ message: error.message }); // Send the error message to the client
    } else {
      console.error("Unknown error occurred:", error); // Log the error
      res.status(500).json({ message: "An unknown error occurred" }); // Send a generic message to the client
    }
  }
};
