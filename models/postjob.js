const mongoose = require('mongoose');

const jobschema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 3
    },
    desc : {
        type : String,
        required : true,
        minlength : 3
    },
    img : String
});


const Jobpost = mongoose.model("Jobpost",jobschema);
module.exports = Jobpost;