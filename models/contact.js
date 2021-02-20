const mongoose = require("mongoose");
const validator = require("validator");


const contactSchema = mongoose.Schema({
    name : {
        type : String,
        minLength : 3,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    number : {
        type : Number,
        minLength : 10,
    },
    subject : {
        type : String,
        minLength : 3,
        required : true
    },
    desc : {
        type : String,
        minLength : 3,
        required : true
    },

});


const Contact = mongoose.model("Contact",contactSchema);

module.exports = Contact;