const express= require("express");
const app= express();
require('dotenv').config();
const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

const Chat=require("./models/chat.js");

const methodOverride= require("method-override");
app.use(methodOverride("_method"));

const mongoose = require('mongoose');
const URL=process.env.ATLAS_URL;

main().then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(URL);

}

// let chat1= new Chat({
    // name:"yashveer",
    // book:"singh",
    // aut:"dhgjf",
    // created_at: new Date(),
// });
// 
// chat1.save().then((res)=>{
    // console.log(res);
// })
// .catch((err)=>{
// console.log(err);
// })
app.listen(8080,()=>{
    console.log("Server is listening at port 8080");
});

app.get("/",(req,res)=>{
    //res.send("Welcome to my database");
    res.render("home.ejs");
});
app.get("/chats", async (req,res)=>{
    let chats= await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
} );
//create route 
app.use(express.urlencoded({extended: true}));


app.post("/chats",(req,res)=>{
    let{name,book,aut}=req.body;
    let newChat= new Chat({
        name:name,
        book:book,
        aut:aut,
        created_at: new Date(),
    });
    newChat.save().then(res=>{
        console.log("Chats was Saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})

// //Edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let {aut:newaut}=req.body;
    let updatedaut=await Chat.findByIdAndUpdate(
        id,
        {aut: newaut},
        {runValidators: true, new :true}
        );
        console.log(updatedaut);
        res.redirect("/chats");

    });

//     //Destroy route
    app.delete("/chats/:id", async (req,res)=>{
        let {id}=req.params;
        let deletedmsg=await Chat.findByIdAndDelete(id);
        console.log(deletedmsg);
        res.redirect("/chats");
    })