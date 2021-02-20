const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    img: {
        type: String,
    },
    location: {
        type: String,
        minLength: 2,
    },
    Desc : {
        type : String
    }
});


const ProfileUpadte = mongoose.model("profile",ProfileSchema);
module.exports = ProfileUpadte;