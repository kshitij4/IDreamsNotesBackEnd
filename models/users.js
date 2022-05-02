const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ id: this._id.toString() }, process.env.TOKENKEY);
        return token;
    } catch (err) {
        console.log("in err:" ,err);
        res.send(err);
        console.log(err);
    }
}
//hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = new mongoose.model("User", userSchema);
module.exports = User;