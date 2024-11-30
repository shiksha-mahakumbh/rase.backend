// src/controllers/OrganizerController.ts
import { NextRequest, NextResponse } from 'next/server';
import { createOrganizer } from '../models/OrganizerModel';

// Allowed state codes for validation
const stateCodes = {
  PB001: "Punjab",
  HR001: "Haryana",
  HP001: "Himachal Pradesh",
  JK001: "J&K",
  DL001: "Delhi",
};

// POST handler for organizer registration
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { name, phone, designation, institution, duty, email, accommodation, stateCode } = body;

    // Validate state code
    if (!stateCodes[stateCode as keyof typeof stateCodes]) {
      return NextResponse.json(
        { message: 'Invalid state code. Please enter a valid state code.' },
        { status: 400 }
      );
    }

    // Validate mandatory fields
    if (!name || !phone || !designation || !institution || !duty || !accommodation) {
      return NextResponse.json(
        { message: 'Please fill all mandatory fields.' },
        { status: 400 }
      );
    }

    // Prepare data for insertion into the database
    const newOrganizer = await createOrganizer({
      name,
      phone,
      designation,
      institution,
      duty,
      email,
      accommodation,
      state: stateCodes[stateCode as keyof typeof stateCodes],
      stateCode,
    });

    // Return success message with the new organizer details
    return NextResponse.json(
      { message: 'Registration successful!', organizer: newOrganizer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration. Please try again later.' },
      { status: 500 }
    );
  }
}
