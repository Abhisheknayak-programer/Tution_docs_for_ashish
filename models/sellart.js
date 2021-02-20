const mongoose = require("mongoose");

const sellSchema = mongoose.Schema({
    name : {
        required : true,
        type : String
    },
    artname: {
        required : true,
        type : String
    },
    img : String,
    price : {
        type : Number,
        required : true
    }
});




const SellArt = mongoose.model("SellArt",sellSchema);
module.exports = SellArt;