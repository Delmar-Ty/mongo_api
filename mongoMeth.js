const mongoose = require('mongoose');
const { User } = require('./schema');
const dbURL = 'mongodb+srv://Delmar:Something123@cluster0.tg0mxdx.mongodb.net/test';

const db = {
    createUser: (data) => {
        try {
            const doc = new User({
                fName: 'Jim',
                lName: 'Slim',
                email: data.email,
                campus: 'Central',
                password: data.password
            });

            doc.save(error => {
                if (error) throw error;
            });
        } catch (error) {
            console.log(error);
        }
    }
};

exports.db = db;