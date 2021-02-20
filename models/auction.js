const mongoose = require("mongoose");

const AuctionSchema = mongoose.Schema({
    name : {
        required : true,
        type : String
    },
    artname: {
        required : true,
        type : String
    },
    img : String,
    time : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
});




const SellToAuction = mongoose.model("SellToAuction",AuctionSchema);
module.exports = SellToAuction;