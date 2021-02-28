// const mongoose = require('mongoose');
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const ParticipantesSchema = new mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Participantes = mongoose.model('Participantes', ParticipantesSchema);
module.exports = Participantes;