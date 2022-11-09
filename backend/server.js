const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/users', require('./routes/campaignRoutes'));
app.use('/api/shops', require('./routes/campaignRoutes'));
app.use('/api/items', require('./routes/campaignRoutes'));
app.use('/api/npcs', require('./routes/campaignRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
