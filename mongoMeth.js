const mongoose = require('mongoose');
const { User } = require('./schema');
const dbURL = 'mongodb+srv://Delmar:Something123@cluster0.tg0mxdx.mongodb.net/User';

const db = {
    createUser: async (data) => {
        try {
            await mongoose.connect(dbURL);
            const doc = new User({
                fName: data.fName,
                lName: data.lName,
                email: data.email,
                campus: data.campus,
                password: data.password
            });

            await doc.save();
            mongoose.connection.close();
        } catch (error) {
            console.log(error);
        }
    },
    UserExists: (email) => {
        const promise = new Promise(async (res, rej) => {
            try {
                await mongoose.connect(dbURL);
                const doc = await User.findOne({ email: email });
                mongoose.connection.close();
                console.log(doc._id);
                if (doc !== null) {
                    res(true);
                } else {
                    res(false);
                }
            } catch (error) {
                console.log(error);
                rej(error);
            }
        });
        return promise;
    }
};

exports.db = db;