const mongoose = require('mongoose');

'use strict';

mongoose.connect('mongodb://app:app@localhost:27017/app');

function init() {
    return new Promise((resolve, reject) => {
        let db = mongoose.connection;
        db.on('error', function() {
            reject(new Error('connection error!'));
        });
        db.once('open', function() {
            console.log('open db success!');
            resolve(db);
        });
    });
}

let RecordSchema = mongoose.Schema({
    title: String,
    desc: String,
    url: String,
    city: String,
    unit: Number,
    total: Number,
    last: Number,
    date: String
});

let Record = mongoose.model('Record', RecordSchema);

module.exports = {
    init: init,
    Record: Record
};