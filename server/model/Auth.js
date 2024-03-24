const mongoose = require("mongoose")



const authSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }


},

    {
        timestamps: true
    }

)


module.exports = mongoose.model("auth", authSchema)



