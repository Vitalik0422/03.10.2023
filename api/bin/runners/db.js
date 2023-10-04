const mongoose = require('mongoose')
const db = require('../../storages/db')


const init = () => new Promise((resolve, reject) => {
    const MONGO_URL = 'mongodb+srv://vitaliy19980422:rootroot@cluster0.uftxgn1.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(MONGO_URL);

    db.once('error', (err) => {
        console.log('BD ERR:', err);
    });

    db.once('open', () => {
        console.log('Connected to DB');
        resolve();
    });

    db.once('close', () => {
        // уведомление для логов
        console.log('Close connected to DB');
    });
});

module.exports = init;
