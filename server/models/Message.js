const mongoose = require('mongoose');

const MessageSchame = new mongoose.Schema({

    conversationId: {
        type:String,
    },
    text: {
        type:String,
    },
    sender: {
        type:String,
    }
    



}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchame);