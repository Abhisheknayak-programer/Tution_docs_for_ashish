const mongoose = require("mongoose");

const PortfolioSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    img: {
        type: String,
    },
    Desc : {
        type : String
    }
});


const Portfolio = mongoose.model("Portfolio",PortfolioSchema);
module.exports = Portfolio;