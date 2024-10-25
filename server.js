const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const winnerRoutes = require('./routes/winners');

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/winners', winnerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
