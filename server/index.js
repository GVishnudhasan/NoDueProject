import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//Setting up config file
dotenv.config({ path: "config/config.env" });

//Connect to database
// connectDatabase();

const PORT = process.env.PORT || 3000;
//Starting the server
const server = app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`error: ${err.message}`);
    console.log(`Shutting down the server`);
    server.close(() => {
      process.exit(1);
    });
  });