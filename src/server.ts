import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fileUpload from 'express-fileupload'; // File upload middleware
import Abstract from './routes/Abstract'; 
import bestPracticesRoute from "./routes/bestPractices";// Routes for accommodation
import Accomodation from './routes/Accomodation'
import Conclave from './routes/conclaveForm'
import Delegate from './routes/delegateForm'
import FullPaper from './routes/FullLengthPaper'
import Institution from './routes/InstitutionRoute'
import NGO from './routes/NGORoute'
import hei from './routes/HEI'
import organizer from './routes/Organizer'
import school from './routes/School'
import talent from './routes/Talent'
import volunteer from './routes/Volunteer'
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(fileUpload()); // Middleware for handling file uploads

// Serve static files (like the uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/AbstractSubmission', Abstract);
app.use('/talent',talent);
app.use('/organizer', organizer);
app.use('/Accomodation', Accomodation);
app.use('/Conclave', Conclave);
app.use('/FullPaper', FullPaper);
app.use('/HEI', hei);
app.use('/Institution', Institution);
app.use('/delegate', Delegate);
app.use('/ngo', NGO);
app.use('/school', school);
app.use('/volunteer', volunteer);
app.use("/api/best-practices", bestPracticesRoute);
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
