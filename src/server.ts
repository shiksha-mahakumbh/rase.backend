import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fileUpload from 'express-fileupload'; // File upload middleware
import submitAbstract from './routes/Abstract'; 
import submitBestPractice from "./routes/bestPractices";// Routes for accommodation
import bookAccommodation from './routes/Accomodation'
import submitConclaveForm from './routes/conclaveForm'
import submitDelegateForm from './routes/delegateForm'
import submitPaper from './routes/FullLengthPaper'
import submitInstitution from './routes/InstitutionRoute'
import submitNgo from './routes/NGORoute'
import submitHEIProject from './routes/HEI'
import POST from './routes/Organizer'
import submitSchoolProject from './routes/School'
import submitTalent from './routes/Talent'
import registerVolunteer from './routes/Volunteer'
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(fileUpload()); // Middleware for handling file uploads

// Serve static files (like the uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/AbstractSubmission', submitAbstract);
app.use('/talent',submitTalent);
app.use('/organizer', POST);
app.use('/Accomodation', bookAccommodation);
app.use('/Conclave', submitConclaveForm);
app.use('/FullPaper', submitPaper);
app.use('/HEI', submitHEIProject);
app.use('/Institution', submitInstitution);
app.use('/delegate', submitDelegateForm);
app.use('/ngo', submitNgo);
app.use('/school', submitSchoolProject);
app.use('/volunteer', registerVolunteer);
app.use("/api/best-practices", submitBestPractice);
// Root route (you can also add some basic test routes or a landing page here)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the accommodation booking API!');
});

// Error handling middleware (for any unexpected errors)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
