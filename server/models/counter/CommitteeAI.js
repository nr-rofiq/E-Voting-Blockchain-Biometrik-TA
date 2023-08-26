import mongoose from "mongoose";

const CommitteeAISchema = new mongoose.Schema({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  }
});

const CommitteeAIModel = mongoose.model("committeeais", CommitteeAISchema);

export default CommitteeAIModel;
