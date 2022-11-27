import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { ConnectOptions } from 'mongoose';

import userRoutes from './routes/userRoutes'


const app = express();

// BodyParser methods - limit to be 30mb
app.use(bodyParser.json({limit: "30mb"}));
// urlencoded strings only
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
// CORS - cross origin request - authorizes requests from a different server
// Once the "access-control-allow-origin" header is matched with the request origin header then data can be passed through
app.use(cors());

app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://abhay:Abhay1234@cluster0.4cpfcbs.mongodb.net/?retryWrites=true&w=majority'
const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL) 
    .then(() => app.listen(port, () => {
        console.log('server listening on port'+port)
    }))
    .catch((error)=> console.log(error));

