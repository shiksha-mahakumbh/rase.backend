import { Request, Response } from "express";
import { insertConclaveForm, ConclaveForm } from "../models/conclaveFormModel";

export const submitConclaveForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      typeofConclave,
      name,
      designation,
      institutionName,
      email,
      contactNumber,
      address,
      views,
    } = req.body;

    if (
      !typeofConclave ||
      !name ||
      !designation ||
      !institutionName ||
      !email ||
      !contactNumber ||
      !address ||
      !views
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const form: ConclaveForm = {
      typeofConclave,
      name,
      designation,
      institutionName,
      email,
      contactNumber,
      address,
      views,
    };

    const result = await insertConclaveForm(form);

    res.status(200).json({
      message: "Form submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error submitting form:", error);

    if (error instanceof Error) {
      res.status(500).json({
        message: "Error submitting form",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Error submitting form",
        error: "Unknown error occurred",
      });
    }
  }
};
