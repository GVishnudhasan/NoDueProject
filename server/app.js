// Necessary Package Imports

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Server Works!" });
});

export default app;