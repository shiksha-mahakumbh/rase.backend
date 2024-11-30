import { Request, Response } from 'express';
import { TalentModel } from '../models/TalentModel'; // Import TalentModel class
import { Talent } from '../models/TalentModel'; // Import Talent interface

export const submitTalent = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Destructure the request body and type it as Talent
    const {
      name,
      talentName,
      institutionName,
      talentType,
      email,
      contactNumber,
      description,
    }: Talent = req.body;

    // Check if required fields are provided
    if (
      !name ||
      !talentName ||
      !institutionName ||
      !talentType ||
      !email ||
      !contactNumber ||
      !description ||
      !req.file
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Prepare the talent object to be inserted into the database
    const talentData: Talent = {
      name,
      talentName,
      institutionName,
      talentType,
      email,
      contactNumber,
      description,
      attachment: req.file?.path, // Get the file path for the attachment
    };

    // Call the TalentModel to insert the data into the database
    const result = await TalentModel.submitTalent(talentData);

    // Return a success response
    return res.status(201).json({ message: 'Talent submitted successfully!', data: result });
  } catch (error) {
    console.error('Error during talent submission:', error);
    return res.status(500).json({ message: 'Failed to submit talent.' });
  }
};
