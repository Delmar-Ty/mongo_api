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
                password: data.password,
                login: JSON.stringify({logged: false, device: 'none'})
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
                if (doc !== null) {
                    const login = JSON.parse(doc.login);
                    res({ exists: true, id: doc._id.toString(), logged: login.logged });
                } else {
                    res({ exists: false });
                }
            } catch (error) {
                console.log(error);
                rej(error);
            }
        });
        return promise;
    },
    getUser: (id) => {
        const promise = new Promise(async (res, rej) => {
            try {
                await mongoose.connect(dbURL);
                const doc = await User.findById(id);
                mongoose.connection.close();
                res(doc);
            } catch (error) {
                console.log(error);
                rej(error);
            }
        });
        return promise
    },
    updateLogin: async (id, data) => {
        try {
            await mongoose.connect(dbURL);
            await User.findByIdAndUpdate(id, { login: data });
            mongoose.connection.close();
        } catch (error) {
            console.log(error);
        }
    },
    loggedOnDevice: async (device) => {
        const promise = new Promise(async (res, rej) => {
            try {
                await mongoose.connect(dbURL);
                const doc = await User.findOne({ login: JSON.stringify({ logged: true, device: device }) });
                mongoose.connection.close();
                if (doc !== null) {
                    doc.login = JSON.parse(doc.login);
                    res(doc);
                } else {
                    res(false);
                }
            } catch (error) {
                console.log(error);
            }
        });

        return promise;
    }
};

exports.db = db;