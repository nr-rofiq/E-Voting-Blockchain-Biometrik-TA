import mongoose from "mongoose";

const BallotAISchema = new mongoose.Schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  }
});

const BallotAIModel = mongoose.model("ballotais", BallotAISchema);

export default BallotAIModel;
