const mongoose = require('mongoose');
const chatSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    book:{
        type: String,
        required: true,
    },
    aut:{
        type: String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    },

});

const Chat=mongoose.model("Chat",chatSchema);
module.exports= Chat;