const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    notes: [
        {
            type: new mongoose.Schema(
                {
                    title: String,
                    description: String,
                    status: {
                        type: String,
                        default: 'todo'
                    },
                },
                { timestamps: true }
            ),
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },

});

const Notes = new mongoose.model("notes", notesSchema);
module.exports = Notes;
