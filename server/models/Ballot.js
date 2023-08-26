import mongoose from "mongoose";

const BallotSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  pemilihan: {
    type: String,
    required: true,
  },
  provinsi: {
    type: String,
    required: true,
  },
  kabkota: {
    type: String,
    required: true,
  },
});

const BallotModel = mongoose.model("ballots", BallotSchema);

export default BallotModel;
