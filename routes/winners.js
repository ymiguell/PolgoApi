const express = require('express');
const router = express.Router();
const Winner = require('../models/Winner');

const validateWinner = (winner) => {
    return winner.name && winner.prize && winner.date;
};

router.post('/', async (req, res) => {
    const { name, prize, date } = req.body;

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

router.get('/', async (req, res) => {
    try {
        const winners = await Winner.find();
        res.json(winners);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter ganhadores: ' + err.message });
    }
});

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
