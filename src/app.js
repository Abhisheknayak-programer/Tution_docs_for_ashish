const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
require("../db/conn");
const hbs = require("hbs");
const chalk = require("chalk");
const Regester = require("../models/registration");
const bcrypt = require("bcryptjs");
const Contact = require("../models/contact");
const Jobpost = require("../models/postjob");
const ProfileUpadte = require("../models/editprofile");
const Portfolio = require("../models/editportfolio");
const SellArt = require("../models/sellart");
const SellToAuction = require("../models/auction");

// Path Of The Folders
const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const Partials_path = path.join(__dirname,"../templates/partials");

app.use(express.static(publicPath));

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(Partials_path);



// Need For Post Requests To Convert The Form to Json Format
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get("/",(req,res)=>{
    res.render("signup");
});


app.post("/",async(req,res)=>{
    try {
    const UserData = new Regester({
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile,
        password : req.body.password,
        cpassword : req.body.cpassword
    });

    if(UserData.password === UserData.cpassword){
        const UserDataSaver = await UserData.save();
        console.log(UserDataSaver);
        res.status(201).render("redirection");
    }else{
        res.send("Passwords are not matching");
    }

    } catch (error) {
       res.status(400).send(error);
    }
});



app.get("/login",(req,res)=>{
    res.render("login");
});



app.get("/about",(req,res)=>{
    res.render("about");
});



app.get("/services",(req,res)=>{
    res.render("services");
});



app.get("/redirection",(req,res)=>{
    res.render("redirection");
})


app.get("/artistpackage",(req,res)=>{
    res.render("artistpackages")
});

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.post("/contact",async(req,res)=>{
    try {

        const ContactData = new Contact({
            name : req.body.name,
            email : req.body.email,
            number : req.body.number,
            subject : req.body.subject,
            desc : req.body.desc,
        });
        
        const SaveContactData = await ContactData.save();
        console.log(SaveContactData);
        res.status(201).render("index");

    } catch (error) {
        res.status(404).send("Provided Details is Not Sufficient !");
    }
})





app.post("/login",async(req,res)=>{
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const MatchingTheData = await Regester.findOne({email:userEmail});
     
        const isMatch = await bcrypt.compare(userPassword,MatchingTheData.password);

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details");
        }

        } catch (error) {
        res.status(400).send("Invalid Login Details");
        }
});

app.get("/home",(req,res)=>{
    res.render("index");
});

app.get("/jobs",(req,res)=>{
    res.render("browsejobs");
});

app.get("/hire",(req,res)=>{
    res.render("hireartist");
})

app.get("/store",(req,res)=>{
    res.render("store");
})

app.get("/postjob",(req,res)=>{
    res.render("postjob");
})

app.post("/postjob",async(req,res)=>{
   try {
    const JobData = new Jobpost({
        title : req.body.title,
        desc : req.body.desc,
        img : req.body.img
    })

    const SaveData = await JobData.save();
    res.status(201).render("index");
    console.log(SaveData);
   } catch (error) {
        console.log(error);
        res.status(404).render(error);
   }
})

app.get("/messages",(req,res)=>{
    res.render("message");
})

app.get("/innermessage",(req,res)=>{
    res.render("innermessage");
})

app.get("/profile",(req,res)=>{
    res.render("profile");
})

app.get("/editprofile",(req,res)=>{
    res.render("editprofile");
})

app.get("/addportfolio",(req,res)=>{
    res.render("addportfolio");
})


app.post("/editprofile",async(req,res)=>{
   try {
    const updatedProfile = new ProfileUpadte({
        name : req.body.name,
        img : req.body.img,
        location : req.body.location,
        Desc : req.body.Desc
    })

    const SaveData = await updatedProfile.save();
    console.log(SaveData);
    res.status(201).render("profile")
   } catch (error) {
        res.status(404).render(error);   
   }
})



app.post("/addportfolio",async(req,res)=>{
    try {
        const updatedPortfolio = new Portfolio({
            name : req.body.name,
            img : req.body.img,
            Desc : req.body.Desc
        })
    
        const SaveData = await updatedPortfolio.save();
        console.log(SaveData);
        res.status(201).render("profile")
       } catch (error) {
            res.status(404).render(error);   
       }    
})


app.get("/sellart",(req,res)=>{
    res.render("sellart");
})

app.post("/sellart",async(req,res)=>{
    try {
        const mySellingData = new SellArt({
            name : req.body.name,
            artname : req.body.artname,
            img : req.body.img,
            price : req.body.price
        })

        const saveData = await mySellingData.save();
        console.log(saveData);
        res.status(201).render("indexforartist");
    } catch (error) {
        res.status(404).render(error);
    }
})

app.get("/indexforartist",(req,res)=>{
    res.render("indexforartist");
})

app.get("/simplestore",(req,res)=>{
    res.render("storeforsimpleuser");
})

app.get("/auction",(req,res)=>{
    res.render("auction");
})

app.get("/auctionpost",(req,res)=>{
    res.render("auctionpost");
})

app.post("/auctionpost",async(req,res)=>{
    try {
        const AuctionData  =  new SellToAuction({
            name : req.body.name,
            artname : req.body.artname,
            img : req.body.img,
            time : req.body.time,
            price : req.body.price
        });

        const SaveData = await AuctionData.save();
        console.log(SaveData);
        res.status(201).render("index");
        
    } catch (error) {
        res.status(404).render(error);
    }
})


app.get("*",(req,res)=>{
    res.render("error");
})


app.listen(port,()=>{
    console.log(chalk.green.inverse(`Your Site Is Live In http://127.0.0.1:8000`));
});