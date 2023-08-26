import mongoose from "mongoose";

const CommitteeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  provinsi: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});

const CommitteeModel = mongoose.model("committees", CommitteeSchema);

export default CommitteeModel;
