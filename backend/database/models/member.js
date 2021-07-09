const mongoose = require('mongoose');

const schema = mongoose.Schema;

let Member = new Schema({
    MemberName : {
        type: String
    },
    MemberBio : {
        type: String
    },
    MemberAge : {
        type: Number
    }
},{
    collection: 'Member'
});

module.exports = mongoose.model('Member', Member);