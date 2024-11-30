import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool with valid properties
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,  // Ensure these values are set in your .env file
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true, // Wait for available connection if pool is busy
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queue limit
});

// Wrap the pool query in a Promise for async usage
export const query = <T = mysql.RowDataPacket[]>(sql: string, values: any[]): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        reject(error); // Reject the promise with the error
      } else {
        resolve(results as T); // Ensure that results match type `T`
      }
    });
  });
};

// Function to close all connections when the app shuts down
export const closePool = () => {
  pool.end((err) => {
    if (err) {
      console.error('Error closing MySQL pool:', err);
    } else {
      console.log('MySQL pool closed successfully.');
    }
  });
};
