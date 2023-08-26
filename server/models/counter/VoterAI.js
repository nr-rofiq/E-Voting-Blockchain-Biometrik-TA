import mongoose from "mongoose";

const VoterAISchema = new mongoose.Schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  }
});

const VoterAIModel = mongoose.model("voterais", VoterAISchema);

export default VoterAIModel;
