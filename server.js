const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const winnerRoutes = require('./routes/winners');

dotenv.config();

const app = express();

// Configuração do CORS para permitir apenas o domínio específico
app.use(cors({
    origin: 'https://polgo-landing-page.vercel.app' // Permita apenas seu domínio
}));

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Rota para ganhadores
app.use('/api/winners', winnerRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
