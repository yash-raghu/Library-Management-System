const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');

}

const Chat=require("./models/chat.js");
let chats=[
    {
        name:"X",
        book:"Y",
        aut:"Both are Same",
        created_at: new Date(),
    },
];

Chat.insertMany(chats);