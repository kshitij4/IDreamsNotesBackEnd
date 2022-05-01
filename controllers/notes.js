const Note = require("../models/notes");

async function createNote (req,res){
	let respObj = {
		isSuccess: false,
		message: "Successful",
		Data: null,
	};
	try {
        console.log("userId",req.userId)
		let data = Note.findOneAndUpdate(
			{ userId: req.params.userId },
			{
				$push: {
					notes: {
						title: req.body.title,
						description: req.body.description
					},
				},
			},

			{ upsert: true },
			function (error, success) {
				if (error) {
					console.log("error is" + error);
				} else {
					console.log("successs" + success);
				}
			}
		);
		respObj.isSuccess = true;
		respObj.message = "Note Added Successfully";
		console.log(data);
		res.status(201).json(respObj);
	} catch (error) {
        respObj.message = "Server Error";
		res.status(400).json(respObj);
		console.log("error is" + error);
	}
}

async function updateNoteStatus(req,res){
    let respObj = {
        isSuccess: false,
        message: "Successful",
        Data: null,
    };
	try {
        console.log("req.body",req.body.status);
		const userId = req.params.userId;
		const noteId = req.params.noteId;
		const data = await Note.update(
			{ userId: userId, "notes._id": noteId },
			{
				$set: {
                    "notes.$.status" : req.body.status
				},
			}
		);
        // const data = await Note.findOne()
        console.log(data);
		respObj.message = "Updated successfully";
		respObj.isSuccess = true;
        respObj.Data = data;
		res.status(200).json(respObj);
	} catch (error) {
		respObj.message = "Error Occured" + error;
		res.status(404).json(respObj);
	}

}
async function getAllNotes(req,res){
    let respObj = {
        isSuccess: false,
        message: "Successful",
        Data: null,
    };
    try{
        let userId = req.params.userId;
        let result = await Note.findOne({
            userId: userId,
        })
        respObj.isSuccess = true;
        respObj.Data = result;
        res.status(200).json(respObj);
    }catch(err){
        console.log("im here");
        console.log("error is ",err);
        respObj.message = "Server Error";
        res.status(404).json(respObj);
    }
}
async function updateNote(req,res){
    let respObj = {
        isSuccess: false,
        message: "Successful",
        Data: null,
    };
    try {
        const userId = req.userId;
        const noteId = req.params.noteId;
        const data = await Note.findOneAndUpdate(
            { _id: noteId },
            {
                $set: {
                    userId: userId,
                    title: req.body.title,
                    description: req.body.description,
                },
            }
        );
        console.log(data)
        respObj.message = "Updated successfully";
        respObj.isSuccess = true;
        respObj.Data = data;
        res.status(200).json(respObj);
    } catch (error) {
        respObj.message = "Server Error";
        res.status(404).json(respObj);
    }
}

async function deleteNote(req,res){
    let respObj = {
        isSuccess: false,
        message: "Successful",
        Data: null,
    };
    try{        
        const userId = req.userId;
        const noteId = req.params.noteId;
        const data = await Note.findOneAndUpdate(
            { _id: noteId },
            {isDeleted:true},
        );
        console.log(data)
        respObj.message = "Updated successfully";
        respObj.isSuccess = true;
        respObj.Data = data;
        res.status(200).json(respObj);

    }catch(err){
        respObj.message = "Server Error";
        res.status(404).json(respObj);
    }
}
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getAllNotes,
    updateNoteStatus,
}
