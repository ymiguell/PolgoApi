const express = require('express');
const router = express.Router();
const Winner = require('../models/Winner');

// Função para validar dados do ganhador
const validateWinner = (winner) => {
    return winner.name && winner.prize && winner.date;
};

// Rota para adicionar um novo ganhador
router.post('/', async (req, res) => {
    const { name, prize, date } = req.body;

    // Validação dos dados do ganhador
    if (!validateWinner(req.body)) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    const newWinner = new Winner({ name, prize, date });

    try {
        const savedWinner = await newWinner.save();
        res.status(201).json(savedWinner);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao salvar o ganhador: ' + err.message });
    }
});

// Rota para obter todos os ganhadores
router.get('/', async (req, res) => {
    try {
        const winners = await Winner.find();
        res.json(winners);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter ganhadores: ' + err.message });
    }
});

// Rota para deletar um ganhador por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedWinner = await Winner.findByIdAndDelete(req.params.id);
        if (!deletedWinner) {
            return res.status(404).json({ message: 'Ganhador não encontrado' });
        }
        res.json({ message: 'Ganhador removido com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar ganhador: ' + err.message });
    }
});

module.exports = router;
