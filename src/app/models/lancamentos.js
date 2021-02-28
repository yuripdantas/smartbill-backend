// const mongoose = require('mongoose');
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const LancamentosSchema = new mongoose.Schema({
    nome_lancamento: {
        type: String,
        require: true,
    },
    valor:{
        type: String, 
        require: true,
    },
    pagador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    devedores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



const Lancamentos = mongoose.model('Lancamentos', LancamentosSchema);
module.exports = Lancamentos;