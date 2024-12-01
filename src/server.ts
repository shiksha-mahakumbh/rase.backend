import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fileUpload from 'express-fileupload'; // File upload middleware
import cors from 'cors'; // Import cors separately
import submitAbstract from './routes/Abstract';
import submitBestPractice from './routes/bestPractices'; // Routes for best practices
import submitAccommodation from './routes/Accomodation';
import submitConclaveForm from './routes/conclaveForm';
import submitDelegateForm from './routes/delegateForm';
import submitPaper from './routes/FullLengthPaper';
import submitInstitution from './routes/InstitutionRoute';
import submitNgo from './routes/NGORoute';
import submitHEIProject from './routes/HEI';
import POST from './routes/Organizer';
import submitSchoolProject from './routes/School';
import submitTalent from './routes/Talent';
import registerVolunteer from './routes/Volunteer';

const app = express();

// CORS Configuration: Allowing specific origins
const corsOptions = {
  origin: '*', // Adjust this to your frontend URL (or use '*' for all origins)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Apply CORS configuration

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// File upload middleware with debugging info and error handling

// Serve static files (like the uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/AbstractSubmission', submitAbstract);
app.use('/talent', submitTalent);
app.use('/organizer', POST);
app.use('/Accomodation', submitAccommodation);
app.use('/Conclave', submitConclaveForm);
app.use('/FullPaper', submitPaper);
app.use('/HEI', submitHEIProject);
app.use('/Institution', submitInstitution);
app.use('/delegate', submitDelegateForm);
app.use('/ngo', submitNgo);
app.use('/school', submitSchoolProject);
app.use('/volunteer', registerVolunteer);
app.use('/api/best-practices', submitBestPractice);

// Root route (you can also add some basic test routes or a landing page here)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the accommodation booking API!');
});

// Error handling middleware (for any unexpected errors)
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  abortOnLimit: true, // Abort upload if file exceeds the limit
  safeFileNames: true, // Ensures safe file names (no special characters)
  preserveExtension: true, // Preserve file extensions
  useTempFiles: true, // Use temp files for large uploads
  tempFileDir: path.join(__dirname, 'tmp'), // Adjust temp directory path
  debug: true, // Enable debugging for file upload
}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // If file size exceeds the limit
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File size is too large. Max allowed size is 10MB.' });
  }

  // General error response
  res.status(500).send('Something went wrong!');
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
