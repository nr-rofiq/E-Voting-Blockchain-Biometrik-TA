import mongoose from "mongoose";

const ElectionSchema = new mongoose.Schema({
    election_id: {
        type: Number,
        required: true,
        unique: true
    },
    election_name: {
        type: String,
        required: true
    },
    election_organizer: {
        type: String,
        required: true
    },
    election_password: {
        type: String,
        required: true
    },
})

const ElectionModel = mongoose.model("elections", ElectionSchema);

export default ElectionModel