const Register = require('../models/users');
const bcrypt = require("bcryptjs");
async function registrUser(req, res) {
    let respObj = {
        isSuccess: false,
        Message: "Successful",
        Data: null,
    };
    try {
        let registerUser = new Register(req.body);
        let result = await registerUser.save();
        respObj.isSuccess = true;
        respObj.Data = result;
        res.status(201).json(respObj);
    } catch (err) {
        respObj.Message = "Server Error";
        res.status(400).json(respObj);
    }
}
async function loginUser(req,res){
    let respObj = {
        isSuccess: false,
        Message: "Successful",
        Data: {},
        token:null,
    };
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch ",isMatch);
        const token = await user.generateAuthToken();
        console.log("token ",token);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        });
        const info = user._id;
        const name = user.firstname;
        console.log("name "+ name,info);
        if (isMatch) {
            console.log("in match");
            respObj.isSuccess = true;
            respObj.Data.userId = info;
            respObj.Data.userName = name;
            respObj.token = token;
            res.status(201).json(respObj);
            return true;
        }
        else {
            respObj.isSuccess = true;
            respObj.Message = "Incorrect Credentials"
            res.status(404).json(respObj);
            return false;
        }
    } catch (err) {
        respObj.Message = "Server Error";
        res.status(400).json(respObj);
    }

}
module.exports = {
    registrUser,
    loginUser,
}