import path from "path";
import fs from "fs/promises";
import { Request, Response } from "express";
import { insertBestPractice, BestPractice } from "../models/bestPracticesModel";

export const submitBestPractice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { institutionName, aboutPractices, keyPerson, email, contactNumber, address } = req.body;
    const file = req.file;

    if (!institutionName || !aboutPractices || !keyPerson || !email || !contactNumber || !address) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    let filePath: string | undefined;
    if (file) {
      const uploadDir = path.join(process.cwd(), "/uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      filePath = `/uploads/${file.filename}`;
    }

    const result = await insertBestPractice({
      institutionName,
      aboutPractices,
      keyPerson,
      email,
      contactNumber,
      address,
      attachment: filePath,
    });

    res.status(200).json({ message: "Best practice submitted successfully", data: result });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data to database" });
  }
};
