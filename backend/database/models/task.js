const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        trim:true,
        minlength: 3
    },
    _listID:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    Completed:{
        type:Boolean,
        default:false
    }
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
