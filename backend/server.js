const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For whitelisting react app port
const cors = require('cors');
const { db } = require('./models/campaignModel');
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/npcs', require('./routes/npcRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT || 80, '0.0.0.0');
