const Register = require('../models/user');
const bcrypt = require("bcryptjs");
async function createUser(req, res) {
    let respObj = {
        isSuccess: false,
        Message: "Successful",
        Data: null,
    };
    try {
        //Updating values to the database
        console.log("res body is", req.body)
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
        Data: null,
        token:null,
    };
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({ email: email });
        const Match = await bcrypt.compare(password, user.password);
        console.log("Match is" , Match);

        const token = await user.generateAuthToken(); //Generating tokens every time user login
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        });
        const info = user._id;
        console.log("info is",info)
        if (Match) {
            respObj.isSuccess = true;
            respObj.Data = info;
            respObj.token = token;
            res.status(201).json(respObj);
            return true;
        }
        else {
            respObj.isSuccess = true;
            respObj.Message = "Incorrect Details"
            res.status(404).json(respObj);
            return false;
        }
    } catch (err) {
        respObj.Message = "Server Error";
        res.status(400).json(respObj);
    }

}
module.exports = {
    createUser,
    loginUser,
}