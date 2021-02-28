// const mongoose = require('mongoose');
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const BillSchema = new mongoose.Schema({
    nome_da_conta: {
        type: String,
        require: true,
    },
    user_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    participantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    
    lancamentos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lancamentos',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;