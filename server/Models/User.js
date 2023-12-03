const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, {
    collection: 'users'
});

module.exports = mongoose.models.users || mongoose.model('users', usersSchema);
